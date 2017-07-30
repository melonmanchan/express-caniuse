import assert from 'assert'

import {
  zipObj,
  parseFeaturesFromSpecs,
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

  describe('parseFeaturesFromSpecs', function () {
    it('should return empty object with no parameters', () => {
      assert.deepEqual(parseFeaturesFromSpecs(), {})
    })

    it('should parse features from CanIUse specs correctly', () => {
      const specs = { 'border-radius':
                     { and_chr: { y: 59 },
                       and_ff: { y: 54 },
                       and_qq: { y: 1.2 },
                       and_uc: { y: 11.4 },
                       android: { y: 2.1, x: 2.1 },
                       baidu: { y: 7.12 },
                       bb: { y: 7 },
                       chrome: { y: 4, x: 4 },
                       edge: { y: 12 },
                       firefox: { a: 2, x: 3.6, '#2': 49, y: 3 },
                       ie: { n: 8, y: 9 },
                       ie_mob: { y: 10 },
                       ios_saf: { y: 3.2, x: 3.2 },
                       op_mini: {},
                       op_mob: { n: 10, y: 11 },
                       opera: { n: 10, y: 10.5 },
                       safari: { y: 3.1, x: 4, '#1': 6.1 },
                       samsung: { y: 4 } } }

      const features = {
        and_chr: { 'border-radius': { y: 59 } },
        and_ff: { 'border-radius': { y: 54 } },
        and_qq: { 'border-radius': { y: 1.2 } },
        and_uc: { 'border-radius': { y: 11.4 } },
        android: { 'border-radius': { y: 2.1, x: 2.1 } },
        baidu: { 'border-radius': { y: 7.12 } },
        bb: { 'border-radius': { y: 7 } },
        chrome: { 'border-radius': { y: 4, x: 4 } },
        edge: { 'border-radius': { y: 12 } },
        firefox: { 'border-radius': { a: 2, x: 3.6, '#2': 49, y: 3 } },
        ie: { 'border-radius': { n: 8, y: 9 } },
        ie_mob: { 'border-radius': { y: 10 } },
        ios_saf: { 'border-radius': { y: 3.2, x: 3.2 } },
        op_mini: { 'border-radius': {} },
        op_mob: { 'border-radius': { n: 10, y: 11 } },
        opera: { 'border-radius': { n: 10, y: 10.5 } },
        safari: { 'border-radius': { y: 3.1, x: 4, '#1': 6.1 } },
        samsung: { 'border-radius': { y: 4 } } }

      assert.deepEqual(parseFeaturesFromSpecs(specs), features)
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
