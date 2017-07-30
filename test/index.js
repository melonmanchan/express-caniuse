import assert from 'assert'

import canIUseMiddleWare from '../src'
import features from './fixtures/features'

const res = {}
const next = () => {}

const middleWare = canIUseMiddleWare({ features })

describe('canIUseMiddleWare', function () {
  it('should return empty object as capabilities if no user-agent in request', () => {
    const req = { headers: {} }

    middleWare(req, res, next)

    assert.deepEqual(req, Object.assign({}, req, {capabilities: {}}))
  })

  it('should return empty object as capabilities if unknown user-agent', () => {
    const req = { headers: {
      'user-agent': 'Some mysterious user-agent'
    } }

    middleWare(req, res, next)

    assert.deepEqual(req, Object.assign({}, req, {capabilities: {}}))
  })
})
