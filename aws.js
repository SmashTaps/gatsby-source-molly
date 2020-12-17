'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _awsAmplify = require('aws-amplify');

var _awsAmplify2 = _interopRequireDefault(_awsAmplify);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configure aws
const configAws = () => {
  _awsAmplify2.default.configure({
    Auth: {
      mandatorySignIn: false,
      region: _settings2.default.cognito.REGION,
      userPoolId: _settings2.default.cognito.USER_POOL_ID,
      identityPoolId: _settings2.default.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: _settings2.default.cognito.APP_CLIENT_ID
    },
    Storage: {
      region: _settings2.default.s3.REGION,
      bucket: _settings2.default.s3.BUCKET
    },
    API: {
      endpoints: [{
        name: 'user',
        endpoint: 'https://3egk81iid1.execute-api.us-west-2.amazonaws.com/prod/user',
        region: 'us-west-2'
      }, {
        name: 'company',
        endpoint: 'https://99p9k29yb9.execute-api.us-west-2.amazonaws.com/prod/company',
        region: 'us-west-2'
      }, {
        name: 'jobs',
        endpoint: 'https://blwmgpra87.execute-api.us-west-2.amazonaws.com/prod/jobs',
        region: 'us-west-2'
      }, {
        name: 'countryList',
        endpoint: 'https://a9oghrb1ok.execute-api.us-west-2.amazonaws.com/prod/countryList',
        region: 'us-west-2'
      }, {
        name: 'candidate',
        endpoint: 'https://c9z2myg3b9.execute-api.us-west-2.amazonaws.com/prod/candidate',
        region: 'us-west-2'
      }, {
        name: 'email',
        endpoint: 'https://46h1yy7zg9.execute-api.us-west-2.amazonaws.com/prod/email',
        region: 'us-west-2'
      }]
    }
  });
};

exports.default = configAws;