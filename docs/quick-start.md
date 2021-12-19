## Quick Start

### Requirements

* `npm` or Yarn
* Node.js 12+

### Installation

```sh
npm install @trezy/bigmath

# OR

yarn add @trezy/bigmath
```

### Usage

`@trezy/bigmath` has two main exports: `BigFloat` and `BigMath`. `BigFloat` is useful for storing arbitrary precision values that you'll need to use later:

```javascript
import { BigFloat } from '@trezy/bigmath'

const foo = new BigFloat('9007199254740991.1')

// Do some other stuff.

const newValue = foo.add('100.000000000000000001')
```

For more details about using `BigMath`, checkout the [`BigMath` documentation](./BigMath.md).

`BigMath`, on the other hand, is useful for performing complex calculations against a number of arbitrary input types, including `BigInt`s, numbers, floats, numbers–as–strings, and even other `BigFloat`s. The output of `BigMath` operations will always be a `BigFloat`.

```javascript
import {
  BigFloat,
  BigMath,
} from '@trezy/bigmath'

const foo = BigMath.add(2, 2)

foo.toString() // Outputs '4.000000000000000000'
typeof foo === BigFloat // true
```

For more details about using `BigFloat`, checkout the [`BigFloat` documentation](./BigFloat.md).
