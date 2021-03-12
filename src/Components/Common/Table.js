import React from 'react'

class Table extends React.PureComponent{
    render() {
        return(
            <table id={this.props.id} className={this.props.class} style={this.props.style}>
                {this.props.children}
            </table>
        )
    }
}

export default Table;