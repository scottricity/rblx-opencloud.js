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
         * @param {object} query
         * @param {string} query.prefix Return only data stores with this prefix
         * @param {number} query.limit Maximum number of items to return
         * @param {() => (object)} onData The callback to receive data
         */
        listDataStores(query, onData) {
            if (query.limit && typeof query.limit == "number"){
                if (!(query.limit > 0 && query.limit < 101)) return new Error("Query limit be within range 0 to 100");
            }
            if (typeof onData != "function") return new Error("Argument onData must be a function");
            got(`${this.baseURL}${this.universeId}/standard-datastores?limit=${query.limit ? query.limit : 1}&prefix=${query.prefix ? query.prefix : ""}`, {headers: {'x-api-key' : this.apiKey}}).then((resp => {
                if (resp){
                    onData(JSON.parse(resp.body))
                }
            }))
        }

        /**
         * Lua Equivalent [DataStore:ListKeysAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/ListKeysAsync)
         * @param {string} datastoreName  Name of the data store
         * @param {object} query Options for the query
         * @param {string} query.scope Defaults to `global`
         * @param {boolean} query.showAll If true, return keys from all scopes
         * @param {string} query.prefix Return only keys with this prefix
         * @param {number} query.limit Maximum number of items to return
         * @param {() => (object)} onData The callback to receive data
         */
        listEntries(datastoreName, query, onData){
            if (typeof datastoreName != "string") return new Error("Argument datastoreName must be a string");
            if (query.limit && typeof query.limit == "number"){
                if (!(query.limit > 0 && query.limit < 101)) return new Error("Query limit be within range 0 to 100");
            }

            if (typeof onData != "function") return new Error("Argument onData must be a function");

            got(`${this.baseURL}${this.universeId}/standard-datastores/datastore/entries?limit=${query.limit ? query.limit : 1}&prefix=${query.prefix ? query.prefix : ""}&AllScopes=${query.showAll ? query.showAll : false}&datastoreName=${datastoreName}&scope=${query.scope ? query.scope : "global"}`, {headers: {'x-api-key' : this.apiKey}}).then((resp => {
                if (resp){
                    onData(JSON.parse(resp.body))
                }
            }))
        }

        /**
         * 
         * @param {string} datastoreName Name of the data store
         * @param {object} query Options for the query
         * @param {string} query.scope Defaults to `global`
         * @param {string} query.entryKey The key which identifies the entry
         * @param {() => (object)} onData The callback to receive data
         */
        getEntry(datastoreName, query, onData){
            if (typeof onData != "function") return new Error("Argument onData must be a function");
            got(`${this.baseURL}${this.universeId}/standard-datastores/datastore/entries/entry?datastoreName=${datastoreName}&scope=${query.scope ? query.scope : "global"}&entryKey=${query.entryKey ? query.entryKey : ""}`, {headers: {'x-api-key' : this.apiKey}}).then((resp => {
                if (resp){
                    onData(JSON.parse(JSON.parse(resp.body)))
                }
            }))
        }
}

export { DataStoreAPI };