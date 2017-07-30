import assert from 'assert'

import {
  zipObj,
  matchBrowserToCanIUseKey
} from '../src/utils'

describe('utils', function () {
  describe('zipObj', function () {
    it('should parse an object from two lists', () => {
      const keys = ['a', 'b', 'c']
      const values = [1, 2, 3]
      const obj = zipObj(keys, values)

      assert.deepEqual(obj, { a: 1, b: 2, c: 3 })
    })

    it('should return empty object on no parameters', () => {
      assert.deepEqual({}, zipObj())
    })

    it('should return correctly on missing values', () => {
      const keys = ['a', 'b', 'c']
      const values = [1, 2]
      const obj = zipObj(keys, values)

      assert.deepEqual({ a: 1, b: 2, c: undefined }, obj)
    })

    it('should return correctly on missing keys', () => {
      const keys = ['a', 'b']
      const values = [1, 2, 3]
      const obj = zipObj(keys, values)

      assert.deepEqual({ a: 1, b: 2 }, obj)
    })
  })

  describe('matchBrowserToCanIUseKey', function () {
    it('should match an user agent to CanIUse key correctly', () => {
      assert.equal(matchBrowserToCanIUseKey('Android'), 'android')
      assert.equal(matchBrowserToCanIUseKey('BlackBerry WebKit'), 'bb')
      assert.equal(matchBrowserToCanIUseKey('Chrome Mobile'), 'and_chr')
      assert.equal(matchBrowserToCanIUseKey('Chrome'), 'chrome')
      assert.equal(matchBrowserToCanIUseKey('Edge'), 'edge')
      assert.equal(matchBrowserToCanIUseKey('Firefox Mobile'), 'and_ff')
      assert.equal(matchBrowserToCanIUseKey('Firefox'), 'firefox')
      assert.equal(matchBrowserToCanIUseKey('IE Mobile'), 'ie_mob')
      assert.equal(matchBrowserToCanIUseKey('IE'), 'ie')
      assert.equal(matchBrowserToCanIUseKey('Mobile Safari'), 'ios_saf')
      assert.equal(matchBrowserToCanIUseKey('Opera Mini'), 'op_mini')
      assert.equal(matchBrowserToCanIUseKey('Opera Mobile'), 'op_mob')
      assert.equal(matchBrowserToCanIUseKey('Opera'), 'opera')
      assert.equal(matchBrowserToCanIUseKey('Safari'), 'safari')
    })

    it('should fail correctly on undefined key', () => {
      assert.equal(matchBrowserToCanIUseKey(), undefined)
      assert.equal(matchBrowserToCanIUseKey('Some non-existant browser'), undefined)
    })
  })
})
