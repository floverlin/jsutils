import { assertEquals } from "@std/assert"
import time from "./time.ts"

Deno.test("time in seconds: returns number of seconds", () => {
    const result = time(4, "hours").in("seconds")
    assertEquals(result, 60 * 60 * 4, "Result should be 60 * 60 * 4")
})
