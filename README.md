# German Postal Codes

[![Travis Build](http://img.shields.io/travis/wunderflats/postal-code.svg?style=flat)](https://travis-ci.org/wunderflats/postal-code) [![npm](https://img.shields.io/npm/dm/postal-code.svg)](https://www.npmjs.com/package/postal-code)

## Install

`$ npm install postal-code --save`


## Usage

```js
'use strict';
const postal = require('postal-code');

postal.get('13347'); // returns {regions: ['Berlin'], districts: ['Wedding', 'Gesundbrunnen']}; OR undefined in case nothing was found
postal.getRegions('13347'); // returns ['Berlin'] / Region OR empty Array
postal.getDistricts('13347'); // returns ['Wedding', 'Gesundbrunnen'] or empty Array
postal.getPostalCodesByDistrict('Wedding'); // returns Array of Postal codes or Empty Array
postal.getPostalCodesByRegion('Berlin'); // returns Array of postal codes or Empty array
```
