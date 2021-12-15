// Local imports
import { BigFloat } from './BigFloat.js'
import { createReducer } from './reducer.js'






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
	divide,
	multiply,
	subtract,
}
