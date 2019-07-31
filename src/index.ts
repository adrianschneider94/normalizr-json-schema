import {JSONSchema4, JSONSchema6} from "json-schema"
import {schema as normalizrSchema} from "normalizr"
import {JSONSchema} from "json-schema-ref-parser"

function isObject(obj: any) {
    return obj === Object(obj)
}

function isEmpty(obj: any) {
    return Object.entries(obj).length === 0 && obj.constructor === Object
}

export type JSONSchema = JSONSchema4 | JSONSchema6

// Add this function -- otherwise testing doesn't work...
Object.fromEntries = (array: Array<[string, any]>) =>
    Object.assign({}, ...Array.from(array, ([key, value]: [string, any]) => ({[key]: value})))

/**
 * The identity operator.
 * @param x
 * @returns {any}
 */
export function identity<T>(x: T): T {
    return x
}


/**
 * Map function for objects. The first argument is the object, the second argument is a function that takes a tuple
 * [key, value] and returns a tuple [newKey, newValue]
 * @param object
 * @param mapFunction
 * @returns {any}
 */
export function objectMap(object: any, mapFunction: ([key, value]: [string, any]) => [string, any] = identity):
    typeof object {

    return Object.fromEntries(
        Object.entries(object).map(([k, v]: [string, any]) => mapFunction([k, v]))
    )

}

/**
 * Filter function for objects. The first argument is the object, the filterFunction takes a tuple [key, value] and
 * returns a boolean.
 * @param object
 * @param filterFunction
 * @returns {any}
 */
export function objectFilter(object: any, filterFunction: ([key, value]: [string, any]) => boolean = () => true):
    typeof object {

    return Object.fromEntries(
        Object.entries(object).filter(([k, v]: [string, any]) => filterFunction([k, v]))
    )

}


export let store: { [key: string]: normalizrSchema.Entity } = {}

export function parse(schema: JSONSchema, recStack: Array<any> = []): any {

    let entity = (schema as any).entity!

    if (entity) {
        if (store[entity]) {
            return store[entity]
        } else {
            store[entity] = new normalizrSchema.Entity(entity)
        }
    }

    let returnedSchema: any = null

    if (recStack.includes(schema)) {
        throw Error("Circular dependency!")
    }

    // @ts-ignore -- Types are wrong...
    if (typeof schema.type !== 'array') {
        switch (schema.type) {
            case "number":
                returnedSchema = undefined
                break
            case "null":
                returnedSchema = undefined
                break
            case "boolean":
                returnedSchema = undefined
                break
            case "string":
                returnedSchema = undefined
                break
            case "array":
                if (typeof schema.items !== 'object') {
                    throw Error('Not implemented')
                }
                returnedSchema = new normalizrSchema.Array(parse(<JSONSchema>schema.items, [...recStack, schema]))
                break
            case "object":
                if (schema.properties && (!(isObject(schema.additionalProperties)))) {
                    returnedSchema = objectFilter(objectMap(schema.properties,
                        ([key, value]: [string, any]) => {
                            return [key, parse(value, [...recStack, schema])]
                        }
                    ), ([key, value]: [string, any]) => (value !== undefined))
                } else if (isObject(schema.additionalProperties) && isEmpty(schema.properties)) {
                    returnedSchema = new normalizrSchema.Values(parse(<JSONSchema>schema.additionalProperties, [...recStack, schema]), 'key')
                } else {
                    returnedSchema = undefined
                }
                break
            default:
                returnedSchema = undefined
        }
    } else {
        returnedSchema = undefined
    }

    if (entity) {
        store[entity].define(returnedSchema)
        return store[entity]
    }

    return returnedSchema

}
