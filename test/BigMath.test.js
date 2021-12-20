// Module imports
import { expect } from 'chai'





// Local imports
import { BigFloat } from '../lib/BigFloat.js'
import { BigMath } from '../lib/BigMath.js'
import { ERROR_CONFIGS } from '../lib/errors.js'
import { getString } from './test-helpers/getString.js'
import { getValueOf } from './test-helpers/getValueOf.js'





function generateFraction(fractionPrefix = '', fractionSuffix = '') {
	if (fractionSuffix.length > BigFloat.DECIMALS) {
		throw new RangeError(`fraction suffix must be shorter than BigFloat.DECIMALS (${BigFloat.DECIMALS})`)
	}

	let fullPrefixValue = fractionPrefix
		.slice(0, BigFloat.DECIMALS)
		.padEnd(BigFloat.DECIMALS, '0')

	if ((fractionPrefix.length + fractionSuffix.length) > BigFloat.DECIMALS) {
		return (BigInt(fullPrefixValue) + BigInt(fractionSuffix)).toString()
	} else {
		fullPrefixValue = fullPrefixValue.slice(0, BigFloat.DECIMALS - fractionSuffix.length)
		return `${fullPrefixValue}${fractionSuffix}`
	}
}

function testAlgebraicOperation(options) {
	const {
		operationInputValues,
		operationName,
		operationOutputValue,
	} = options

	describe(`${operationName}()`, function () {
		it('returns a BigFloat', function () {
			const operationResult = BigMath[operationName](...operationInputValues)

			expect(operationResult).to.be.instanceOf(BigFloat)
		})

		it('is chainable', function () {
			const operationResult = operationInputValues.reduce((accumulator, value) => {
				return accumulator[operationName](value)
			}, BigMath)

			expect(operationResult.toString()).to.equal(getString(operationOutputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(operationOutputValue))
		})

		it('returns the correct result for an arbitrary number of inputs', function () {
			const operationResult = BigMath[operationName](...operationInputValues)

			expect(operationResult.toString()).to.equal(getString(operationOutputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(operationOutputValue))
		})
	})
}

describe('BigMath', function () {
	this.beforeEach(function () {
		BigFloat.ROUNDED = true
	})

	describe('extraprecision rounding', function () {
		it('is enabled', function () {
			const divisor = `0.${generateFraction('', '1')}`
			const dividend = 2
			const operationResultString = BigMath.divide(divisor, dividend).toString()
			const expectedString = `0.${generateFraction('', '1')}`

			expect(operationResultString).to.equal(expectedString)
		})

		it('is disabled', function () {
			BigFloat.ROUNDED = false

			const divisor = `0.${generateFraction('', '1')}`
			const dividend = 2
			const operationResultString = BigMath.divide(divisor, dividend).toString()
			const expectedString = `0.${generateFraction()}`

			expect(operationResultString).to.equal(expectedString)
		})
	})

	testAlgebraicOperation({
		operationInputValues: Array(20).fill(100),
		operationName: 'add',
		operationOutputValue: 2000,
	})

	testAlgebraicOperation({
		operationInputValues: [100, 2, 5, 2],
		operationName: 'divide',
		operationOutputValue: 5,
	})

	testAlgebraicOperation({
		operationInputValues: [100, 2, 5, 2],
		operationName: 'multiply',
		operationOutputValue: 2000,
	})

	testAlgebraicOperation({
		operationInputValues: Array(20).fill(100),
		operationName: 'subtract',
		operationOutputValue: -1800,
	})

	describe('round()', function () {
		it('rounds up', function () {
			const inputValue = 100.5
			const outputValue = 101
			const operationResult = BigMath.round(inputValue)

			expect(operationResult.toString()).to.equal(getString(outputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(outputValue))
		})

		it('rounds down', function () {
			const inputValue = 100.4
			const outputValue = 100
			const operationResult = BigMath.round(inputValue)

			expect(operationResult.toString()).to.equal(getString(outputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(outputValue))
		})

		it('throws an error when receiving more than one input', function () {
			expect(() => BigMath.round(1, 1))
				.to.throw(ERROR_CONFIGS.TooManyArguments.errorType, ERROR_CONFIGS.TooManyArguments.messageGenerator('`BigMath.round`', 1, 2))
		})
	})

	describe('ceiling()', function () {
		it('rounds up', function () {
			const inputValue = 100.4
			const outputValue = 101
			const operationResult = BigMath.ceiling(inputValue)

			expect(operationResult.toString()).to.equal(getString(outputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(outputValue))
		})

		it('throws an error when receiving more than one input', function () {
			expect(() => BigMath.ceiling(1, 1))
				.to.throw(ERROR_CONFIGS.TooManyArguments.errorType, ERROR_CONFIGS.TooManyArguments.messageGenerator('`BigMath.ceiling`', 1, 2))
		})
	})

	describe('floor()', function () {
		it('rounds down', function () {
			const inputValue = 100.5
			const outputValue = 100
			const operationResult = BigMath.floor(inputValue)

			expect(operationResult.toString()).to.equal(getString(outputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(outputValue))
		})

		it('throws an error when receiving more than one input', function () {
			expect(() => BigMath.floor(1, 1))
				.to.throw(ERROR_CONFIGS.TooManyArguments.errorType, ERROR_CONFIGS.TooManyArguments.messageGenerator('`BigMath.floor`', 1, 2))
		})
	})

	describe('min()', function() {
		it('returns the smallest number from its inputs', function () {
			const operationResult = BigMath.min(9, 8, 7, 6, 5, 4, 3, 2, 1, 0)
			const outputValue = 0

			expect(operationResult.toString()).to.equal(getString(outputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(outputValue))
		})
	})
})
