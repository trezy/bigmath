export function InputNotNumberLike(input) {
  return new TypeError(`${input} is not a valid number-like input.`)
}
