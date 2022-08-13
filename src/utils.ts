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

/** @internal */
export function findWithIndex<T>(array: T[], finder: (v: T) => boolean): readonly [value: T, index: number] | readonly [value: null, index: -1] {
    const index = array.findIndex(finder)
    if (index === -1) return [null, -1] as const
    const value = array[index]!
    return [value, index] as const
}
