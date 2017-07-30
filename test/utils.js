import assert from 'assert'

import {
  zipObj
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
})
