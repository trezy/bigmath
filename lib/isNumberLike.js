// Local imports
import { BigFloat } from './BigFloat.js'





const NUMBERLIKE_REGEX = /^(\d+|\d*\.\d+)$/
const VALID_TYPES = [
  'bigint',
  'number',
]

export function isNumberLike(input) {
  if (input instanceof BigFloat) {
    return true
  }

  if (VALID_TYPES.includes(typeof input)) {
    return true
  }

  if ((typeof input === 'string') && NUMBERLIKE_REGEX.test(input)) {
    return true
  }

  return false
}
