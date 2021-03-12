const  Validator = require('../lib/Validator');
const {Op} =  require('sequelize');
const {Product, Size, Color, ProductSize, ProductColor, Category, Vendor, sequelize} =  require('../models');
let path = require('path');

/**
 * ProductController
 *
 * this controller responsible for all product operation
 *
 * @type {{deleteAll: module.exports.deleteAll, index: module.exports.index, create: module.exports.create, update: module.exports.update, delete: module.exports.delete}}
 */
module.exports = {

    /**
     * default action and also searching by passes query
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    index: async (req, res) => {
        if(req.xhr) {

            let pageLimit = req.query.page_limit > 0 ? Number(req.query.page_limit) : 10;
            let page = req.query.page > 0 ? Number(req.query.page) : 1;
            let offset = pageLimit * (page - 1);
            let totalRecord = 0;
            Product.count().then(c => totalRecord = c);

            let search = {};
            let includes = [];
            let productQuery = {};

            search["category_id"] =  req.query.category_id && req.query.category_id > 0 ? req.query.category_id : 0;
            search["vendor_id"] =  req.query.vendor_id && req.query.vendor_id > 0 ? req.query.vendor_id : 0;
            search["color_id"] = req.query.color_id && req.query.color_id > 0 ? req.query.color_id : 0;
            search["size_id"] = req.query.size_id && req.query.size_id > 0 ? req.query.size_id : 0;
            search["min_unit_cost"] = req.query.min_unit_cost &&  req.query.min_unit_cost > 0 ? req.query.min_unit_cost : "";
            search["max_unit_cost"] = req.query.max_unit_cost && req.query.max_unit_cost > 0 ? req.query.max_unit_cost : "";


            let isSearchingRequest = false;

            if(search.category_id > 0) {
                productQuery.category_id = +search.category_id;
                isSearchingRequest = true;
            }

            if(search.vendor_id > 0) {
                productQuery.vendor_id = +search.vendor_id;
                isSearchingRequest = true;
            }

            if(search.min_unit_cost > 0) {
                productQuery.unit_cost = {[Op.gte]: "" + search.min_unit_cost};
                isSearchingRequest = true;
            }

            if(search.max_unit_cost > 0) {
                productQuery.unit_cost = {[Op.lte]: "" + search.max_unit_cost};
                isSearchingRequest = true;
            }

            if(search.color_id > 0) {
                includes.push({model: Color, as: "colors", where: {id: {[Op.lte]:search.color_id}}});
                isSearchingRequest = true;
            } else
                includes.push({model: Color, as: "colors"});

            if(search.size_id > 0) {
                includes.push({model: Size, as: "sizes", where: {id: {[Op.lte]:search.size_id}}});
                isSearchingRequest = true;
            } else
                includes.push({model: Size, as: "sizes"});

            includes.push({model: Category, as: "category"});
            includes.push({model: Vendor, as: "vendor"});

            try {
                let products = await Product.findAll({
                    where: productQuery,
                    limit: pageLimit,
                    offset: offset,
                    $sort: { createAt: 1 },
                    include: includes
                });

                res.json({param:req.query, status: true,
                    message: "successfully loaded",
                    data: products,
                    page_limit: pageLimit,
                    totalRecord: !isSearchingRequest ? totalRecord : products.length
                });
            } catch(error) {
                console.log(error);
                res.json({status: false, level:'error', message: "Searching Failed"});
            }
        }else{
            res.status(400).send('Bad Request');
        }
    },

    /**
     * product create
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    create: async (req, res) => {
        if(req.xhr && req.method === "POST"){
            //sanitize
            let cleanData = Validator.sanitize(req);
            //validate
            let{errors, data, isError} = Validator.validate(cleanData);

            let sizeIds = req.body.size_ids.split(",");
            if(sizeIds.length <= 0) {
                errors["size_id"].push("Size is required");
                isError = true;
            }

            let colorIds = req.body.color_ids.split(",");
            if(colorIds.length <= 0) {
                errors["color_id"].push("Color is required");
                isError = true;
            }

            if(!req.files) {
                errors["file"] = "file is missing";
                isError = true
            }

            if(isError){
                res.json({status: false, level:'error', message: "Invalid input", errors:errors});
            }else {

                const myFile = req.files.image;
                let fileName = new Date().getTime() + '_' + req.body.name + path.extname(myFile.name);
                const filePath = `${__dirname}/../../public/products/${fileName}`;
                let isUpload = false;
                myFile.mv(filePath, function (err) {
                        if (err) {
                            console.log(err);
                            res.json({status: false, level: 'error', message: "File Uploading Failed", error: err});
                        }
                    }
                );

                data.avatar = fileName;
                let transaction = await sequelize.transaction();
                try {
                    let product = await Product.create(data);
                    if (!product) {
                        res.json({status: false, level: 'danger', message: "Product creation failed"});
                    } else {
                        sizeIds.forEach((Id) => {
                             ProductSize.create({product_id: product.id, size_id: Number(Id)});
                        });
                        colorIds.forEach((Id) => {
                            ProductColor.create({product_id: product.id, color_id: Number(Id)});
                        });
                        await transaction.commit();
                        res.json({status: true, level: 'success', message: "Save successfully"});
                    }
                } catch (e) {
                    await transaction.rollback();

                    res.json({status: false, level: 'error', message: "Invalid input", errors: "some thing wrong"});
                }
            }

        }else{
            res.send('Bad Request');
        }
    },

    /**
     * product and association model update
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    update: async (req, res) =>{

        if(req.xhr && req.method === "POST"){

            //sanitize
            let cleanData = Validator.sanitize(req);
            //validate
            let{errors, data, isError} = Validator.validate(cleanData);

            let sizeIds = req.body.size_ids.split(",");
            if(sizeIds.length <= 0) {
                errors["size_id"].push("Size is required");
                isError = true;
            }

            let colorIds = req.body.color_ids.split(",");
            if(colorIds.length <= 0) {
                errors["color_id"].push("Color is required");
                isError = true;
            }

            if(isError){
                res.json({status: false, level:'error', message: "Invalid input", errors:errors});
            }else{

                let fileName = "";
                if(req.files) {
                    const myFile = req.files.image;
                    fileName = new Date().getTime() + '_' + req.body.name + path.extname(myFile.name);
                    const filePath = `${__dirname}/../../public/products/${fileName}`;
                    myFile.mv(filePath, (err) => {
                            if (err) {
                                console.log(err);
                                res.json({status: false, level: 'error', message: "File Uploading Failed", error: err});
                            }
                        }
                    );
                }

                if(fileName.length > 0)
                    data.avatar = fileName;

                let product = await Product.findOne({where:{token:req.body.token}});

                if(!product){
                    res.json({status: false, level: 'danger', message: "Product not found for update"});
                }else {
                    let transaction = await sequelize.transaction();
                    try {
                        let newProduct = await product.update(data);
                        if (!newProduct)
                            res.json({status: false, level: 'danger', message: "Product  update failed"});

                        //remove all old
                        if (sizeIds.length > 0) {
                            ProductSize
                                .destroy({
                                    where: {
                                        product_id: product.id,
                                    }
                                }).then(() => {
                                 //create new
                                sizeIds.forEach(Id => {
                                    ProductSize.create({
                                        product_id: product.id,
                                        size_id: Number(Id)
                                    }).then(ps => console.log(ps));
                                });
                            });

                        }

                        if (colorIds.length > 0) {
                            ProductColor
                                .destroy({
                                    where: {
                                        product_id: product.id
                                    }

                                }).then(() => {
                                colorIds.forEach(Id => {
                                    ProductColor.create({
                                        product_id: product.id,
                                        color_id: Number(Id)
                                    }).then(pc => console.log(pc));
                                });
                            });

                        }
                        await transaction.commit();
                        res.json({status: true, level:'success', message: "Save successfully"});
                    }catch (e) {
                        await transaction.rollback();
                        res.json({status: false, level: 'danger', message: "Product  update failed"});
                    }
                }
            }
        }else{
            res.send('Bad Request');
        }
    },

    /**
     * delete specific model by token
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    delete: async (req, res) =>{
        if(req.xhr && req.method === "POST") {
           let product = await Product.findOne({where:{token:req.body.id}});
           if (!product) {
               res.json({status: false, level: 'danger', message: "Product not found for delete"});
           } else {
                let transaction  = await sequelize.transaction();
               try {
                   //delete associated first
                   await ProductSize.destroy({
                       where: {
                           product_id: product.id,
                       }
                   });

                   await ProductColor.destroy({
                       where: {
                           product_id: product.id
                       }
                   });
                   //delete base item
                  await product.destroy();

                  await transaction.commit();
                  res.json({status: true, level: 'success', message: "Delete successfully"});
               }catch (e) {
                   await transaction.rollback();
                   res.json({status: false, level: 'danger', message: "Product  deleted failed"});
               }
           }

        }else{
            res.send('Bad Request');
        }
    },

    /**
     * delete models by token
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    deleteAll: async (req, res) => {
        if(req.xhr && req.method === "POST"){
            let ids = req.body.ids.split(",");
            if(ids.length > 0) {
                let products = await Product.findAll({where:{token:{[Op.in]: ids}}});

                if(products.length <= 0)
                    res.json({status: false, level: 'danger', message: "Product not found for delete"});

                let transaction = await sequelize.transaction();
                try {
                    products.forEach(  (product, index) => {
                            ProductSize.destroy({
                                where: {
                                    product_id: product.id,
                                }
                            });

                            ProductColor.destroy({
                                where: {
                                    product_id: product.id
                                }
                            });

                            //delete base item
                            product.destroy();
                    });
                    await transaction.commit();
                    res.json({status: true, level: 'success', items:products, message: "Delete successfully"});
                }catch (e) {
                    await transaction.rollback();
                    res.json({status: false, level: 'danger', message: "Product  deleted failed"});
                }

            }else {
                res.json({status: false, level: 'danger', message: "Product  Id missing"});
            }
        }else{
            res.send('Bad Request');
        }
    },

};
