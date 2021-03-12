import React from 'react';

import ListPage from './pages/ListPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ViewPage from './pages/ViewPage';

import AuthManager from '../../Service/Auth';

class Product extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            item: {},
            isEdit: false,
            isCreate: false,
            isView: false,
            isList:false
        };

        this._navigate = this._navigate.bind(this);
        Product.logOut = Product.logOut.bind(this);
    }

    /**
     * check render required or not
     *
     * @param nextProps
     * @param nextState
     * @param nextContext
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.isCreate !== nextState.isCreate
            || this.state.isEdit !== nextState.isEdit
            || this.state.isView !== nextState.isView
            || this.state.isList !== nextState.isList;
    }

    componentDidMount() {
        this.setState({isList:true});
    }

    static logOut(){
        AuthManager.signOut().then(value => {
        }).catch(err => {
        })
    }

    _navigate(page, item){
        switch (page.toLowerCase()) {
            case "edit":
                this.setState({isEdit:true,isCreate:false,isView:false, isList: false, item:item});
                break;
            case "create":
                this.setState({isCreate:true, isEdit:false, isView:false, isList:false, item:item});
                break;
            case "view":
                this.setState({isView:true, isEdit:false, isCreate:false, isList:false, item:item});
                break;
            case "logout":
                Product.logOut();
                break;
            default:
                this.setState({isEdit:false, isCreate:false, isView:false, isList:true});
                break
        }
    }

    /**
     * render create page
     *
     * @returns {Component}
     * @private
     */
    _renderCreatePage() {
        return(
            <CreatePage item={this.state.item} onApplyAction={this._navigate}/>);
    }

    /**
     * render edit page
     *
     * @returns {Component}
     * @private
     */
    _renderEditPage(){
        return(
            <EditPage item={this.state.item} onApplyAction={this._navigate}/>);
    }

    /**
     * render view page
     *
     * @returns {Component}
     * @private
     */
    _renderViewPage(){
        return (
            <ViewPage item={this.state.item} onApplyAction={this._navigate}/>);
    }

    /**
     * render list page
     *
     * @returns {Component}
     * @private
     */
    _renderListPage(){
        return(
            <ListPage onApplyAction={this._navigate}/>);
    }

    /**
     * render requested page
     *
     * @returns {Component}
     * @private
     */
    _renderPage(){
        if(this.state.isCreate
            && !this.state.isEdit && !this.state.isView) {
            return this._renderCreatePage();
        } else if(this.state.isEdit
            && !this.state.isCreate && !this.state.isView) {
            return this._renderEditPage();
        } else if(this.state.isView && !this.state.isCreate && ! this.state.isEdit){
            return this._renderViewPage();
        } else {
            return this._renderListPage();
        }

    }

    /**
     * render dom
     *
     * @returns {Component}
     */
    render() {
        return (
            this._renderPage()
        );
    }

}
//Product.context = AuthContext;
export default Product;