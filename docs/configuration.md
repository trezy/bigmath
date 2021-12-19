## Configuration

There are only two options that can be configured in this library: `BigFloat.DECIMALS` and `BigFloat.ROUNDED`. should you decide to alter either of these options, you should do so _before creating any `BigFloat`s or performing any calculations with `BigMath`.

### `BigFloat.DECIMALS`

`BigFloat.DECIMALS` defaults to `18`. This `Number` represents the decimal precision (number of `0`s after the decimal point) of all `BigFloat`s.

### `BigFloat.ROUNDED`

`BigFloat.ROUNDED` defaults to `true`. This `Boolean` determines whether multiplication and division operations will be rounded or truncated.

If extraprecision rounding is **enabled**, it is performed based on the first digit past the precision specified by `BigFloat.DECIMALS`. For example:

```javascript
Math.divide('2.000000000000000001', 2)
```

The result of this operation would be `1.0000000000000000005`, which requires 19 points of precision. Since we're using the default precision (`18`), the result is rounded to `1.000000000000000001`.

If extraprecision rounding is **disabled**, then all operation results that require more points of precision than `BigFloat.Decimal` will be truncated. The result of the operation above would be `1.000000000000000000`, since we essentially cut off everything past the current maximum precision.
