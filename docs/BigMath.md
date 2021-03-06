## `BigMath`

The `BigMath` export contains a suite of functions for performing arithmetic operations with mixed input types.





### A note on arithmetic operations

All of the arithmetic functions described below follow these three principles unless otherwise noted:

* **They are variadic**
    Each operation can receive any number of inputs (requiring at least one). Additionally, operations will be performed on each input sequentially.

* **They are chainable**
    Chaining operations will cause the chained operation to be executed starting with its parent in the chain.

    ```javascript
    const result = BigMath
      .add(1, 1)    //  2
      .multiply(10) // 20
      .divide(5)    //  4
    // result === 4
    ```

* **They are polymorphic**
    `input` can be any of the following types:

    | Type              | Example               |
    | ----------------- | --------------------- |
    | Integer           | `100`                 |
    | Float             | `100.1`               |
    | Number–as–string  | `'100.1'`             |
    | BigInt            | `BigInt('100')`       |
    | BigFloat          | `new BigFloat('100')` |





### `BigMath.add(input[, input])`

Add any number of number-like inputs.

```javascript
const result = BigMath.add(10, 5, 2)
// 10 + 5 + 2 === 17
```





### `BigMath.subtract(input[, input])`

Subtract any number of number-like inputs.

```javascript
const result = BigMath.subtract(10, 5, 2)
// (10 - 5) - 2 === 3
```





### `BigMath.multiply(input[, input])`

Multiply any number of number-like inputs.

```javascript
const result = BigMath.multiply(10, 5, 2)
// 10 * 5 * 2 === 100
```





### `BigMath.divide(input[, input])`

Divide any number of number-like inputs.

```javascript
const result = BigMath.divide(10, 5, 2)
// (10 / 5) / 2 === 1
```





### `BigMath.round(input)`

Returns a new `BigFloat` with the input value rounded to the nearest integer. _Not variadic._

```javascript
BigMath.round(100.5) // 101.000000000000000000
BigMath.round(100.4) // 100.000000000000000000
```





### `BigMath.ceiling(input)`
_Alias: `BigMath.ceil()`_

Returns a new `BigFloat` with the input value rounded up to the next integer. _Not variadic._

```javascript
BigMath.ceiling(100.4) // 101.000000000000000000
```





### `BigMath.exponentiate(base, exponent)`
_Alias: `BigMath.pow()`, `BigMath.power()`_

Returns a new `BigFloat` with the result of raising the `base` to the power of `exponent`. _Not variadic._

```javascript
BigMath.exponentiate(2, 5) // 32.000000000000000000
```





### `BigMath.floor(input)`

Returns a new `BigFloat` with the input value rounded down to its integer. _Not variadic._

```javascript
BigMath.floor(100.5) // 100.000000000000000000
```





### `BigMath.maximum(input, input[, input])`
_Alias: `BigMath.max()`_

Returns the largest input as a `BigFloat`.

```javascript
BigMath.maximum(2, 1, 3) // 1
```





### `BigMath.minimum(input, input[, input])`
_Alias: `BigMath.min()`_

Returns the smallest input as a `BigFloat`.

```javascript
BigMath.minimum(2, 1, 3) // 1
```
