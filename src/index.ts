import {JSONSchema7} from "json-schema"
import {schema as normalizrSchema} from "normalizr"
import Entity = normalizrSchema.Entity

let store: { [k: string]: Entity } = {}
let x: JSONSchema7 = {}

function parse(schema: JSONSchema7): any {
    if ((schema as any).entity!) {
        if (store[(schema as any).entity]) {
            return store[(schema as any).entity]
        }
    }

    switch (schema.type) {
        case "number":
            return
        case "null":
            return
        case "boolean":
            return
        case "string":
            return
        case "array":
            if (typeof schema.items !== 'object') {
                throw Error('Not implemented')
            }
            return new normalizrSchema.Array(parse(<JSONSchema7>schema.items))

        case "object":
            return null
        default:
            throw Error("Can't parse")
    }
}