import Config from '../config/Config';

export default class Validator {
    /**
     * validate check for email
     *
     * @param value
     * @returns {boolean}
     */
    static isValidateEmail(value) {
        return value.match(Config.regex.email);
    }

    /**
     * validate check for password
     *
     * @param value
     * @returns {boolean}
     */
    static isValidatePassword(value) {
        return value.match(Config.regex.password);
    }
}
