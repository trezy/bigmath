// Module imports
import { expect } from 'chai'





// Local imports
import * as AllExports from '../lib/index.js'





const EXPECTED_EXPORTS = [
  'add',
  'BigMath',
  'BigFloat',
  'ceil',
  'ceiling',
  'divide',
  'divideRound',
  'floor',
  'isNumberLike',
  'min',
  'minimum',
  'multiply',
  'round',
  'subtract',
]

describe('exports', function () {
  EXPECTED_EXPORTS.forEach(exportName => {
    it(`includes \`${exportName}\``, function () {
      expect(AllExports).to.have.property(exportName)
    })
  })

  it('has no extraneous exports', function () {
    expect(Object.keys(AllExports).sort()).to.deep.equal(EXPECTED_EXPORTS.sort())
  })
})
