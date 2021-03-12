import React from 'react'
import _ from 'lodash';
class ViewPage extends React.Component{

    constructor(props){
        super(props);
        this.onBack = this.onBack.bind(this);
    }

    onBack(){
        this.props.onApplyAction("", null);
    }

    componentDidMount() {
    }

    render() {
        let item = this.props.item.item;
        //console.log(item);
        return(
            <>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 card" style={{padding:25 + "px"}}>
                            <div className="ibox">
                                <div className="page-header">
                                    <div className="text-right">
                                        <button onClick={this.onBack} className="btn btn-secondary">Back</button>
                                    </div>
                                </div>
                                <div className="ibox-body">
                                    <h5 className="font-strong mb-4 text-info">PRODUCT INFORMATION</h5>
                                    <div className="page-header align-center" style={{margin:10 + "px"}}>
                                        <div className="flexbox align-center">
                                            <div className="flexbox-b align-center">
                                                <div className="ml-5 mr-5 file-input align-center">
                                                    <img style={{cursor:'pointer'}} className="img-circle"
                                                         src={ item.avatar.length > 0 ?  "/products/" + item.avatar : "http://127.0.0.1:3000/404.png"}
                                                         width="210" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6 text-muted">Product Name:</div>
                                        <div className="col-6">{item.name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6 text-muted">Unit Cost:</div>
                                        <div className="col-6">{item.unit_cost}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6 text-muted">Unit Price:</div>
                                        <div className="col-6">{item.unit_price}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6 text-muted">HandOnQuantity:</div>
                                        <div className="col-6">{item.hand_on_qty}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6 text-muted">Categoy:</div>
                                        <div className="col-6">{item.category.category_name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6 text-muted">Vendor:</div>
                                        <div className="col-6">{item.vendor.v_name}</div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col-6 text-muted">Sizes:</div>
                                            <div className="col-6">
                                                    <ol>
                                                        {_.map(item.sizes, (item, index) =>(
                                                            <li key={index}>{item.size_name}</li>
                                                        ))}
                                                    </ol>
                                            </div>
                                        </div>
                                    </div>
                                <div className="row mb-2">
                                    <div className="col-6 text-muted">Colors:</div>
                                    <div className="col-6">
                                        <ol>
                                            {_.map(item.colors, (item, index) =>(
                                                <li key={index}>{item.color_name}</li>
                                            ))}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ViewPage;