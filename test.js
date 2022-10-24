import {DataStoreAPI} from "./index.js";
import test from "./private.json" assert {type: "json"}

let api = new DataStoreAPI(4000076107, test.apiKey)

api.getEntry("PUBLIC", {entryKey: "50564727"}, (data) => {
    console.log(data)
})