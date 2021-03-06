const ID_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'

/** @internal */
export function generateID(length: number): string {
    let id = ''
    for (let i = 0; i < length; i++) {
        id += ID_CHARS[Math.floor(Math.random() * ID_CHARS.length) % ID_CHARS.length]
    }
    return id
}

/** @internal */
export function filterFalsy<T>(value: T | null | undefined): value is T {
    return !!value
}

/** @internal */
export function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
