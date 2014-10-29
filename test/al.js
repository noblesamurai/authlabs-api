var expect = require('expect.js'),
    nock = require('nock');

describe('Al', function() {
  var al = require('../al')({
    apiKey: 'testApiKey'
  });

  before(function() {
      nock.disableNetConnect();
  });

  after(function() {
      nock.enableNetConnect();
  });

  it('it issues a well formed POST to AL with the correct info, ' +
    'subject to rate limiting', function(done) {
    var params = {
      jobId: 234,
      keyword: 'blah',
      searchEngine: 'bing',
      locale: 'en-au',
      includeAdultContent: true,
      instant: false,
      callbackUrl: 'http://mycallbackurl.org?blah=yeah'
    };

    var expectedEndpointPath =
      '/keywords.json' +
      '?keyword=blah' +
      '&engine=bing' +
      '&locale=en-au' +
      '&safe=off' +
      '&autocorrect=false' +
      '&callback=' + encodeURIComponent('http://mycallbackurl.org?blah=yeah') +
      '&auth_token=testApiKey';

    var ALEndpoint = nock("http://api.authoritylabs.com").
        post(expectedEndpointPath).
        once().
        reply(200, {});

    al(params, expectations);

    function expectations(err) {
      if (err) return done(err);
      ALEndpoint.done();
      done();
    }
  });

  it('sends to the priority queue for instant jobs', function(done) {
    var params = {
      jobId: 234,
      keyword: 'blah',
      searchEngine: 'bing',
      locale: 'en-au',
      includeAdultContent: false,
      instant: true,
      callbackUrl: 'http://mycallbackurl.org?blah=yeah'
    };

    var expectedEndpointPath =
      '/keywords/priority.json' +
      '?keyword=blah' +
      '&engine=bing' +
      '&locale=en-au' +
      '&safe=on' +
      '&autocorrect=false' +
      '&callback=' + encodeURIComponent('http://mycallbackurl.org?blah=yeah') +
      '&priority=true&auth_token=testApiKey';

    var ALEndpoint = nock("http://api.authoritylabs.com").
        post(expectedEndpointPath).
        once().
        reply(200, {});

    al(params, expectations);

    function expectations(err) {
      if (err) return done(err);
      ALEndpoint.done();
      done();
    }
  });
});

// vim: set et sw=2 ts=2 colorcolumn=80:
