import PromiseResult from "./PromiseResult.ts"
import Result from "./Result.ts"
import type { ResultErr } from "./types.ts"

function tryCatcher<T, I extends unknown[]>(
    func: (...args: I) => Promise<T>,
    ...args: I
): PromiseResult<T>

function tryCatcher<T, I extends unknown[]>(
    func: (...args: I) => T,
    ...args: I
): Result<T>

function tryCatcher<T, I extends unknown[]>(
    func: (...args: I) => T | Promise<T>,
    ...args: I
): Result<T> | PromiseResult<T> {
    try {
        const resultValue = func(...args)
        if (resultValue instanceof Promise) {
            return new PromiseResult(
                resultValue
                    .then((value) => new Result([value, null]))
                    .catch((error: unknown) => new Result<T>(wrapError(error)))
            )
        }
        return new Result([resultValue, null])
    } catch (error: unknown) {
        return new Result<T>(wrapError(error))
    }
}

function wrapError(error: unknown): ResultErr {
    const message = error instanceof Error ? error.message : String(error)
    return [null, new Error(message, { cause: error })]
}

export default tryCatcher
