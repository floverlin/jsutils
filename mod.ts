function tryCatcher<T, I extends unknown[]>(
    func: (...args: I) => T,
    ...args: I
): [T, null] | [null, Error] {
    try {
        return [func(...args), null]
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error)
        return [null, new Error(message, { cause: error })]
    }
}

export { tryCatcher }
