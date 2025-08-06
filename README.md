# Установка

npm:

```sh
npx jsr add @flover/jsutils
```

deno:

```sh
deno add jsr:@flover/jsutils
```

# Использование

```javascript
import { tryCatcher } from "@flover/jsutils";

const [result, error] = tryCatcher(mySyncFunction, ...functionArgs);
if (error) console.log(error);

const [result, error] = await tryCatcher(myAsyncFunction, ...functionArgs);
if (error) console.log(error);
```

А так же можно:

```javascript
const [result, error] = tryCatcher(mySyncFunction, ...functionArgs)
  .onSuccess((val) => console.log("success: ", val)) // val === result
  .onError((err) => console.log("something went wrong: ", err)); // err === error

const [result, error] = await tryCatcher(myAsyncFunction, ...functionArgs)
  .onSuccess((val) => console.log("success: ", val)) // val === result
  .onError((err) => console.log("something went wrong: ", err)); // err === error
```

Методы `onSuccessAwait` и `onErrorAwait` позволяют дождаться выполнения переданной им асинхронной функции, но не могут быть применены в цепи:

```javascript
const result = tryCatcher(mySyncFunction, ...functionArgs)
await result.onSuccessAwait(async (val) => await anotherAsyncFunction(val))
await result.onErrorAwait(async (err) => await anotherAsyncFunction(err))

const result = tryCatcher(myAsyncFunction, ...functionArgs)  // применяем без await, если кортеж не нужен
await result.onSuccessAwait(async (val) => await anotherAsyncFunction(val))
await result.onErrorAwait(async (err) => await anotherAsyncFunction(err))
```