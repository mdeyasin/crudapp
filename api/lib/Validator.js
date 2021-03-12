class Validator{

    static isValid(value, regex) {
        return regex.test(value);
    };

    static validate(req) {
        let errors = {name:[], category:[], color_id:[], size_id:[], unit_cost:[], unit_price:[], hand_on_qty:[], description:[]};
        let isError = false;let data = {};

        if(req.name.length < 5 || req.name.length > 20) {
            errors["name"].push("Name min 5 Or max 20 char long");
            isError = true;
        }else if(!Validator.isValid(req.name, /[\w]{5,20}/)) {
            errors["name"].push("Name only alpha accepted");
            isError = true
        }else {
            data.name =  req.name;
        }

        if(!Validator.isValid(req.category_id, /[1-9]/)) {
            errors["category_id"].push("Category is Required");
            isError = true;
        }else {
            data.category_id =  req.category_id;
        }

        if(!Validator.isValid(req.vendor_id, /[1-9]/)) {
            errors["vendor_id"].push("Vendor is Required");
            isError = true;
        }else {
            data.vendor_id =  req.vendor_id;
        }

        if(!Validator.isValid(req.unit_cost, /[1-9]/)) {
            errors["unit_cost"].push("Unit cost only numeric accepted");
            isError = true;
        }else {
            data.unit_cost =  req.unit_cost;
        }

        if(!Validator.isValid(req.unit_price, /[1-9]/)) {
            errors["unit_price"].push("Unit price only numeric accepted");
            isError = true;
        }else {
            data.unit_price =  req.unit_price;
        }

        if(!Validator.isValid(req.hand_on_qty, /[1-9]/)) {
            errors["hand_on_qty"].push("Quantity min 1 and only numeric accepted");
            isError = true;
        }else {
            data.hand_on_qty=  req.hand_on_qty;
        }

        if(Number(req.unit_cost) > Number(req.unit_price)){
            errors["unit_cost"].push("Unit cost must less than unit price");
            isError = true;
        }

        if(!Validator.isValid(req.description, /[\w\s]/)) {
            errors["description"].push("Description only alpha and number");
            isError = true;
        }else {
            data.description=  req.description;
        }
        return {errors:errors, data:data, isError:isError}
    }

    static sanitize(req){
        let {
            name, category_id,
            vendor_id, unit_cost,
            unit_price, hand_on_qty,
            description,
        } = req.body;
        let cleanData = {};
        cleanData.name = name ? name.replace(/[^a-zA-Z0-9]/, "") : null;
        cleanData.category_id = category_id ? +category_id : 0;
        cleanData.vendor_id = vendor_id ? +category_id : 0;
        cleanData.unit_cost = unit_cost ? unit_cost.replace(/[^0-9\\.]/, "") : 0.0;
        cleanData.unit_price = unit_price ? unit_price.replace(/[^0-9\\.]/, "") : 0.0;
        cleanData.hand_on_qty = hand_on_qty ? +hand_on_qty : 0;
        cleanData.description = description ? description.replace(/[^\w]/, "") : null;

        return cleanData
    }

}

module.exports = Validator;

