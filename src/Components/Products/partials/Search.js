import React from 'react';

class Search extends React.Component {

    render() {
        return (
                <div className="row" style={{padding:10 + "px"}}>
                    <form className="form-inline" onSubmit={this.props.onSearchHandle}>
                        <div className="form-group mr-1">
                            <select className="form-control select2_demo_1 form-control-solid"
                                    onChange={this.props.onInputSearchChange}
                                    value={this.props.inputValue.vendor_id}
                                    data-placeholder={'Vendor'}
                                    style={{width: 100 +'%'}}
                                    name="vendor_id" id="vendor_id">
                                <option value="">{'Select Vendor'}</option>
                                <option value={1}>{'Lenevo'}</option>
                                <option value={2}>{'Asus'}</option>
                                <option value={3}>{'ArongFabrics'}</option>
                                <option value={4}>{'LalFabrics'}</option>
                                <option value={5}>{'ArongShoes'}</option>
                                <option value={6}>{'LalShoes'}</option>
                            </select>
                        </div>

                        <div className="form-group mr-1">
                            <select className="form-control select2_demo_1 form-control-solid"
                                    onChange={this.props.onInputSearchChange}
                                    value={this.props.inputValue.category_id}
                                    data-placeholder={'Category'}
                                    style={{width: 100 +'%'}}
                                    name="category_id" id="category_id">
                                <option value="">{'Select Category'}</option>
                                <option value={1}>{'Laptop'}</option>
                                <option value={2}>{'Dress'}</option>
                                <option value={3}>{'Shoes'}</option>
                            </select>
                        </div>
                        <div className="form-group mr-1">
                            <select className="form-control select2_demo_1 form-control-solid"
                                    onChange={this.props.onInputSearchChange}
                                    value={this.props.inputValue.color_id}
                                    data-placeholder={'Color Name'}
                                    style={{width: 100 +'%'}}
                                    name="color_id" id="color_id">
                                <option value="">{'Select Color'}</option>
                                <option value={1}>{'Black'}</option>
                                <option value={2}>{'White'}</option>
                                <option value={3}>{'Red'}</option>
                                <option value={4}>{'Blue'}</option>
                                <option value={5}>{'Green'}</option>
                            </select>
                        </div>
                        <div className="form-group mr-1">
                            <select className="form-control select2_demo_1 form-control-solid"
                                    onChange={this.props.onInputSearchChange}
                                    value={this.props.inputValue.size_id}
                                    data-placeholder={'Product Size'}
                                    style={{width: 100 +'%'}}
                                    name="size_id" id="size_id">
                                <option value="">{'Select Size'}</option>
                                <option value={1}>{'Sm'}</option>
                                <option value={2}>{'Md'}</option>
                                <option value={3}>{'X'}</option>
                                <option value={4}>{'XL'}</option>
                                <option value={5}>{'XXL'}</option>
                            </select>
                        </div>
                        <div className="form-group mr-1">
                            <input type="text"
                                   className="form-control  form-control-solid"
                                   name="min_unit_cost" id="min_unit_cost"
                                   placeholder={'Min Unit Cost'}
                                   size="20"
                                   value={this.props.inputValue.min_unit_cost}
                                   onChange={this.props.onInputSearchChange}/>
                        </div>
                        <div className="form-group mr-1">
                            <input type="text"
                                   className="form-control  form-control-solid"
                                   name="max_unit_cost" id="max_unit_cost"
                                   placeholder={'Max Unit Cost'}
                                   size="20"
                                   value={this.props.inputValue.max_unit_cost}
                                   onChange={this.props.onInputSearchChange}/>
                        </div>

                        <div className="row" style={{float:"right"}}>
                                <input disabled={this.props.isLoading ? 'disabled' : ''}
                                       className="btn btn-outline-primary btn-rounded ml-2" value="Search" name="searchbtn"
                                       type="submit"/>
                                <a href={'#'} onClick={this.props.onSearchClear} style={{cursor:"pointer", paddingLeft:3+"px"}}>Clear filter</a>
                        </div>
                    </form>
                </div>
        );
    }
}

export default Search
