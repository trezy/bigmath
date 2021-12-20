// Local imports
import { BigFloat } from './BigFloat.js'
import { divideRound } from './BigMath.js'





/**
 * Creates a reducer to be used by `BigMath` to apply arithmetic operations.
 * @param {'add' | 'divide' | 'minimum' | 'multiply' | 'subtract'} operation Type of operation to execute on the inputs.
 *
 * @returns {function}
 */
export function createReducer(operation) {
	/**
	 * @param {BigFloat} accumulator
	 * @param {string | number | bigint | BigFloat} value
	 * @param {number} _index
	 * @param {(string | number | bigint | BigFloat)[]} _originalArray
	 *
	 * @returns {BigFloat}
	 */
	return function reducer(accumulator, value, _index, _originalArray) {
		let accumulatorValue = accumulator.valueOf()
		let valueAsBigFloat = new BigFloat(value)
		let valueAsBigFloatValue = (valueAsBigFloat).valueOf()

		switch (operation) {
			case 'add':
				return new BigFloat(accumulatorValue + valueAsBigFloatValue, true)

			case 'divide': {
				const dividend = accumulatorValue * BigFloat.SHIFT
				const divisor = valueAsBigFloatValue

				return divideRound(dividend, divisor)
			}

			case 'minimum': {
				if (accumulatorValue < valueAsBigFloatValue) {
					return accumulator
				}

				return valueAsBigFloat
			}

			case 'multiply': {
				const dividend = accumulatorValue * valueAsBigFloatValue
				const divisor = BigFloat.SHIFT

				return divideRound(dividend, divisor)
			}

			case 'subtract':
				return new BigFloat(accumulatorValue - valueAsBigFloatValue, true)

			default:
				throw new TypeError(`Unrecognized operation type \`${operation}\` provided to reducer.`)
		}
	}
}
