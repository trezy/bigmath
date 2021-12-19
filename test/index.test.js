// Module imports
import { expect } from 'chai'





// Local imports
import * as AllExports from '../lib/index.js'





describe('exports', function () {
  it('exports `BigFloat`', function () {
    expect(AllExports).to.have.property('BigFloat')
  })

  it('exports `BigMath`', function () {
    expect(AllExports).to.have.property('BigMath')
  })

  it('exports `isNumberLike`', function () {
    expect(AllExports).to.have.property('isNumberLike')
  })
})
