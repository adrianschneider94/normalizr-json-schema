import {normalize, schema} from "normalizr"
import Entity = schema.Entity

let testData = {
    "amount": {
        "id": 1,
        "type": "Double",
        "value": 30,
        "valueInfo": {}
    },
    "approverGroups": {
        "type": "Object",
        "value": [
            "accounting",
            "sales"
        ],
        "valueInfo": {
            "objectTypeName": "java.util.ArrayList",
            "serializationDataFormat": "application/x-java-serialized-object"
        }
    },
    "invoiceNumber": {
        "type": "String",
        "value": "GPFE-23232323",
        "valueInfo": {}
    },
    "invoiceDocument": {
        "type": "File",
        "value": null,
        "valueInfo": {
            "filename": "invoice.pdf",
            "mimeType": "application/pdf"
        }
    },
    "creditor": {
        "type": "String",
        "value": "Great Pizza for Everyone Inc.",
        "valueInfo": {}
    },
    "invoiceCategory": {
        "type": "String",
        "value": "Travel Expenses",
        "valueInfo": {}
    }
}
let variable = new Entity('variable', {}, {idAttribute: (value, parent, key) => key})
let testSchema = new schema.Values(variable)
console.log(normalize(testData, testSchema))
/**
 $RefParser.dereference("test/jsonschemas/VariableMap.json").then((schema) => {
    console.log(normalize(testData, parse(schema)))

})
 */
