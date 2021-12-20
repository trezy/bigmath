// Local imports
import { BigFloat } from './BigFloat.js'
import { createReducer } from './reducer.js'
import { ERRORS } from './errors.js'






/**
 * @memberof module:@trezy/bigmath
 * @param {bigint | BigFloat} divisor
 * @param {bigint | BigFloat} dividend
 *
 * @returns {BigFloat} Result of addition operations.
 */
export function divideRound(dividend, divisor) {
	const integer = dividend.valueOf() / divisor.valueOf()
	let remainder = 0n

	if (BigFloat.ROUNDED) {
		remainder = ((dividend.valueOf() * 2n) / divisor.valueOf()) % 2n
	}

	return new BigFloat(integer + remainder, true)
}





/**
 * Add all inputs sequentially.
 *
 * @memberof module:@trezy/bigmath
 * @param {...(string | number | bigint | BigFloat)} values Any number and combination of `Number`-like input values.
 *
 * @returns {BigFloat} Result of addition operations.
 */
export function add(...values) {
	return values.reduce(createReducer('add'), new BigFloat(0))
}





/**
 * Rounds input up to the next integer.
 *
 * @memberof module:@trezy/bigmath
 * @param {string | number | bigint | BigFloat} value The `NumberLike` value to be rounded.
 *
 * @returns {BigFloat} Result of rounding operation.
 */
export function ceiling(value) {
	if (arguments.length > 1) {
		throw ERRORS.TooManyArguments('`BigMath.ceiling`', 1, arguments.length)
	}

	return (new BigFloat(value)).ceiling()
}

/**
 * @memberof module:@trezy/bigmath
 * @borrows ceiling as ceil
 */
export function ceil(...args) {
	return ceiling(...args)
}





/**
 * Divides all inputs sequentially.
 *
 * @memberof module:@trezy/bigmath
 * @param {...(string | number | bigint | BigFloat)} values Any number and combination of `Number`-like input values.
 *
 * @returns {BigFloat} Result of division operations.
 */
export function divide(...values) {
	const [firstValue, ...rest] = values
	return rest.reduce(createReducer('divide'), new BigFloat(firstValue))
}





/**
 * Rounds input down to the its integer.
 *
 * @memberof module:@trezy/bigmath
 * @param {string | number | bigint | BigFloat} value The `NumberLike` value to be rounded.
 *
 * @returns {BigFloat} Result of rounding operation.
 */
export function floor(value) {
	if (arguments.length > 1) {
		throw ERRORS.TooManyArguments('`BigMath.floor`', 1, arguments.length)
	}

	return (new BigFloat(value)).floor()
}





/**
 * Multiplies all inputs sequentially.
 *
 * @memberof module:@trezy/bigmath
 * @param {...(string | number | bigint | BigFloat)} values Any number and combination of `Number`-like input values.
 *
 * @returns {BigFloat} Result of multiplication operations.
 */
export function multiply(...values) {
	const [firstValue, ...rest] = values
	return rest.reduce(createReducer('multiply'), new BigFloat(firstValue))
}





/**
 * Round input to the nearest integer.
 *
 * @memberof module:@trezy/bigmath
 * @param {string | number | bigint | BigFloat} value The `NumberLike` value to be rounded.
 *
 * @returns {BigFloat} Result of rounding operation.
 */
export function round(value) {
	if (arguments.length > 1) {
		throw ERRORS.TooManyArguments('`BigMath.round`', 1, arguments.length)
	}

	return (new BigFloat(value)).round()
}





/**
 * Subtracts all inputs sequentially.
 *
 * @memberof module:@trezy/bigmath
 * @param {...(string | number | bigint | BigFloat)} values Any number and combination of `NumberLike` input values.
 *
 * @returns {BigFloat} Result of subtraction operations.
 */
export function subtract(...values) {
	const [firstValue, ...rest] = values
	return rest.reduce(createReducer('subtract'), new BigFloat(firstValue))
}





/**
 * `BigMath` provides methods for manipulating arbitrary precision floating point values.
 *
 * @memberof module:@trezy/bigmath
 * @type {object}
 */
export const BigMath = {
	add,
	ceil,
	ceiling,
	divide,
	floor,
	multiply,
	round,
	subtract,
}
