import got from "got";

class DataStoreAPI {
    baseURL = "https://apis.roblox.com/datastores/v1/universes/"

    constructor (universeId, apiKey){
        
        if (typeof universeId != "number") return new Error("Argument universeId must be a number (Roblox Id)");
        if (typeof apiKey != "string") return new Error("Argument apiKey must be a string (Roblox API Key)");
        this.universeId = universeId
        this.apiKey = apiKey
    }
        /**
         * List DataStores in Universe
         * @param {string} prefix Return only datastores with this prefix
         * @param {number} limit Maximum number of items to return
         * @param {string} cursor Provide to request the next set of data (See [Cursors](https://devforum.roblox.com/t/open-cloud-data-store-api-reference/1736533#heading--cursors))
         * @param {()} onData The callback to receive data
         */
        listDataStores(prefix, limit, onData) {
            if (typeof limit != "number") return new Error("Argument limit must be a number");
            if (!(limit > 0 && limit < 101)) return new Error("Argument limit be within range 0 to 100");
            if (typeof onData != "function") return new Error("Argument onData must be a function");
            got(`${this.baseURL}${this.universeId}/standard-datastores?limit=${limit}&prefix=${prefix}`, {headers: {'x-api-key' : this.apiKey}}).then((resp => {
                if (resp){
                    onData(JSON.parse(resp.body))
                }
            }))
        }

        /**
         * 
         * @param {string} datastoreName  Name of the data store
         * @param {string} scope Defaults to `global`.
         * @param {boolean} allScopes If true, return keys from all scopes
         * @param {string} prefix Return only datastores with this prefix
         * @param {number} limit Maximum number of items to return
         * @param {() => (object)} onData The callback to receive data
         */
        listEntries(datastoreName, options, onData){
            if (typeof datastoreName != "string") return new Error("Argument datastoreName must be a string");
            if (typeof scope != "string") return new Error("Argument scope must be a string");
            if (typeof allScopes != "boolean") return new Error("Argument allScopes must be a boolean");
            if (typeof prefix != "string") return new Error("Argument prefix must be a string");

            if (typeof limit != "number") return new Error("Argument limit must be a number");
            if (!(limit > 0 && limit < 101)) return new Error("Argument limit be within range 0 to 100");
            if (typeof onData != "function") return new Error("Argument onData must be a function");

            got(`${this.baseURL}${this.universeId}/standard-datastores/datastore/entries?limit=${limit}&prefix=${prefix}&AllScopes=${allScopes}&datastoreName=${datastoreName}&scope=${scope}`, {headers: {'x-api-key' : this.apiKey}}).then((resp => {
                if (resp){
                    onData(JSON.parse(resp.body))
                }
            }))
        }
}

export { DataStoreAPI };