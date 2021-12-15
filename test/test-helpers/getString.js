// Local imports
import { BigFloat } from '../../lib/BigFloat.js'





export function getString(input) {
	const [
		integer,
		fraction = '0'.repeat(BigFloat.DECIMALS),
	] = String(input).split('.')
	const truncatedFraction = fraction.slice(0, BigFloat.DECIMALS)
	const paddedFraction = truncatedFraction.padEnd(BigFloat.DECIMALS, '0')

	return `${integer}.${paddedFraction}`
}
