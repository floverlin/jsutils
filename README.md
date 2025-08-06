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
