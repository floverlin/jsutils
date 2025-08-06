import PromiseLike from "./PromiseLike.ts"
import type Result from "./Result.ts"

export default class PromiseResult<T> extends PromiseLike<Result<T>> {
    constructor(promise: Promise<Result<T>>) {
        super(promise)
    }

    onError(callback: (error: Error) => void | Promise<void>): this {
        this.then((result) => result.onError(callback))
        return this
    }

    async onErrorAwait(callback: (error: Error) => void | Promise<void>): Promise<this> {
        const result = await this.then()
        await result.onErrorAwait(callback)
        return this
    }

    onSuccess(callback: (value: T) => void | Promise<void>): this {
        this.then((value) => value.onSuccess(callback))
        return this
    }

    async onSuccessAwait(callback: (value: T) => void | Promise<void>): Promise<this> {
        const value = await this.then()
        await value.onSuccessAwait(callback)
        return this
    }
}
