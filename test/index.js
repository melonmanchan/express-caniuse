import assert from 'assert'

import canIUseMiddleWare from '../src'
import features from './fixtures/features'
import chrome from './fixtures/chrome'
import firefox from './fixtures/firefox'

const res = {}
const next = () => {}

const middleWare = canIUseMiddleWare({ features })

const getReq = (ua) => ({ headers: { 'user-agent': ua } })

describe('canIUseMiddleWare', function () {
  it('should return empty object as capabilities if no user-agent in request', () => {
    const req = { headers: {} }

    middleWare(req, res, next)

    assert.deepEqual(req, Object.assign({}, req, {capabilities: {}}))
  })

  it('should return empty object as capabilities if unknown user-agent', () => {
    const req = getReq('Some mysterious user-agent')

    middleWare(req, res, next)

    assert.deepEqual(req, Object.assign({}, req, {capabilities: {}}))
  })

  it('parses chrome user-agent and features correctly', () => {
    const req = getReq(chrome.ua)

    middleWare(req, res, next)

    assert.deepEqual(req.capabilities, chrome.capabilities)
  })

  it('parses firefox user-agent and features correctly', () => {
    const req = getReq(firefox.ua)

    middleWare(req, res, next)

    assert.deepEqual(req.capabilities, firefox.capabilities)
  })
})
