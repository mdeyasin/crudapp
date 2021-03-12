import React from 'react';

class PageLimit extends React.Component {

    render() {
        return (
                <div className="col-xs-2 col-sm-3 col-md-3 col-lg-3 align-left">
                    <form>
                        <select disabled={this.props.isLoading ? 'disabled' :''} value={this.props.pageLimit} onChange={this.props.onPageLimitCallback} name="page_limit" className="form-control form-control-solid form-control-sm d-inline"
                                style={{width: 'auto'}}>
                            <option value="5">5
                            </option>
                            <option value="10">10
                            </option>
                            <option value="15">15
                            </option>
                            <option value="20">20
                            </option>
                            <option value="25">25
                            </option>
                            <option value="30">30
                            </option>
                            <option value="40">40
                            </option>
                        </select>
                    </form>
                </div>

        );
    }
}

export default PageLimit
