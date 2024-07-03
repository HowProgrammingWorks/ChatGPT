'use strict';

// Prompt:
// Please describe control flow and async behavior in following code:

let i = 0;

const f1 = async () => {
  console.log(i++);
  await f1();
};

f1();

// After running last one we get output:

/*
```
1
2
3
...
8876
8877
8878
Exception in PromiseRejectCallback:
/Testing/JavaScript/test.js:7
}
^

RangeError: Maximum call stack size exceeded

Exception in PromiseRejectCallback:
/Testing/JavaScript/test.js:6
  await f1();
        ^

RangeError: Maximum call stack size exceeded

node:internal/util/inspect:1585
    if (ObjectIs(number, -0)) {
        ^

RangeError: Maximum call stack size exceeded
    at is (<anonymous>)
    at formatNumber (node:internal/util/inspect:1585:9)
    at formatPrimitive (node:internal/util/inspect:1643:12)
    at formatValue (node:internal/util/inspect:770:12)
    at inspect (node:internal/util/inspect:364:10)
    at formatWithOptionsInternal (node:internal/util/inspect:2279:40)
    at formatWithOptions (node:internal/util/inspect:2141:10)
    at console.value (node:internal/console/constructor:343:14)
    at console.log (node:internal/console/constructor:380:61)
    at f1 (/Testing/JavaScript/test.js:4:11)

Node.js v18.20.0
```
*/

// Please propose solution how can we avoid stack overflow in this code.
