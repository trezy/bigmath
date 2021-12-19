// Module imports
import { expect } from 'chai'





// Local imports
import * as AllExports from '../lib/index.js'





const EXPECTED_EXPORTS = [
  'add',
  'BigMath',
  'BigFloat',
  'divide',
  'isNumberLike',
  'multiply',
  'subtract',
]

describe('exports', function () {
  EXPECTED_EXPORTS.forEach(exportName => {
    it(`exports \`${exportName}\``, function () {
      expect(AllExports).to.have.property(exportName)
    })
  })
})
