'use strict';

const data = require('./data.js');
let mappedForRegions = null;
let mappedForDistricts = null;

function createMappedForRegions() {
  mappedForRegions = {};
  Object.keys(data).forEach(plz => {
    const region = data[plz].region.toLowerCase();
    if ( mappedForRegions[region] ) {
      mappedForRegions[region].push(plz);
    } else {
      mappedForRegions[region] = [plz];
    }
  });
}

function createMappedForDistricts() {
  mappedForDistricts = {};
  Object.keys(data).forEach(plz => {
    const district = data[plz].district.toLowerCase();
    if ( mappedForDistricts[district] ) {
      mappedForDistricts[district].push(plz);
    } else {
      mappedForDistricts[district] = [plz];
    }
  });
}

module.exports = {
  getDistrict : (postalcode) => data[postalcode] ? data[postalcode].district : null,
  getRegion : (postalcode) => data[postalcode] ? data[postalcode].region : null,
  get : (postalcode) => data[postalcode] ? data[postalcode] : null,
  getPostalCodesByRegion : (region) => {
    mappedForRegions = mappedForRegions || createMappedForRegions();

    return mappedForRegions[region.toLowerCase()];
  },
  getPostalCodesByDistrict : (district) => {
    mappedForDistricts = mappedForDistricts || createMappedForDistricts();

    return mappedForDistricts[district.toLowerCase()];
  }
};
