import assert from 'assert'

import canIUseMiddleware from '../src'
import features from './fixtures/features'
import chrome from './fixtures/chrome'
import firefox from './fixtures/firefox'

const res = {}
const next = () => {}

const middleWare = canIUseMiddleware({ features })

const getReq = (ua) => ({ headers: { 'user-agent': ua } })

describe('canIUseMiddleware', function () {
  it('should return a function', () => {
    const m = canIUseMiddleware()
    assert.equal(typeof m, 'function')
  })

  it('should return empty object as capabilities if unknown user-agent', () => {
    const req = getReq('Some mysterious user-agent')

    middleWare(req, res, next)

    assert.deepEqual(req, Object.assign({}, req, {capabilities: {}}))
  })

  it('should call next in the middleware', (done) => {
    const req = getReq(chrome.ua)

    const next = () => done()

    middleWare(req, res, next)
  })

  it('should call next in the middleware even though identifying failed', (done) => {
    const req = getReq('')

    const next = () => done()

    middleWare(req, res, next)
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
