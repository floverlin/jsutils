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
