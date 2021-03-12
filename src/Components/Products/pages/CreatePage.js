import React from 'react'
import _ from 'lodash';

// import
import 'alertifyjs/build/css/alertify.min.css';
import * as alertify from 'alertifyjs';

import ProductRepository from "../../../repository/ProductRepository";

class CreatePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           item: {
               name: "",
               vendor_id:"",
               category_id:"",
               unit_cost: "",
               unit_price: "",
               hand_on_qty: "",
               description:""
            },
            uploadFilePath: '',
            selectedFile: '',
            colorIds:[],
            sizeIds:[],
            isLoading: false,
            isSearching: false,
            lvlMessage: '',
            isClear: false,
            btnStatus: '',
            btnText: '',
            errors: {},
            addLink: '/add'
        };

        this.repository = new ProductRepository();

        this.onSave = this.onSave.bind(this);
        this.onUpdateChange = this.onUpdateChange.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onClear = this.onClear.bind(this);
        this._processException = this._processException.bind(this);
        this._processResponse = this._processResponse.bind(this);

    }

    onUpdateChange(event) {
        let keyName = event.target.name;
        if (keyName === 'product_colors_ids') {
            let productColorSelectedIds = [] ;
            let selectedOption=(event.target.selectedOptions);
            for (let i = 0; i < selectedOption.length; i++) {
                let colorId = parseInt(selectedOption.item(i).value);
                productColorSelectedIds.push(colorId)
            }
            this.setState({colorIds:productColorSelectedIds});
        }else if (keyName === 'product_size_ids'){
            let productSizeSelectedIds = [] ;
            let selectedOption=(event.target.selectedOptions);
            for (let i = 0; i < selectedOption.length; i++) {
                let sizeId = parseInt(selectedOption.item(i).value);
                productSizeSelectedIds.push(sizeId)
            }
            this.setState({sizeIds:productSizeSelectedIds});
        } else if (keyName === 'image') {
            let files = event.target.files;
            let file;
            let uploadedImageType = 'image/jpeg';
            let uploadedImageURL;
            if (files && files.length <= 2048 ) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {
                    uploadedImageType = file.type;
                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }
                    uploadedImageURL = URL.createObjectURL(file);
                    this.setState({uploadFilePath: uploadedImageURL, selectedFile: file});
                } else {
                    window.alert('Please choose an image file.');
                }
            }else {
                window.alert("Max size 2048")
            }
        } else {
            let keyValue = event.target.value;
            let updateCopy = Object.assign({}, this.state.item);
            updateCopy[keyName] = keyValue;
            this.setState({item: updateCopy});
        }
    }

    onClear(event) {
        event.preventDefault();
        this.setState({item:{}, uploadFilePath:'', selectedFile: ''});
    }

    onBack(){
        this.props.onApplyAction("", null);
    }

    _processResponse(responseData){
        this.setState({btnStatus: '', btnText: '', item:{}, errors:{}});
        alertify.success(responseData.message);
    }

    _processException(responseData){
        if (responseData.level === 'error') {
            this.setState({errors: responseData.errors, btnStatus: '', btnText: ''});
        } else if (responseData.isLocal) {
            this.setState({btnStatus: '', btnText: ''});
            console.log("Error from isLocal");
        }else if (responseData.level === 'danger') {
            this.setState({btnStatus: '', btnText: ''});
            alertify.error(responseData.message);
        }else{
            this.setState({btnStatus: '', btnText: ''});
            console.log("Error from others");
        }
    }


    onSave(event){
        event.preventDefault();
        let formData = new FormData();
        let newUser = Object.assign({}, this.state.item);
        let image = this.state.selectedFile;
        let keyNames = Object.keys(newUser).filter(function (key) {
            return key !== 'image' && key !== 'avatar'

        });
        keyNames.forEach(function (key, index) {
            formData.append(key, key === 'id' ? parseInt(newUser[key]) : newUser[key]);
        });

        if (image) {
            formData.append('image', image);
        }else{
            alertify.error("Image missing");
            return;
        }

        if(! _.isEmpty(this.state.colorIds)){
            formData.append("color_ids", this.state.colorIds);
        }
        if(! _.isEmpty(this.state.sizeIds)){
            formData.append("size_ids", this.state.sizeIds);
        }

        let actionUrl = 'create';
        if (!_.isEmpty(actionUrl)) {
            this.setState({btnStatus: 'disabled', btnText: 'Creating...'});
            this.repository.save(actionUrl, formData, async (responseData) => {
                if (responseData.status) {
                    this._processResponse(responseData);
                } else {
                    this._processException(responseData);
                }
            }, err => {
                this.setState({btnStatus: '', btnText: ''});
                console.log("Error from Create");
                console.log(err);
            });
        } else {
            console.log('url is empty' + actionUrl);
        }
    }


    componentWillUnmount() {
        if(typeof this.repository !== 'undefined'){
            this.repository.dispose();
            this.repository =  null;
        }
    }

    render() {
        const isErrors = !_.isEmpty(this.state.errors);
        return(
            <>
                <div className="container">
                    {/*{!_.isEmpty(this.props.flashMessage) && (*/}
                    {/*    <Flash flashMessage={this.props.flashMessage} flashLevel={this.props.flashLevel}/>)}*/}
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="text-right">
                                <button onClick={this.onBack} className="btn btn-secondary">Back</button>
                            </div>
                            <div className="card">
                                <form id="user-form" role="form" onSubmit={this.onSave}>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="ibox-body">
                                                <h5 className="font-strong mb-4">PRODUCT CREATE FORM</h5>
                                                <div className="page-header align-center" style={{margin:10 + "px"}}>
                                                    <div className="flexbox align-center">
                                                        <div className="flexbox-b align-center">
                                                            <div className="ml-5 mr-5 file-input align-center">
                                                                <img style={{cursor:'pointer'}} className="img-circle"
                                                                     src={this.state.uploadFilePath ?  this.state.uploadFilePath : "http://127.0.0.1:3000/404.png"}
                                                                     width="110" />
                                                                <input onChange={this.onUpdateChange} name="image" id="image" type="file" accept="image/png, image/jpeg"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={isErrors && ! _.isEmpty(this.state.errors['name']) ? 'col-sm-12 form-group  has-error' : 'col-sm-12 form-group '}>
                                                    <input type="text"
                                                           className="form-control  form-control-solid"
                                                           name="name" id="name"
                                                           placeholder={'Product Name'}
                                                           value={this.state.item.name ?? ''}
                                                           onChange={this.onUpdateChange} required />
                                                    <label className="help-block error">{isErrors && !_.isEmpty(this.state.errors['name']) ? this.state.errors['name'][0] : ''}</label>
                                                </div>

                                                <div className={isErrors && ! _.isEmpty(this.state.errors['vendor_id']) ? 'col-sm-12 form-group  has-error' : 'col-sm-12 form-group'}>
                                                    <select className="form-control select2_demo_1 form-control-solid"
                                                            onChange={this.onUpdateChange}
                                                            value={this.state.item.vendor_id ?? ''}
                                                            data-placeholder={'Vendor'}
                                                            style={{width: 100 +'%'}}
                                                            name="vendor_id" id="vendor_id" required>
                                                        <option value="">{'Select Vendor'}</option>
                                                        <option value={1}>{'Lenevo'}</option>
                                                        <option value={2}>{'Asus'}</option>
                                                        <option value={3}>{'ArongFabrics'}</option>
                                                        <option value={4}>{'LalFabrics'}</option>
                                                        <option value={5}>{'ArongShoes'}</option>
                                                        <option value={6}>{'LalShoes'}</option>
                                                    </select>
                                                    <label className="help-block error">{isErrors && !_.isEmpty(this.state.errors['vendor_id']) ? this.state.errors['vendor_id'][0] : ''}</label>
                                                </div>

                                                <div className={isErrors && ! _.isEmpty(this.state.errors['category_id']) ? 'col-sm-12 form-group  has-error' : 'col-sm-12 form-group'}>
                                                    <select className="form-control select2_demo_1 form-control-solid"
                                                            onChange={this.onUpdateChange}
                                                            value={this.state.item.category_id ?? ''}
                                                            data-placeholder={'Category'}
                                                            style={{width: 100 +'%'}}
                                                            name="category_id" id="category_id" required>
                                                        <option value="">{'Select Category'}</option>
                                                        <option value={1}>{'Laptop'}</option>
                                                        <option value={2}>{'Dress'}</option>
                                                        <option value={3}>{'Shoes'}</option>
                                                    </select>
                                                    <label className="help-block error">{isErrors && !_.isEmpty(this.state.errors['category_id']) ? this.state.errors['category_id'][0] : ''}</label>
                                                </div>

                                                <div className={isErrors && ! _.isEmpty(this.state.errors['size_id']) ? 'col-sm-12 form-group  has-error' : 'col-sm-12 form-group'}>
                                                    <select className="form-control select2_demo_1 form-control-solid"
                                                            multiple="multiple"
                                                            onChange={this.onUpdateChange}
                                                            data-placeholder={'Product Size'}
                                                            style={{width: 100 +'%'}}
                                                            name="product_size_ids" id="product_size_ids" required>
                                                        <option value={1} key={1}>{'Sm'}</option>
                                                        <option value={2} key={2}>{'Md'}</option>
                                                        <option value={3} key={3}>{'X'}</option>
                                                        <option value={4} key={4}>{'XL'}</option>
                                                        <option value={5} key={5}>{'XXL'}</option>
                                                    </select>
                                                    <label className="help-block error">{isErrors && !_.isEmpty(this.state.errors['size_id']) ? this.state.errors['size_id'][0] : ''}</label>
                                                </div>

                                                <div className={isErrors && ! _.isEmpty(this.state.errors['color_id']) ? 'col-sm-12 form-group  has-error' : 'col-sm-12 form-group'}>
                                                    <select className="form-control select2_demo_1 form-control-solid"
                                                            multiple="multiple"
                                                            onChange={this.onUpdateChange}
                                                            data-placeholder={'Color Name'}
                                                            style={{width: 100 +'%'}}
                                                            name="product_colors_ids" id="product_colors_ids" required>
                                                        <option value={1} key={1}>{'Black'}</option>
                                                        <option value={2} key={2}>{'White'}</option>
                                                        <option value={5} key={3}>{'Red'}</option>
                                                        <option value={4} key={4}>{'Blue'}</option>
                                                        <option value={5} key={5}>{'Green'}</option>
                                                    </select>
                                                    <label className="help-block error">{isErrors && !_.isEmpty(this.state.errors['color_id']) ? this.state.errors['color_id'][0] : ''}</label>
                                                </div>

                                                <div className={isErrors && ! _.isEmpty(this.state.errors['unit_cost']) ? 'col-sm-12 form-group  has-error' : 'col-sm-12 form-group '}>
                                                    <input type="text"
                                                           className="form-control  form-control-solid"
                                                           name="unit_cost" id="unit_cost"
                                                           placeholder={'Unit Cost'}
                                                           value={this.state.item.unit_cost ?? ''}
                                                           onChange={this.onUpdateChange} required />
                                                    <label className="help-block error">{isErrors && !_.isEmpty(this.state.errors['unit_cost']) ? this.state.errors['unit_cost'][0] : ''}</label>
                                                </div>

                                                <div className={isErrors && ! _.isEmpty(this.state.errors['unit_price']) ? 'col-sm-12 form-group  has-error' : 'col-sm-12 form-group '}>
                                                    <input type="text"
                                                           className="form-control  form-control-solid"
                                                           name="unit_price" id="unit_price"
                                                           placeholder={'Unit Price'}
                                                           value={this.state.item.unit_price ?? ''}
                                                           onChange={this.onUpdateChange} required />
                                                    <label className="help-block error">{isErrors && !_.isEmpty(this.state.errors['unit_price']) ? this.state.errors['unit_price'][0] : ''}</label>
                                                </div>

                                                <div className={isErrors && ! _.isEmpty(this.state.errors['hand_on_qty']) ? 'col-sm-12 form-group  has-error' : 'col-sm-12 form-group '}>
                                                    <input type="text"
                                                           className="form-control  form-control-solid"
                                                           name="hand_on_qty" id="hand_on_qty"
                                                           placeholder={'Quantity'}
                                                           value={this.state.item.hand_on_qty ?? ''}
                                                           onChange={this.onUpdateChange} required />
                                                    <label className="help-block error">{isErrors && !_.isEmpty(this.state.errors['hand_on_qty']) ? this.state.errors['hand_on_qty'][0] : ''}</label>
                                                </div>

                                                <div className={isErrors && ! _.isEmpty(this.state.errors['description']) ? 'col-sm-12 form-group  has-error' : 'col-sm-12 form-group '}>
                                                    <textarea
                                                           className="form-control  form-control-solid"
                                                           name="description" id="description"
                                                           placeholder={'Description'}
                                                           value={this.state.item.description ?? ''}
                                                           onChange={this.onUpdateChange} required />
                                                    <label className="help-block error">{isErrors && !_.isEmpty(this.state.errors['description']) ? this.state.errors['description'][0] : ''}</label>
                                                </div>

                                                <div className="text-right">
                                                    <input type="reset" className="btn btn-primary btn-air mr-2" name="reset" value="Reset"/>
                                                    <button disabled={this.state.btnStatus} className="btn btn-primary btn-air mr-2">{! _.isEmpty(this.state.btnText) ? this.state.btnText : 'Save' }</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default CreatePage;