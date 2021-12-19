export const ERROR_CONFIGS = {
	InputNotNumberLike: {
		errorType: TypeError,
		messageGenerator: function (inputValue) {
			return `${inputValue} is not a valid number-like input.`
		},
	},

	TooManyArguments: {
		errorType: TypeError,
		messageGenerator: function (methodName, maximumArgumentsCount, receivedInputsCount) {
			return `Too many arguments; ${methodName} only accepts ${maximumArgumentsCount} input but received ${receivedInputsCount}`
		},
	},
}

export const ERRORS = Object
	.entries(ERROR_CONFIGS)
	.reduce((accumulator, [name, config]) => {
		const {
			errorType,
			messageGenerator,
		} = config

		accumulator[name] = function (...args) {
			return new errorType(messageGenerator(...args))
		}

		return accumulator
	}, {})
