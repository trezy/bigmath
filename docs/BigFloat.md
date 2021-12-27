## `BigFloat`

`BigFloat` is the main class used under the hood for storing numbers in this library. It converts inputs to a `BigInt` with arbitrary precision, allowing you to maintain a consistent data layer even if your input types are not consistent.

An important note about `BigFloat`s is that they are immutable and all of their methods are atomic. Using any method on a `BigFloat` **will not** mutate the value of the `BigFloat`.





### `new BigFloat(input)`

`input` can be any of the following types:

| Type              | Example               |
| ----------------- | --------------------- |
| Integer           | `100`                 |
| Float             | `100.1`               |
| Number–as–string  | `'100.1'`             |
| BigInt            | `BigInt('100')`       |
| BigFloat          | `new BigFloat('100')` |





### `BigFloat.DECIMALS`

This value represents the precision of all `BigFloat`s. If you decide to change this value, you should only do it once, and it should be done before using either `BigFloat` or `BigMath`. The default value is `18`. For more information, check out the [Configuration](./configuration.md) page.





### `BigFloat.SHIFT`

This is a `BigInt` used to convert numbers for internal storage. The default value is `10 ** BigFloat.DECIMALS`.





### `bigFloat.toBigInt()`

Returns the current value of the `BigFloat` as a `BigInt`. Note that this does truncate the decimal value.

```javascript
const foo = new BigFloat(100.1)

console.log(foo.toBigInt()) // Outputs `BigInt(100)`
```





### `bigFloat.toString()`

Returns the accurate string value of the `BigFloat`.

```javascript
const foo = new BigFloat(100.01)

console.log(foo.toString()) // Outputs `'100.010000000000000000'`
```





### `bigFloat.valueOf()`

Returns the shifted internal `BigInt` value of the `BigFloat`.

```javascript
const foo = new BigFloat(100.01)

console.log(foo.valueOf()) // Outputs `BigInt('100010000000000000000')`
```





### `bigFloat.add(input[, input])`

This is the same as using `BigMath.add` with this `BigFloat` as the first parameter.

```javascript
const foo = new BigFloat(100)

foo.add(100) == BigMath.add(foo, 100)
```

See [`BigMath.add()`](./BigMath.md#add) for more details.





### `bigFloat.subtract(input[, input])`

This is the same as using `BigMath.subtract` with this `BigFloat` as the first parameter.

```javascript
const foo = new BigFloat(100)

foo.subtract(100) == BigMath.subtract(foo, 100)
```

See [`BigMath.subtract()`](./BigMath.md#subtract) for more details.





### `bigFloat.multiply(input[, input])`

This is the same as using `BigMath.multiply` with this `BigFloat` as the first parameter.

```javascript
const foo = new BigFloat(100)

foo.multiply(100) == BigMath.multiply(foo, 100)
```

See [`BigMath.multiply()`](./BigMath.md#multiply) for more details.





### `bigFloat.divide(input[, input])`

This is the same as using `BigMath.divide` with this `BigFloat` as the first parameter.

```javascript
const foo = new BigFloat(100)

foo.divide(100) == BigMath.divide(foo, 100)
```

See [`BigMath.divide()`](./BigMath.md#divide) for more details.





### `bigFloat.round()`

Returns a new `BigFloat` with the current value rounded to the nearest integer.

```javascript
const foo = new BigFloat(100.5)
const roundedFoo = foo.round()

foo.toString()        // 100.500000000000000000
roundedFoo.toString() // 101.000000000000000000
```





### `bigFloat.ceiling()`

Returns a new `BigFloat` with the current value rounded up to the next integer.

```javascript
const foo = new BigFloat(100.4)
const roundedFoo = foo.ceiling()

foo.toString()        // 100.400000000000000000
roundedFoo.toString() // 101.000000000000000000
```





### `bigFloat.floor()`

Returns a new `BigFloat` with the current value rounded down to its integer.

```javascript
const foo = new BigFloat(100.5)
const roundedFoo = foo.floor()

foo.toString()        // 100.500000000000000000
roundedFoo.toString() // 101.000000000000000000
```





### Usage with unary operators

While we recommend using the `BigFloat`/`BigMath` arithmetic methods for performing calculations, `BigFloat` is _technically_ compatible with unary and binary operators like `+`, `-`, `*`, `/`, etc. There are some caveats, though. First, both sides of the operation must be either a `BigFloat` or a `BigInt`, but operations that use number literals will throw an error.

The second caveat — and the reason that both sides must be either a `BigFloat` or a `BigInt` — is that `BigFloat` stores the initial input as a `BigInt` shifted left by the amount of `BigFloat.DECIMALS`. That is, if your input value is `100.01`, `BigFloat` will store that value as `BigInt('100010000000000000000')`. The precision of this value is determined by `BigFloat.DECIMALS`.

When using a `BigFloat` in unary operations, you should be sure to shift your other values, as well. To do this, you can multiply the value by `BigFloat.SHIFT`, then to get back to the result you can divide by the same value.

```javascript
const foo = BigInt(100)
const bar = new BigFloat(100)
let result = null

result = foo + bar
// `result` is `BigInt('100000000000000000100')`, which probably isn't what you want.

const shiftedFoo = BigInt(100) * BigFloat.SHIFT
result = shiftedFoo + bar
// `result` is `BigInt('200000000000000000000')`, which is *closer* to what you want.

result = (shiftedFoo + bar) / BigFloat.SHIFT
// `result` is `BigInt('200')`, which is *exactly* what you want!
```
