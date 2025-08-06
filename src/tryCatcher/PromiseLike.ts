export default class PromiseLike<T> {
    constructor(private promise: Promise<T>) {}

    then(
        onfulfilled?: (value: T) => void,
        onrejected?: (reason: unknown) => void
    ): PromiseLike<T> {
        this.promise.then(onfulfilled, onrejected)
        return this
    }

    catch(onrejected?: (reason: unknown) => void): PromiseLike<T> {
        this.promise.catch(onrejected)
        return this
    }

    finally(onfinally?: () => void): PromiseLike<T> {
        this.promise.finally(onfinally)
        return this
    }
}
