export type ResultTuple<T> = ResultOK<T> | ResultErr
export type ResultOK<T> = [T, null]
export type ResultErr = [null, Error]
