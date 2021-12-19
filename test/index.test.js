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
  // EXPECTED_EXPORTS.forEach(exportName => {
  //   it(`exports \`${exportName}\``, function () {
  //     expect(AllExports).to.have.property(exportName)
  //   })
  // })

  it('exports `BigFloat`', function () {
    expect(AllExports).to.have.property('BigFloat')
  })

  it('exports `BigMath`', function () {
    expect(AllExports).to.have.property('BigMath')
  })

  it('exports `add`', function () {
    expect(AllExports).to.have.property('add')
  })

  it('exports `subtract`', function () {
    expect(AllExports).to.have.property('subtract')
  })

  it('exports `multiply`', function () {
    expect(AllExports).to.have.property('add')
  })

  it('exports `divide`', function () {
    expect(AllExports).to.have.property('divide')
  })

  it('exports `isNumberLike`', function () {
    expect(AllExports).to.have.property('isNumberLike')
  })
})
