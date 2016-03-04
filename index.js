'use strict'

var data = require('./data.js') // data object
var mappedForRegions = null // data where regions will be lookup keys
var mappedForDistricts = null // data where districts will be lookup keys
var InvalidPostalcode = 'Invalid Postalcode' // Invalid PLZ Err
var WrongFormatError = 'Wrong param provided' // Invalid Format Err
var ParamMissing = 'Param is missing' // Param missing err
var GermanPLZRegex = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/ // German PLZ Regex to test

/**
 * Wrapper Function to Map Data to Regions
 * @private
 * @return {Object}
 */
function createMappedForRegions () {
  // create empty obj
  mappedForRegions = {}

  // iterate over all postal codes
  Object.keys(data).forEach(function (plz) {
    // get all regions for one postal code
    var regions = data[plz].regions
    // iterate over all regions and fill them into result object
    regions.forEach(function (region) {
      region = region.toLowerCase()

      // district exists, push into result
      if (mappedForRegions[region]) {
        mappedForRegions[region].push(plz)
      } else {
        // district does not exist, create array
        mappedForRegions[region] = [plz]
      }
    })
  })

  return mappedForRegions
}

/**
 * Wrapper Function to Map Data to Districts
 * @private
 * @return {Object}
 */
function createMappedForDistricts () {
  // create empty obj
  mappedForDistricts = {}
  // iterate over all postal codes
  Object.keys(data).forEach(function (plz) {
    // get all districts for one postal code
    var districts = data[plz].districts

    // iterate over all districts and fill them into result object
    districts.forEach(function (district) {
      district = district.toLowerCase()
      // district exists, push into result
      if (mappedForDistricts[district]) {
        mappedForDistricts[district].push(plz)
      } else {
        // district does not exist, create array
        mappedForDistricts[district] = [plz]
      }
    })
  })

  return mappedForDistricts
}

/**
 * Get Regions and Districts to Postalcode
 * @param  {String} postalcode German 5 digit postal code
 * @param {String} property "districts" or "regions" if you want to get one specific property
 * @return {[Object]|undefined} Object with "districts" and "regions" Keys storing their values
 */
function get (postalcode, property) {
  if (!postalcode) {
    // dirty quick undefined / null / false check
    throw new Error(ParamMissing + ': postalcode')
  }

  if (typeof postalcode === 'number') {
    postalcode = postalcode.toString()
  }

  if (typeof postalcode === 'string') {
    if (postalcode.match(GermanPLZRegex)) {
      if (property === 'districts' || property === 'regions') {
        return data[postalcode] ? data[postalcode][property] : []
      }
      return data[postalcode]
    }
    throw new Error(InvalidPostalcode)
  }
  return []
}

/**
 * Get Districts by Postalcode
 * Warning: This might *not* return a valid district but the name of a city due to limitations.
 * Smaller cities aren't guaranteed to yield their districts,
 * they will return the city name instead.
 * Example: Searchfing for "68159" will not tell you which district in
 * Mannheim the Postal code belongs to but tell you that it belongs to Mannheim
 * @param  {String} postalcode German 5 digit postal code
 * @return {Array.<String>}            Array of Districts
 */
function getDistricts (postalcode) {
  return get(postalcode, 'districts')
}

/**
 * Get Regions (Bundesländer) by Postalcode
 * @param  {String} postalcode German 5 digit postal code
 * @return {Array.<String>}            Array of Regions
 */
function getRegions (postalcode) {
  return get(postalcode, 'regions')
}

/**
 * Get All Postal codes for one Region (Bundesland)
 * @param  {String} region The region (Bundesland) e.g "Berlin"
 * @return {Array.<String>}        Array of Postalcodes
 */
function getPostalCodesByRegion (region) {
  if (!region) {
    throw new Error(ParamMissing + ': region')
  }
  if (typeof region !== 'string') {
    throw new Error(WrongFormatError)
  }
  mappedForRegions = mappedForRegions || createMappedForRegions()
  return mappedForRegions[region.toLowerCase()] || []
}

/**
 * Get All Postal codes for one District
 * Warning: Providing a *valid* german district might return empty
 * results due to current limitations.
 * You can find smaller cities by providing the city name instead of district name in the query.
 * Suggested example:
 * Search for district first, if your result has length 0, search for the city.
 * If that's 0 again, check for region (Bundesland) - with getPostalCodesByRegion
 * @param  {String} region The District e.g "Gesundbrunnen" (Berlin)
 * @return {Array.<String>}        Array of Postalcodes
 */
function getPostalCodesByDistrict (district) {
  if (!district) {
    throw new Error(ParamMissing + ': district')
  }
  if (typeof district !== 'string') {
    throw new Error(WrongFormatError)
  }
  mappedForDistricts = mappedForDistricts || createMappedForDistricts()
  return mappedForDistricts[district.toLowerCase()] || []
}

/**
 * Module export
 * @type {Object}
 */
module.exports = {
  get: get,
  getPostalCodesByDistrict: getPostalCodesByDistrict,
  getPostalCodesByRegion: getPostalCodesByRegion,
  getDistricts: getDistricts,
  getRegions: getRegions
}
