var express = require('express');
let  _  = require('lodash');
var router = express.Router();

const ProductController = require('../controllers/ProductController');

/**
 * get search by given params
 */
router.get('/', ProductController.index);

/**
 * create record
 */
router.post("/create", ProductController.create);

/**
 * update record
 */
router.post("/update", ProductController.update);

/**
 * delete record by given id
 */
router.post("/delete", ProductController.delete);

/**
 * delete  records from data base associated ids
 */
router.post("/delete-all", ProductController.deleteAll);

module.exports = router;
