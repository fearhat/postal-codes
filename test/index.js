/* global describe, it */
var assert = require('assert')
var lib = require('../index')

describe('Postalcodes.', function () {
  describe('get()', function () {
    it('should throw Error in case the PostalCode is in a wrong format', function () {
      assert.throws(function () { lib.get('Hallo') }, Error)
    })

    it('should throw Error in case the Postalcode is too long or too short', function () {
      assert.throws(function () { lib.get('123122') }, Error)
      assert.throws(function () { lib.get('123') }, Error)
    })

    it('should throw Error in case no Postalcode was provided', function () {
      assert.throws(lib.get, Error)
    })

    it('should return Array if valid property param was provided', function () {
      assert.ok(Array.isArray(lib.get('13347', 'districts')))
      assert.ok(Array.isArray(lib.get('13347', 'regions')))
    })

    it('should return whole result Object in case property param is invalid', function () {
      assert.equal(lib.get('13347', 'invalidprop'), lib.get('13347'))
    })
  })

  describe('getPostalCodesByDistrict()', function () {
    it('should throw Error in case no district was provided', function () {
      assert.throws(lib.getPostalCodesByDistrict, Error)
    })

    it('should throw Error in case district is not a String', function () {
      assert.throws(function () { lib.getPostalCodesByDistrict(1234) }, Error)
    })

    it('should provide an Array in case a district was provided', function () {
      assert.ok(Array.isArray(lib.getPostalCodesByDistrict('Gesundbrunnen')))
    })

    it('should provide a filled Array in case a valid district was found', function () {
      assert.ok(lib.getPostalCodesByDistrict('Gesundbrunnen').length > 0)
    })
  })

  describe('getPostalCodesByRegion()', function () {
    it('should throw Error in case no region was provided', function () {
      assert.throws(lib.getPostalCodesByRegion, Error)
    })

    it('should throw Error in case region is not a String', function () {
      assert.throws(function () { lib.getPostalCodesByRegion(1234) }, Error)
    })

    it('should provide an Array in case a region was provided', function () {
      assert.ok(Array.isArray(lib.getPostalCodesByRegion('Berlin')))
    })

    it('should provide a filled Array in case a valid region was found', function () {
      assert.ok(lib.getPostalCodesByRegion('Berlin').length > 0)
    })
  })
})
