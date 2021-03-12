import HttpService from "../Service/HttpService";
import Config from '../config/Config';

export default class ProductRepository {

    /**
     * setUp all default value
     *
     * @param pageUrl
     */
    constructor(pageUrl = "") {
        this.pageUrl = ! pageUrl ? Config.API_URL + '/products/' : pageUrl;
        this.httpService = new HttpService();
    }

    /**
     * get all products by given search params
     *
     * @param params
     * @param resolve
     * @param reject
     * @returns {Promise<any>}
     */
    findAll(params, resolve, reject) {
        let headers = {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
        return this.httpService.processRequest(this.pageUrl + params, headers, resolve, reject);
    }

    /**
     * get an product by given id
     *
     * @param id
     * @param resolve
     * @param reject
     * @returns {Promise<any>}
     */
    findById(id, resolve, reject) {
        let url = this.pageUrl + 'id';
        url = url.replace('id', id);
        let headers = {
            method: 'GET',
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            },
        };
        return this.httpService.processRequest(url, headers, resolve, reject);
    }

    /**
     *
     * @param action
     * @param formData
     * @param resolve
     * @param reject
     * @returns {Promise<any>}
     */
    save(action, formData, resolve, reject) {
        let headers = {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: formData
        };
        return this.httpService.processRequest(this.pageUrl + action, headers, resolve, reject);
    }

    /**
     * delete an product by given id
     *
     * @param action
     * @param formData
     * @param resolve
     * @param reject
     * @returns {Promise<any>}
     */
    delete(action, formData, resolve, reject) {
        let headers = {
            method: 'POST',
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            body:formData
        };
        return this.httpService.processRequest(this.pageUrl + action, headers, resolve, reject);
    }

    /**
     * delete  products by given ids
     *
     * @param action
     * @param formData
     * @param resolve
     * @param reject
     * @returns {Promise<any>}
     */
    deleteAll(action, formData, resolve, reject) {
        console.log(this.pageUrl + action);
        let headers = {
            method: 'POST',
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            },
            body:formData,
        };
        return this.httpService.processRequest(this.pageUrl + action, headers, resolve, reject);
    }


    /**
     * release all un-manage resource
     */
    dispose(){
        this.pageUrl = '';
        if(typeof this.httpService !== 'undefined'){
            this.httpService = null;
        }
    }

}