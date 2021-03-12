import React from 'react';
import _ from 'lodash';
import 'alertifyjs/build/css/alertify.min.css';
import * as alertify from 'alertifyjs';

import Table from "../../Common/Table";
import Rows from "../partials/Rows";

import Header from "../partials/Header";
import TableHeadings from "../partials/TableHeadings";
import Search from "../partials/Search";
import ProductRepository from "../../../repository/ProductRepository";
import Config from '../../../config/Config';
import BulkAction from  '../partials/BulkAction';
import Pagination from "react-js-pagination";
import PageLimit from "../partials/PageLimit";

class ListPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            items: {},
            lvlMessage: '',
            search: {},
            pageLimit: 10,
            activePage: 1,
            pageRangeDisplayed:6,
            totalRecord: 0,
            userGroupIds:[],
            isLoading: false,
            isClear: false,
            isSearching:false,
            allChecked: false,
            checkedIds: [],
            selectedIndex: -1,
            bulkAction: '',
        };

        this.repository = new ProductRepository();

        this.onPageChange = this.onPageChange.bind(this);
        this.onPageLimitChange = this.onPageLimitChange.bind(this);
        this.onBulkChange = this.onBulkChange.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onViewClick = this.onViewClick.bind(this);
        this.onCreateClick = this.onCreateClick.bind(this);
        this.onLogOutClick = this.onLogOutClick.bind(this);
        this.onRefreshDelete = this.onRefreshDelete.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.onApplyAction = this.onApplyAction.bind(this);
    }

    componentDidMount() {
        this.getAll(this.state.pageLimit, this.state.activePage);
    }

    getAll(pageLimit = 5, pageNumber = 1){
        this.setState({isLoading:true, activePage:pageNumber});
        this.makeQuery(pageLimit, pageNumber).then(query => {
            this.repository.findAll(query, responseData => {
                if (responseData.status) {
                    this.setState({
                        items: responseData.data,
                        pageLimit: responseData.page_limit,
                        totalRecord: responseData.totalRecord,
                        isLoading: false,
                        isClear: false
                    });
                } else {
                    this.setState({isLoading: false, isClear: false});
                    this._processException(responseData);
                }
            }, err => console.log(err));

        });
    }

    onPageChange(pageNumber) {
        if (this.state.isLoading || this.state.activePage === pageNumber)
            return false;
        else {
            this.setState({isLoading:true,activePage: pageNumber,checkedIds:[]});
            this.getAll(this.state.pageLimit, pageNumber);
        }
    }

    onPageLimitChange(event) {
        event.preventDefault();
        this.setState({isLoading:true, pageLimit: parseInt(event.target.value),checkedIds:[]});
        this.getAll(event.target.value, 1);
    }

    onBulkChange(event) {
        event.preventDefault();
        if (this.state.isLoading)
            return false;
        else
            this.setState({bulkAction: event.target.value});
    }

    onApplyAction(event) {
        let ids = this.state.checkedIds;
        if (this.state.bulkAction === "movetotrash" && ids.length > 1) {
          alertify.confirm("Are you sure", () => {
                let formData = new FormData();
                formData.append('ids',ids);
                this.repository.deleteAll("delete-all", formData, async (responseData) => {
                    if (responseData.status) {
                        this.setState({checkedIds: [], bulkAction: ''});
                        this._processResponse(responseData);
                        this.getAll(this.state.pageLimit, 1);
                    } else {
                        this._processException(responseData);
                    }
                }, err => {
                    console.log("Error from applyAction");
                });
            });
        }else {
            alertify.error("You missing Action Or Must minimum 2 item select required");
        }
    }

    onSearchChange(event) {
        event.preventDefault();
        let key = event.target.name;
        let value = event.target.value;
        let updated = {};
        let extended;
        if(key === "min_unit_cost" || key === "max_unit_cost"){
            updated[key] = value.replace(/\D/g, "");
            extended = _.extend(this.state.search, updated);
        }else {
            updated[key] = value;
            extended = _.extend(this.state.search, updated);
        }

        this.setState({search: extended});
    }


    onSearchSubmit(event) {
        event.preventDefault();
        if(this.state.isLoading) {
            return false;
        }else {
            this.setState({isLoading:true});
            this.getAll(this.state.pageLimit, 1);
        }
    }

    async makeQuery(pageLimit, pageNumber) {
        let esc = encodeURIComponent;
        let pageQuery = "";
        let searchQuery = await Object.keys(this.state.search)
            .filter(k => k !== 'from_date' && k !== 'to_date')
            .map(k => esc(k) + '=' + esc(this.state.search[k]))
            .join('&');
        if (pageLimit > 0 && pageNumber > 0)
            pageQuery = '?page_limit=' + pageLimit + '&page=' + pageNumber;
        return !_.isEmpty(searchQuery) && !this.state.isClear ? pageQuery + '&' + searchQuery : pageQuery;
    }

    onClear(event) {
        event.preventDefault();
        if(this.state.isLoading) {
            return false;
        }else {
            this.setState({isLoading:true, isClear:true, search:{}, activePage:1,checkedIds:[]});
            this.getAll(this.state.pageLimit, 1);
        }
    }

    onRefreshDelete(id) {
        let refreshData = _.filter(this.state.items.data, (user) => {
            return user.id !== id;
        });
        this.setState({users: {data: refreshData}, totalRecord: this.state.totalRecord - 1});
    }

    onDeleteClick(id) {
        alertify.confirm("Are you sure",  () => {
            let formData = new FormData();
            formData.append("id", id);
            this.repository.delete("delete", formData, async (responseData) => {
                if (responseData.status) {
                    this._processResponse(responseData);
                    this.getAll(this.state.pageLimit, 1);
                } else {
                    this._processException(responseData);
                }
            }, err => {
                //todo
                console.log("Error from delete")
            });
        }, () => {
            // user clicked "cancel"
            alertify.error("You've clicked Cancel");
        });
    }

    onCreateClick(event) {
        let data = {};
        data.item = {};
        this.props.onApplyAction("create", data);
    }

    onEditClick(item) {
        let data = {};
        data.item = item;
        this.props.onApplyAction("edit", data);
    }

    onViewClick(item){
        let data = {};
        data.item = item;
        this.props.onApplyAction("view", data);
    }

    onLogOutClick(){
        console.log("logout");
        let data = {};
        this.props.onApplyAction("logout", data);
    }

    onChecked(event) {
        if (event.target.name === 'main-checkbox') {
            this.setState({allChecked: !this.state.allChecked});
            if (this.state.allChecked) {
                this.setState({checkedIds: []});
            } else {
                let ids = [];
                _.forEach(this.state.items.data, function (item, index) {
                    ids[index] = item.token;
                });
                this.setState({checkedIds: ids});
            }
        } else {
            let selectedId = event.target.value;
            let selectedIndex = -1;
            if (!_.isEmpty(this.state.checkedIds)) {
                _.forEach(this.state.checkedIds, function (id, index) {
                    if (selectedId === id) {
                        selectedIndex = index;
                        return;
                    }
                });
            }
            if (selectedIndex > -1) {
                let removeIds = _.filter(this.state.checkedIds, function (id) {
                    return id !== selectedId;
                });
                let isAllChecked = _.size(removeIds) === parseInt(this.state.totalRecord > this.state.pageLimit ? this.state.pageLimit : this.state.totalRecord);
                this.setState({allChecked: isAllChecked, checkedIds: removeIds});
            } else {
                let checkedIds = this.state.checkedIds;
                checkedIds[_.size(checkedIds)] = selectedId;
                let isAllChecked = parseInt(_.size(checkedIds)) === parseInt(this.state.totalRecord > this.state.pageLimit ? this.state.pageLimit : this.state.totalRecord);
                this.setState({allChecked: isAllChecked, checkedIds: checkedIds});
            }

        }
    }

    componentWillUnmount() {
        if(typeof this.repository !== 'undefined'){
            this.repository.dispose();
            this.repository =  null;
        }
    }

    _processResponse(responseData){
        this.setState({errors:[], btnStatus: '', btnText: ''});
        alertify.success(responseData.message);

    }

    _processException(responseData){
        if (responseData.level === 'error') {
            this.setState({errors: responseData.errors, btnStatus: '', btnText: ''});
        } else if (responseData.isLocal) {
            console.log("Error from isLocal");
        } else if (responseData.level === 'danger') {
            alertify.error(responseData.message);
        }else{
            console.log("Error from others");
        }
    }

    _renderHeader(){
        return(
            <Header onCreate={this.onCreateClick} headTitle={"Create"}/>
        );
    }

    static _renderLoader(){
        return (
            <div className="row center">
                <div style={{width:'20px', margin:'0 auto'}}>
                    <img src={Config.BASE_URL + "/page-loader.gif"} alt="" width={40}/>
                </div>
                <div className="col-md-12">&nbsp;</div>
            </div>
        );
    }

     _renderPageHeader(){
        return (
            <nav className="navbar">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        Admin Panel
                    </a>
                    <a style={{fontSize:16+"px"}} onClick={this.onLogOutClick} className="navbar-brand" href="#">
                        Logout
                    </a>
                </div>
            </nav>
        );
    }

    _renderData(){
        return(
            <Table id="datatable" class="table table-bordered table-hover" style={{width: 100 + '%'}}>
                <TableHeadings allChecked={this.state.allChecked} onCheckedClick={this.onChecked}/>
                <tbody>
                {
                    _.map(this.state.items, (data, index) => <Rows checkedIds={this.state.checkedIds}
                                                      allChecked={this.state.allChecked}
                                                      onCheckedClick={this.onChecked}
                                                      onViewCallback={this.onViewClick}
                                                      onEditCallback={this.onEditClick}
                                                      onDeleteCallback={this.onDeleteClick}
                                                      item={data} key={index} index={index}/>)
                }
                </tbody>
            </Table>

        );
    }

    _renderDataList(){
        //console.log("List: "+ this.state.isLoading);
        if(this.state.isLoading)
            return ListPage._renderLoader();
        else
            return this._renderData();

    }

     _renderSearch(){
        return(
            <Search isLoading={this.state.isLoading}
                    isClear={this.state.isClear}
                    isSearching={this.state.isSearching}
                    lvlMessage={this.state.lvlMessage}
                    inputValue={this.state.search}
                    onSearchHandle={this.onSearchSubmit}
                    onSearchClear={this.onClear}
                    onInputSearchChange={this.onSearchChange}/>
        );
    }

    _renderPagination(){
        return(
            <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.pageLimit}
                totalItemsCount={this.state.totalRecord}
                pageRangeDisplayed={this.state.pageRangeDisplayed}
                itemClass="page-item"
                linkClass="page-link"
                onChange={this.onPageChange}
                prevPageText={"<"}
                firstPageText={"<<"}
                lastPageText={">>"}
                nextPageText={">"}/>
        );
    }

    _renderBulkAction(){
        return(<BulkAction onBulkChange={this.onBulkChange}
                           bulkAction={this.state.bulkAction}
                           onApply={this.onApplyAction}/>);
    }

    _renderPageLimit(){
        return(
            <PageLimit isLoading={this.state.isLoading}
                       pageLimit={this.state.pageLimit}
                       onPageLimitCallback={this.onPageLimitChange}/>);
    }

    render() {
        return(
            <>
                <div className="container">
                    {this._renderPageHeader()}
                        {/* start Head */}
                        {this._renderHeader()}
                        {/* end Head */}
                        <div className="card">
                            {/*start Search*/}
                            <div className="card-body">
                            {this._renderSearch()}
                            {/* End Search*/}
                            </div>

                            {/*Bulk Action*/}
                            {this._renderBulkAction()}
                            {/*End Bulk Action*/}

                            <div className="table-responsive row justify-content-center">
                                <div id="datatable_wrapper"
                                     className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                    {/* loader here*/}
                                    {
                                      !this.state.isLoading && _.isEmpty(this.state.items) && (
                                            <div className="row">
                                                <div className="col-md-12 align-center"><p
                                                    className="text-danger">Item(s) Not Match Your Query</p></div>
                                            </div>
                                        )
                                    }

                                    {/*ProductTable*/}
                                    {
                                        this._renderDataList()
                                    }
                                    {/*End ProductTable*/}
                                    {/*PageLimit*/}
                                    <div className="pull-left">
                                     {this._renderPageLimit()}
                                    </div>
                                    {/*PageLimit*/}
                                    {/*ProductPaginate*/}
                                    <div className="pull-right">
                                        {this._renderPagination()}
                                    </div>
                                    {/*End  ProductPaginate*/}
                                </div>
                            </div>
                            {/*End ProductListSection*/}
                        </div>
                </div>
            </>
        )

    }
}

export default ListPage;