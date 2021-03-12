import React from 'react'
import _ from 'lodash'

export default class Rows extends React.Component {

    constructor(props) {
        super(props);
        this.onViewClick = this.onViewClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    onViewClick(event) {
        event.preventDefault();
        this.props.onViewCallback(this.props.item);
    }

    onEditClick(event) {
        event.preventDefault();
        this.props.onEditCallback(this.props.item);
    }

    onDeleteClick(event) {
        event.preventDefault();
        this.props.onDeleteCallback(this.props.item.token);
    }

    render() {
        const {item, index} = this.props;
        let isChecked = this.props.allChecked || (! _.isEmpty(this.props.checkedIds) && _.includes(this.props.checkedIds, item.token));
        return (
            <tr id={item.token}>
                <td>
                    <label className="checkbox checkbox-ebony">
                        <input name="check-box" value={item.token} id={index} type="checkbox" onChange={this.props.onCheckedClick} checked={isChecked} className="bulk-action"/>
                        <span className="input-span"/>
                    </label>
                </td>
                {/*<td>{item.id}</td>*/}
                <td>{item.name ?? 'NA'}</td>
                <td>{item.category.category_name ?? 'NA'}</td>
                <td>{item.vendor.v_name ?? 'NA'}</td>
                <td>{item.unit_price ?? 'NA'}</td>
                <td>{item.unit_cost ?? 'NA'}</td>
                <td>{item.hand_on_qty ?? 'NA'}</td>
                <td className="text-center">
                    <a className="text-muted font-16 mr-1 ml-1" onClick={this.onDeleteClick} data-id="userid">
                        <i className="fa fa-trash" style={{cursor:"pointer"}}/>
                    </a>
                    <a className="text-muted font-16 mr-1 ml-1" onClick={this.onEditClick}>
                        <i className="fa fa-pencil" style={{cursor:"pointer"}}/>
                    </a>
                    <a className="text-muted font-16 mr-1 ml-1" onClick={this.onViewClick}>
                        <i className="fa fa-eye"  style={{cursor:"pointer"}}/>
                    </a>
                </td>
            </tr>
        );
    }
}
