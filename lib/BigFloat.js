// Local imports
import { BigMath } from './BigMath.js'
import { ERRORS } from './errors.js'
import { isNumberLike } from './isNumberLike.js'





/**
 * BigFloat can be used to store arbitrary precision floating point values.
 */
export class BigFloat {
	// number of decimal places
	static DECIMALS = 18

	// numbers are either truncated (false) or rounded (true)
	static ROUNDED = true

	// derived constant
	static SHIFT = BigInt(`1${'0'.repeat(BigFloat.DECIMALS)}`)

	#n = 0n

	/**
	 * Create a new `BigFloat`.
	 * @param {string | number | bigint | BigFloat} value Input value to be converted to a `BigFloat`
	 * @param {boolean} [isShifted=false] Indicates that the input value has already been shifted by `BigFloat.SHIFT`.
	 */
	constructor(value, isShifted = false) {
		if (!isNumberLike(value)) {
			throw ERRORS.InputNotNumberLike(value)
		}

		if (value instanceof BigFloat) {
			return value
		}

		if ((typeof value === 'bigint') && isShifted) {
			this.#n = value
			return this
		}

		const [integer, fraction] = String(value)
			.replace(/_/g, '')
			.split('.')
			.concat('')

		const paddedFraction = fraction
			.padEnd(BigFloat.DECIMALS, '0')
			.slice(0, BigFloat.DECIMALS)

		const shouldRound = BigFloat.ROUNDED && (fraction[BigFloat.DECIMALS] >= '5')

		this.#n = BigInt(integer + paddedFraction) + BigInt(shouldRound)

		return this
	}

	/**
	 * @returns {string} The value of this `BigFloat` represented as a string.
	 */
	toString() {
		const string = this.#n
			.toString()
			.padStart(BigFloat.DECIMALS + 1, '0')

		const integer = string
			.slice(0, (BigFloat.DECIMALS * -1))

		const fraction = string
			.slice(BigFloat.DECIMALS * -1)
			.replace(/\.?0+$/, '')
			.padEnd(BigFloat.DECIMALS, '0')

		return `${integer}.${fraction}`
	}

	/**
	 * @returns {bigint} The value of this `BigFloat` represented as a `BigInt` and shifted by the value of `BigFloat.DECIMALS`.
	 */
	valueOf() {
		return this.#n
	}

	/**
	 * Add all inputs sequentially, starting with the value of this `BigFloat`.
	 *
	 * @param {...(string | number | bigint | BigFloat)} values
	 *
	 * @returns {BigFloat} Result of addition operations.
	 */
	add(...values) {
		return BigMath.add(this, ...values)
	}

	/**
	 * Divide all inputs sequentially, starting with the value of this `BigFloat`.
	 *
	 * @param {...(string | number | bigint | BigFloat)} values
	 *
	 * @returns {BigFloat} Result of division operations.
	 */
	divide(...values) {
		return BigMath.divide(this, ...values)
	}

	/**
	 * Multiply all inputs sequentially, starting with the value of this `BigFloat`.
	 *
	 * @param {...(string | number | bigint | BigFloat)} values
	 *
	 * @returns {BigFloat} Result of multiplication operations.
	 */
	multiply(...values) {
		return BigMath.multiply(this, ...values)
	}

	/**
	 * Subtract all inputs sequentially, starting with the value of this `BigFloat`.
	 *
	 * @param {...(string | number | bigint | BigFloat)} values
	 *
	 * @returns {BigFloat} Result of subtraction operations.
	 */
	subtract(...values) {
		return BigMath.subtract(this, ...values)
	}

	get [Symbol.toStringTag]() {
    return 'BigFloat';
  }
}
