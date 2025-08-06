import type { ResultTuple } from "./types.ts"

export default class Result<T> extends Array<T | Error | null> {
    constructor(tuple: ResultTuple<T>) {
        super(2)
        this[0] = tuple[0]
        this[1] = tuple[1]
    }

    onError(callback: (error: Error) => void | Promise<void>): this {
        if (this[1] instanceof Error) {
            callback(this[1])
        }
        return this
    }

    async onErrorAwait(
        callback: (error: Error) => void | Promise<void>
    ): Promise<this> {
        if (this[1] instanceof Error) {
            await callback(this[1])
        }
        return this
    }

    onSuccess(callback: (value: T) => void | Promise<void>): this {
        if (this[0] !== null && !(this[0] instanceof Error)) {
            callback(this[0])
        }
        return this
    }

    async onSuccessAwait(
        callback: (value: T) => void | Promise<void>
    ): Promise<this> {
        if (this[0] !== null && !(this[0] instanceof Error)) {
            await callback(this[0])
        }
        return this
    }
}
