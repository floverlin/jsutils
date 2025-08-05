import type { Result } from "./types.ts"

function tryCatcher<T, I extends unknown[]>(
    func: (...args: I) => T,
    ...args: I
): Result<T>

function tryCatcher<T, I extends unknown[]>(
    func: (...args: I) => Promise<T>,
    ...args: I
): Promise<Result<T>>

function tryCatcher<T, I extends unknown[]>(
    func: (...args: I) => T | Promise<T>,
    ...args: I
): Result<T> | Promise<Result<T>> {
    try {
        const resultValue = func(...args)
        if (resultValue instanceof Promise) {
            return resultValue
                .then((value) => [value, null])
                .catch((error: unknown) => wrapError(error)) as Promise<
                Result<T>
            >
        }
        return [resultValue, null]
    } catch (error: unknown) {
        return wrapError(error)
    }
}

function wrapError(error: unknown): [null, Error] {
    const message = error instanceof Error ? error.message : String(error)
    return [null, new Error(message, { cause: error })]
}

export default tryCatcher
