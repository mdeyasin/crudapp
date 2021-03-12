import React from 'react'


class TableHeadings extends React.PureComponent{
    render() {
        return(
            <>
                <thead className="thead-default thead-lg">
                    <tr>
                        <th className={"no-sort"} style={{width: 5 + '%'}}>
                            <label className="checkbox checkbox-ebony">
                                <input name="main-checkbox" type="checkbox" checked={this.props.allChecked}
                                       onChange={this.props.onCheckedClick} className="bulk-action"
                                       id="main-checkbox"/>
                                <span className="input-span"/>
                            </label>
                        </th>
                        {/*<Th>{'ID'}</Th>*/}
                        <th>{'Name'}</th>
                        <th>{'C.Name'}</th>
                        <th>{'V.Name'}</th>
                        <th>{'U.Cost'}</th>
                        <th>{'U.Price'}</th>
                        <th>{'Q. On hand'}</th>
                        <th className="no-sort text-center">{'Action'}</th>
                    </tr>
                </thead>
            </>
        );
    }
}

export default TableHeadings;