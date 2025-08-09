const Millisecond = 1
const Second = 1000 * Millisecond
const Minute = 60 * Second
const Hour = 60 * Minute
const Day = 24 * Hour

type TimeDefMany = keyof typeof timeDefMany
const timeDefMany = {
    milliseconds: Millisecond,
    seconds: Second,
    minutes: Minute,
    hours: Hour,
    days: Day,
}

type TimeDefSingle = keyof typeof timeDefSingle
const timeDefSingle = {
    millisecond: Millisecond,
    second: Second,
    minute: Minute,
    hour: Hour,
    day: Day,
}

type TimeDefSingleMany = TimeDefSingle | TimeDefMany
const timeDefSingleMany = { ...timeDefMany, ...timeDefSingle }

export default function time(n: number, def: TimeDefSingleMany): Time {
    return new Time(n * timeDefSingleMany[def])
}

class Time {
    #n: number
    constructor(n: number) {
        this.#n = Math.floor(n)
    }

    in(def: TimeDefMany): number {
        return Math.floor(this.#n / timeDefMany[def])
    }

    toString(): string {
        return `class 'Time' {n: ${this.#n}}`
    }
}
