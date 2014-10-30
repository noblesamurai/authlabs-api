al-api
=====

A wrapper around node-al-papi.

For now just gives you a function to make requests with.

# Usage
```javascript

// Instantiate it with your api Key and an optional baseUrlOverride (for testing)
var al = require('../al')({
  apiKey: 'testApiKey'
});

var params = {
  keyword: 'blah',
  searchEngine: 'bing',
  locale: 'en-au',
  includeAdultContent: false,
  instant: true,
  callbackUrl: 'http://mycallbackurl.org?blah=yeah'
};

al(params, function(err, params) {
  // err is null if all is OK
  // params is the params you passed in above.  This is just so your callback
  // doesn't have to be closed over the params passed in if you want to access
  // the params in it.
});



```
