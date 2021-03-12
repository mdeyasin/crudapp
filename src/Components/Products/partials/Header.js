import React from 'react';

class Header extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="well">
                    <a onClick={this.props.onCreate} className="ml-3 btn btn-sm btn-primary pull-right">
                        <i className="fa fa-plus-circle">{this.props.headTitle}</i>
                    </a>
                </div>
            </div>
        );
    }
}

export default Header
