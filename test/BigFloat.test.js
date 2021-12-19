// Module imports
import { expect } from 'chai'





// Local imports
import { BigFloat } from '../lib/BigFloat.js'
import { getString } from './test-helpers/getString.js'
import { getValueOf } from './test-helpers/getValueOf.js'
import { InputNotNumberLike } from '../lib/errors.js'





function testAlgebraicOperation(options) {
	const {
		baseValue,
		operationInputValues,
		operationOutputValues,
		operationName,
	} = options

	describe(`${operationName}()`, function () {
		it('is idempotent', function () {
			const instance = new BigFloat(baseValue)
			instance[operationName](100)

			expect(instance.toString()).to.equal(getString(baseValue))
			expect(instance.valueOf()).to.equal(getValueOf(baseValue))
		})

		it('returns the correct result for a single input', function () {
			const instance = new BigFloat(baseValue)
			const operationResult = instance[operationName](operationInputValues.single)

			expect(operationResult.toString()).to.equal(getString(operationOutputValues.single))
			expect(operationResult.valueOf()).to.equal(getValueOf(operationOutputValues.single))
		})

		it('returns the correct result for an arbitrary number of inputs', function () {
			const instance = new BigFloat(baseValue)
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
				const baseValue = inputValue
				const instance = new BigFloat(baseValue)
				const stringValue = getString(baseValue)

				expect(instance.toString()).to.equal(stringValue)
			})
		})

		describe('valueOf()', function () {
			it('outputs to BigInt with the correct value', function () {
				const baseValue = inputValue
				const instance = new BigFloat(baseValue)
				const calculableValue = getValueOf(baseValue)

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
				const expectedError = InputNotNumberLike(inputValue)
				expect(() => new BigFloat(inputValue)).to.throw(TypeError, expectedError.message)
			})
		})
	})

	testAlgebraicOperation({
		baseValue: 100,
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
		baseValue: 100,
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
		baseValue: 100,
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
		baseValue: 100,
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
})
