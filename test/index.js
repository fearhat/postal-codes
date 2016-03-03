/* global describe, it */
const assert = require('assert');
const lib = require('../index');

describe('Postalcodes.', () => {
  describe('get()', () => {
    it('should throw Error in case the PostalCode is in a wrong format', () => {
      assert.throws(() => lib.get('Hallo'), Error);
    });

    it('should throw Error in case the Postalcode is too long or too short', () => {
      assert.throws(() => lib.get('123122'), Error);
      assert.throws(() => lib.get('123'), Error);
    });

    it('should throw Error in case no Postalcode was provided', () => {
      assert.throws(lib.get, Error);
    });

    it('should return Array if valid property (districts, regions) param was provided', () => {
      assert.equal(Array.isArray(lib.get('13347', 'districts')), true);
      assert.equal(Array.isArray(lib.get('13347', 'regions')), true);
    });

    it('should return whole result Object in case property param is invalid', () => {
      assert.equal(lib.get('13347', 'invalidprop'), lib.get('13347'));
    });
  });

  describe('getPostalCodesByDistrict()', () => {
    it('should throw Error in case no district was provided', () => {
      assert.throws(lib.getPostalCodesByDistrict, Error);
    });

    it('should throw Error in case district is not a String', () => {
      assert.throws(() => lib.getPostalCodesByDistrict(1234), Error);
    });

    it('should provide an Array in case a district was provided', () => {
      assert.equal(Array.isArray(lib.getPostalCodesByDistrict('Gesundbrunnen')), true);
    });

    it('should provide a filled Array in case a valid district was found', () => {
      assert.equal(
        lib.getPostalCodesByDistrict('Gesundbrunnen').length > 0, true
      );
    });
  });

  describe('getPostalCodesByRegion()', () => {
    it('should throw Error in case no region was provided', () => {
      assert.throws(lib.getPostalCodesByRegion, Error);
    });

    it('should throw Error in case region is not a String', () => {
      assert.throws(() => lib.getPostalCodesByRegion(1234), Error);
    });

    it('should provide an Array in case a region was provided', () => {
      assert.equal(Array.isArray(lib.getPostalCodesByRegion('Berlin')), true);
    });

    it('should provide a filled Array in case a valid region was found', () => {
      assert.equal(lib.getPostalCodesByRegion('Berlin').length > 0, true);
    });
  });
});
