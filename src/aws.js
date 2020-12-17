import Amplify from 'aws-amplify';
import settings from './settings';

// Configure aws
const configAws = () => {
  Amplify.configure({
    Auth: {
      mandatorySignIn: false,
      region: settings.cognito.REGION,
      userPoolId: settings.cognito.USER_POOL_ID,
      identityPoolId: settings.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: settings.cognito.APP_CLIENT_ID
    },
    Storage: {
      region: settings.s3.REGION,
      bucket: settings.s3.BUCKET
    },
    API: {
      endpoints: [
        {
          name: 'user',
          endpoint:
            'https://3egk81iid1.execute-api.us-west-2.amazonaws.com/prod/user',
          region: 'us-west-2'
        },
        {
          name: 'company',
          endpoint:
            'https://99p9k29yb9.execute-api.us-west-2.amazonaws.com/prod/company',
          region: 'us-west-2'
        },
        {
          name: 'jobs',
          endpoint:
            'https://blwmgpra87.execute-api.us-west-2.amazonaws.com/prod/jobs',
          region: 'us-west-2'
        },
        {
          name: 'countryList',
          endpoint:
            'https://a9oghrb1ok.execute-api.us-west-2.amazonaws.com/prod/countryList',
          region: 'us-west-2'
        },
        {
          name: 'candidate',
          endpoint:
            'https://c9z2myg3b9.execute-api.us-west-2.amazonaws.com/prod/candidate',
          region: 'us-west-2'
        },
        {
          name: 'email',
          endpoint:
            'https://46h1yy7zg9.execute-api.us-west-2.amazonaws.com/prod/email',
          region: 'us-west-2'
        }
      ]
    }
  });
};

export default configAws;
