import React from 'react';

class BulkAction extends React.PureComponent {

    render() {
        return (
            <div className="row mb-4 mt-4">
                <div className="col-sm-12 col-md-6 col-lg-2" style={{margin:1+'px'}}>
                    <select value={this.props.bulkAction}
                            onChange={this.props.onBulkChange} id="bulkaction"
                            className="form-control form-control-solid">
                        <option value="">Select Action</option>
                        <option value="movetotrash">Move to trash</option>
                    </select>
                </div>
                <div className="col-xs-12 col-sm-1 col-md-1 col-lg-1">
                    <button onClick={this.props.onApply} id="applybtn" className="btn btn-primary">Apply</button>
                </div>
            </div>
        );
    }
}

export default BulkAction
