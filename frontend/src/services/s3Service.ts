import {File, RNS3} from 'react-native-aws3';
import {AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY} from '@env';

const options = {
  keyPrefix: '/uploads',
  bucket: 'coinbox.test',
  region: 'us-east-1',
  accessKey: AWS_ACCESS_KEY,
  secretKey: AWS_SECRET_ACCESS_KEY,
  successActionStatus: 201,
};

const uploadFile = async (file: File) => {
  try {
    const result = await RNS3.put(file, options);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export {uploadFile};
