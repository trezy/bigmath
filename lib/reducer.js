// Local imports
import { BigFloat } from './BigFloat.js'
import { divideRound } from './BigMath.js'
import { InputNotNumberLike } from './errors.js'
import { isNumberLike } from './isNumberLike.js'





/**
 * Creates a reducer to be used by `BigMath` to apply arithmetic operations.
 * @param {'add' | 'divide' | 'multiply' | 'subtract'} operation Type of operation to execute on the inputs.
 *
 * @returns {function}
 */
export function createReducer(operation) {
	/**
	 * @param {BigFloat} accumulator
	 * @param {string | number | bigint | BigFloat} value
	 * @param {number} _index
	 * @param {string | number | bigint | BigFloat[]} _originalArray
	 *
	 * @returns {BigFloat}
	 */
	return function reducer(accumulator, value, _index, _originalArray) {
		let accumulatorAsBigInt = accumulator.valueOf()
		let parsedValue = (new BigFloat(value)).valueOf()

		switch (operation) {
			case 'add':
				return new BigFloat(accumulatorAsBigInt + parsedValue, true)

			case 'divide': {
				const dividend = accumulatorAsBigInt * BigFloat.SHIFT
				const divisor = parsedValue

				return divideRound(dividend, divisor)
			}

			case 'multiply': {
				const dividend = accumulatorAsBigInt * parsedValue
				const divisor = BigFloat.SHIFT

				return divideRound(dividend, divisor)
			}

			case 'subtract':
				return new BigFloat(accumulatorAsBigInt - parsedValue, true)
		}
	}
}
