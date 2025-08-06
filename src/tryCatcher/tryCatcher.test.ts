import { assertEquals, assertInstanceOf } from "@std/assert"
import tryCatcher from "./tryCatcher.ts"
import Result from "./Result.ts"

function syncFn(a: number, b: string): number {
    const bn = Number(b)
    if (isNaN(bn)) throw new Error("bn is NaN")
    return a + bn
}

async function asyncFn(a: number, b: string): Promise<number> {
    return await Promise.resolve(syncFn(a, b))
}

Deno.test("tryCatcher sync success: returns Result with value", () => {
    const result = tryCatcher(syncFn, 10, "5")
    assertInstanceOf(result, Result, "Result should be instance of Result")
    assertEquals(result[0], 15, "Result[0] should be 15")
    assertEquals(result[1], null, "Result[1] should be null")
})

Deno.test("tryCatcher sync success: calls onSuccess", () => {
    let calledValue: number | undefined
    tryCatcher(syncFn, 10, "5").onSuccess((value) => {
        calledValue = value
    })
    assertEquals(calledValue, 15, "onSuccess should receive 15")
})

Deno.test("tryCatcher sync success await: calls onSuccessAwait", async () => {
    let calledValue: number | undefined
    await tryCatcher(syncFn, 10, "5").onSuccessAwait(async (value) => {
        calledValue = await asyncFn(value, "5")
    })
    assertEquals(calledValue, 20, "onSuccess should receive 20")
})

Deno.test("tryCatcher sync error: returns Result with error", () => {
    const result = tryCatcher(syncFn, 5, "a")
    assertInstanceOf(result, Result, "Result should be instance of Result")
    assertEquals(result[0], null, "Result[0] should be null")
    assertInstanceOf(result[1], Error, "Result[1] should be an Error")
    assertEquals(
        result[1]?.message,
        "bn is NaN",
        "Error message should be 'bn is NaN'"
    )
})

Deno.test("tryCatcher sync error: calls onError", () => {
    let calledError: Error | undefined
    tryCatcher(syncFn, 5, "a").onError((error) => {
        calledError = error
    })
    assertInstanceOf(calledError, Error, "onError should receive an Error")
    assertEquals(
        calledError?.message,
        "bn is NaN",
        "Error message should be 'bn is NaN'"
    )
})

Deno.test(
    "tryCatcher async success: returns PromiseResult with value",
    async () => {
        const result = await tryCatcher(asyncFn, 10, "5")
        assertInstanceOf(result, Result, "Result should be instance of Result")
        assertEquals(result[0], 15, "Result[0] should be 15")
        assertEquals(result[1], null, "Result[1] should be null")
    }
)

Deno.test("tryCatcher async success: calls onSuccess", async () => {
    let calledValue: number | undefined
    await tryCatcher(asyncFn, 10, "5").onSuccess((value) => {
        calledValue = value
    })
    assertEquals(calledValue, 15, "onSuccess should receive 15")
})

Deno.test("tryCatcher async success await: calls onSuccessAwait", async () => {
    let calledValue: number | undefined
    await tryCatcher(asyncFn, 10, "5").onSuccessAwait(async (value) => {
        calledValue = await asyncFn(value, "5")
    })
    assertEquals(calledValue, 20, "onSuccess should receive 20")
})

Deno.test(
    "tryCatcher async error: returns PromiseResult with error",
    async () => {
        const result = await tryCatcher(asyncFn, 5, "a")
        assertInstanceOf(result, Result, "Result should be instance of Result")
        assertEquals(result[0], null, "Result[0] should be null")
        assertInstanceOf(result[1], Error, "Result[1] should be an Error")
        assertEquals(
            result[1]?.message,
            "bn is NaN",
            "Error message should be 'bn is NaN'"
        )
    }
)

Deno.test("tryCatcher async error: calls onError", async () => {
    let calledError: Error | undefined
    await tryCatcher(asyncFn, 5, "a").onError((error) => {
        calledError = error
    })
    assertInstanceOf(calledError, Error, "onError should receive an Error")
    assertEquals(
        calledError?.message,
        "bn is NaN",
        "Error message should be 'bn is NaN'"
    )
})

Deno.test("tryCatcher async: method chaining", async () => {
    let successCalled = false
    let errorCalled = false
    await tryCatcher(asyncFn, 10, "5")
        .onSuccess((value) => {
            successCalled = true
            assertEquals(value, 15, "onSuccess should receive 15")
        })
        .onError(() => {
            errorCalled = true
        })
    assertEquals(successCalled, true, "onSuccess should be called")
    assertEquals(errorCalled, false, "onError should not be called")
})
