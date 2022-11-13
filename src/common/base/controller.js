import tryCatchWrapper from '../utils/try-catch-wrapper.js';

class BaseController {
    constructor(service) {
        this.service = service;
        this._wrapperTryCatch();
    }

    _wrapperTryCatch() {
        const objectPrototype = Object.getPrototypeOf(this);
        const properties = Object.getOwnPropertyNames(objectPrototype);
        const functionProperties = properties.filter(name => typeof this[name] === 'function' && name !== 'constructor');
        functionProperties.forEach(method => {
            this[method] = tryCatchWrapper({
                context: this,
                method: this[method],
            });
        });
    }
}

export default BaseController;
