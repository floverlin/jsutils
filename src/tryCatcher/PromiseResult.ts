import PromiseLike from "./PromiseLike.ts"
import type Result from "./Result.ts"

export default class PromiseResult<T> extends PromiseLike<Result<T>> {
    constructor(promise: Promise<Result<T>>) {
        super(promise)
    }

    onError(callback: (error: Error) => void): PromiseResult<T> {
        this.then((result) => result.onError(callback))
        return this
    }

    onSuccess(callback: (value: T) => void): PromiseResult<T> {
        this.then((value) => value.onSuccess(callback))
        return this
    }
}
