
type ValidationSchema<T> =
    null extends T ? ['nullable', ValidationSchema<NonNullable<T>>] :
    undefined extends T ? ['optional', ValidationSchema<NonNullable<T>>] :
    T extends boolean ? 'boolean' :
    T extends string ? 'string' | ['stringEnum', string[]] :
    T extends number ? 'number' | ['numberEnum', number[]] :
    T extends Function ? 'function' :
    T extends Array<infer E> ? ['array', ValidationSchema<E>] :
    ['object', { [K in keyof T]-?: ValidationSchema<T[K]> }]

export function validate<T>(value: T, name: string, schema: ValidationSchema<T>) {
    if (typeof schema === 'string') {
        if (typeof value !== schema) throw new Error(`${name} must be a ${schema} (got ${typeof value} instead)`)
    } else if (Array.isArray(schema)) {
        const [type, subSchema] = schema
        if (type === 'nullable') {
            if (value !== null) validate(value, name, subSchema as any)
        } else if (type === 'optional') {
            if (value !== undefined) validate(value, name, subSchema as any)
        } else if (type === 'stringEnum') {
            if (typeof value !== 'string') throw new Error(`${name} must be a string (got ${typeof value} instead)`)
            if (subSchema.indexOf(value) === -1) throw new Error(`${name} must be one of the following: ${subSchema.map(s => JSON.stringify(s)).join(', ')}`)
        } else if (type === 'numberEnum') {
            if (typeof value !== 'number') throw new Error(`${name} must be a number (got ${typeof value} instead)`)
            if (subSchema.indexOf(value) === -1) throw new Error(`${name} must be one of the following: ${subSchema.map(s => JSON.stringify(s)).join(', ')}`)
        } else if (type === 'array') {
            if (!Array.isArray(value)) throw new Error(`${name} must be an array (got ${typeof value} instead)`)
            for (let i = 0; i < value.length; i++) validate(value[i], `${name}[${i}]`, subSchema as any)
        } else if (type === 'object') {
            if (typeof value !== 'object') throw new Error(`${name} must be an object (got ${typeof value} instead)`)
            for (const k in schema) {
                if (!(k in value)) throw new Error(`${name}.${k} must be set`)
                validate((value as any)[k], `${name}.${k}`, (schema as any)[k])
            }
            for (const k in value) {
                if (!(k in schema)) throw new Error(`${name}.${k} must not be set`)
            }
        }
    }
}