export default class HttpService {
    /**
     * send to request
     *
     * @param url
     * @param options
     * @param resolve
     * @param reject
     * @returns {Promise<any>}
     */
    processRequest(url, options, resolve, reject) {
       fetch(url, options)
            .then(response => response.json())
            .then(responseData => {
                resolve(responseData);
            }).catch(err => reject(err));
    }
}

