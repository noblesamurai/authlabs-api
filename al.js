var alAPI = require('al-papi'),
    url = require('url');

module.exports = function(config) {

  // Configure using our api-key (currently the test account).
  alAPI.AlConfig(config.apiKey, config.baseUrlOverride);

  // Make request object to make api calls
  var req = new alAPI.AlRequest();

  /**
   * @param {Function} done - Callback to call when request is complete or error
   *   occurs. Of the form done(err, params).
   */
  return function(params, done) {

    var requestBody = {
      keyword: params.keyword,
      engine: params.searchEngine,
      locale: params.locale,
      // If we want adult content (true), safe should be off, and vice versa.
      safe: params.includeAdultContent ? 'off' : 'on',
      autocorrect: false,
      callback: params.callbackUrl
    };

    if (params.instant) {
      req.priority_post(requestBody, handleResponse);
    } else {
      req.post(requestBody, handleResponse);
    }

    function handleResponse(response) {
      var error;
      if (response.success) {
        error = null;
      }
      else {
        console.log(response);
        error = new Error('Error calling AL: '+ response.errorMessage + ' ' + response.statusCode);
      }
      return done(error, params);
    }
  };
};

// vim: set et sw=2 ts=2 colorcolumn=80:
