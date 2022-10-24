//Used for me, I don't expect this to be an optimized module.

/**
 * @param {Object} data The object to serialize into url parameters
 */
var serializer = (data) => {
    return Object.keys(data).map(k => `${Object.keys(data).indexOf(k) == 0 ? "?" : "&"}${k}=${data[k]}`).join("")
}

class queryManager {
    /**
     * 
     * @param {any} obj 
     */
    constructor(obj){
        this.obj = obj
    }

    serialize () {
        return serializer(this.obj)
    }

    raw () {
        return this.obj
    }
}

export {queryManager}