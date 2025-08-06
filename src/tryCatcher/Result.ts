import type { ResultTuple } from "./types.ts"

export default class Result<T> extends Array<T | Error | null> {
    constructor(tuple: ResultTuple<T>) {
        super(2)
        this[0] = tuple[0]
        this[1] = tuple[1]
    }

    onError(callback: (error: Error) => void): Result<T> {
        if (this[1] instanceof Error) {
            callback(this[1])
        }
        return this
    }

    onSuccess(callback: (value: T) => void): Result<T> {
        if (this[0] !== null && !(this[0] instanceof Error)) {
            callback(this[0])
        }
        return this
    }
}
