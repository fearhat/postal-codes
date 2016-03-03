### German Postal Codes

usage :
```js
  'use strict';
  const postal = require('@wunderflats/postal-codes');

  postal.get('13347'); // returns {regions: ['Berlin'], districts: ['Wedding', 'Gesundbrunnen']}; OR null in case nothing was found
  postal.getRegions('13347'); // returns ['Berlin'] / Region OR empty Array
  postal.getDistricts('13347'); // returns ['Wedding', 'Gesundbrunnen'] or empty Array
  postal.getPostalCodesByDistrict('Wedding'); // returns Array of Postal codes or Empty Array
  postal.getPostalCodesByRegion('Berlin'); // returns Array of postal codes or Empty array
```


TODO : Add Docs
