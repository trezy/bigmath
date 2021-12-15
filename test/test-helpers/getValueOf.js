// Local imports
import { getString } from './getString.js'







export function getValueOf(input) {
	const string = getString(input)

	return BigInt(string.replace('.', ''))
}
