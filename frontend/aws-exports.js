const awsconfig = {
    Auth: {
        identityPoolId: 'YOUR_IDENTITY_POOL_ID', // e.g. 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
        region: 'YOUR_AWS_REGION',
        userPoolId: 'YOUR_USER_POOL_ID', // e.g. 'us-east-1_xxxxxxxx'
        userPoolWebClientId: 'YOUR_USER_POOL_CLIENT_ID', // e.g. 'xxxxxxxxxx'
    },
    Storage: {
        AWSS3: {
            bucket: 'YOUR_BUCKET_NAME',
            region: 'YOUR_AWS_REGION',
        },
    },
};

export default awsconfig;
