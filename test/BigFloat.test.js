// Module imports
import { expect } from 'chai'





// Local imports
import { BigFloat } from '../lib/BigFloat.js'
import { getString } from './test-helpers/getString.js'
import { getValueOf } from './test-helpers/getValueOf.js'
import { ERROR_CONFIGS } from '../lib/errors.js'





function testAlgebraicOperation(options) {
	const {
		inputValue,
		operationInputValues,
		operationOutputValues,
		operationName,
	} = options

	describe(`${operationName}()`, function () {
		it('is idempotent', function () {
			const instance = new BigFloat(inputValue)
			instance[operationName](100)

			expect(instance.toString()).to.equal(getString(inputValue))
			expect(instance.valueOf()).to.equal(getValueOf(inputValue))
		})

		it('returns the correct result for a single input', function () {
			const instance = new BigFloat(inputValue)
			const operationResult = instance[operationName](operationInputValues.single)

			expect(operationResult.toString()).to.equal(getString(operationOutputValues.single))
			expect(operationResult.valueOf()).to.equal(getValueOf(operationOutputValues.single))
		})

		it('returns the correct result for an arbitrary number of inputs', function () {
			const instance = new BigFloat(inputValue)
			const operationResult = instance[operationName](...operationInputValues.arbitrary)

			expect(operationResult.toString()).to.equal(getString(operationOutputValues.arbitrary))
			expect(operationResult.valueOf()).to.equal(getValueOf(operationOutputValues.arbitrary))
		})
	})
}

function testConstructorInputType(options) {
	const {
		inputValue,
		typeName,
	} = options

	describe(`when given an ${typeName}`, function () {
		it('returns a BigFloat', function () {
			expect(new BigFloat(inputValue)).to.be.instanceOf(BigFloat)
		})

		describe('toString()', function () {
			it('outputs to string with the correct precision', function () {
				const instance = new BigFloat(inputValue)
				const stringValue = getString(inputValue)

				expect(instance.toString()).to.equal(stringValue)
			})
		})

		describe('valueOf()', function () {
			it('outputs to BigInt with the correct value', function () {
				const instance = new BigFloat(inputValue)
				const calculableValue = getValueOf(inputValue)

				expect(instance.valueOf()).to.equal(calculableValue)
			})
		})
	})
}

describe('BigFloat', function () {
	describe('new BigFloat()', function () {
		it('has the correct string tag', function () {
			const instance = new BigFloat(0)
			const stringTag = Object.prototype.toString.call(instance)

			expect(stringTag).to.equal('[object BigFloat]')
		})

		testConstructorInputType({
			inputValue: 100,
			typeName: 'integer',
		})

		testConstructorInputType({
			inputValue: '100',
			typeName: 'integer string',
		})

		testConstructorInputType({
			inputValue: 100.01,
			typeName: 'float',
		})

		testConstructorInputType({
			inputValue: '100.01',
			typeName: 'float string',
		})

		testConstructorInputType({
			inputValue: BigInt(100),
			typeName: 'BigInt',
		})

		testConstructorInputType({
			inputValue: new BigFloat(100),
			typeName: 'BigFloat',
		})

		describe('when given an invalid input', function () {
			it('throws an error', function () {
				const inputValue = 'foobar'
				expect(() => new BigFloat(inputValue))
					.to.throw(ERROR_CONFIGS.InputNotNumberLike.errorType, ERROR_CONFIGS.InputNotNumberLike.messageGenerator(inputValue))
			})
		})
	})

	testAlgebraicOperation({
		inputValue: 100,
		operationName: 'add',
		operationInputValues: {
			single: 100,
			arbitrary: Array(20).fill(100),
		},
		operationOutputValues: {
			single: 200,
			arbitrary: 2100,
		},
	})

	testAlgebraicOperation({
		inputValue: 100,
		operationName: 'divide',
		operationInputValues: {
			single: 2,
			arbitrary: [2, 5, 2],
		},
		operationOutputValues: {
			single: 50,
			arbitrary: 5,
		},
	})

	testAlgebraicOperation({
		inputValue: 100,
		operationName: 'multiply',
		operationInputValues: {
			single: 2,
			arbitrary: [2, 5, 2],
		},
		operationOutputValues: {
			single: 200,
			arbitrary: 2000,
		},
	})

	testAlgebraicOperation({
		inputValue: 100,
		operationName: 'subtract',
		operationInputValues: {
			single: 100,
			arbitrary: Array(20).fill(100),
		},
		operationOutputValues: {
			single: 0,
			arbitrary: -1900,
		},
	})

	describe('round()', function () {
		it('is idempotent', function () {
			const inputValue = 100.5
			const instance = new BigFloat(inputValue)
			instance.round()

			expect(instance.toString()).to.equal(getString(inputValue))
			expect(instance.valueOf()).to.equal(getValueOf(inputValue))
		})

		it('returns a BigFloat', function () {
			const inputValue = 100.5
			const instance = new BigFloat(inputValue)
			const operationResult = instance.round()

			expect(operationResult).to.be.instanceOf(BigFloat)
		})

		it('rounds up', function () {
			const inputValue = 100.5
			const outputValue = 101
			const instance = new BigFloat(inputValue)
			const operationResult = instance.round()

			expect(operationResult.toString()).to.equal(getString(outputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(outputValue))
		})

		it('rounds down', function () {
			const inputValue = 100.4
			const outputValue = 100
			const instance = new BigFloat(inputValue)
			const operationResult = instance.round()

			expect(operationResult.toString()).to.equal(getString(outputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(outputValue))
		})
	})

	describe('ceiling()', function () {
		it('is idempotent', function () {
			const inputValue = 100.4
			const instance = new BigFloat(inputValue)
			instance.ceiling()

			expect(instance.toString()).to.equal(getString(inputValue))
			expect(instance.valueOf()).to.equal(getValueOf(inputValue))
		})

		it('returns a BigFloat', function () {
			const inputValue = 100.4
			const instance = new BigFloat(inputValue)
			const operationResult = instance.ceiling()

			expect(operationResult).to.be.instanceOf(BigFloat)
		})

		it('rounds up', function () {
			const inputValue = 100.4
			const outputValue = 101
			const instance = new BigFloat(inputValue)
			const operationResult = instance.ceiling()

			expect(operationResult.toString()).to.equal(getString(outputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(outputValue))
		})
	})

	describe('floor()', function () {
		it('is idempotent', function () {
			const inputValue = 100.5
			const instance = new BigFloat(inputValue)
			instance.floor()

			expect(instance.toString()).to.equal(getString(inputValue))
			expect(instance.valueOf()).to.equal(getValueOf(inputValue))
		})

		it('returns a BigFloat', function () {
			const inputValue = 100.5
			const instance = new BigFloat(inputValue)
			const operationResult = instance.floor()

			expect(operationResult).to.be.instanceOf(BigFloat)
		})

		it('rounds down', function () {
			const inputValue = 100.5
			const outputValue = 100
			const instance = new BigFloat(inputValue)
			const operationResult = instance.floor()

			expect(operationResult.toString()).to.equal(getString(outputValue))
			expect(operationResult.valueOf()).to.equal(getValueOf(outputValue))
		})
	})
})
