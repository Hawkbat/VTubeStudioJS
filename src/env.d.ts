
declare function setTimeout(callback: () => void, ms: number): number
declare function clearTimeout(handle: number): void
declare namespace console {
    function log(...msgs: any[]): void
    function error(...msgs: any[]): void
}
