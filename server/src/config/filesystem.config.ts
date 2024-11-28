import { env } from '../utils/env';
import { registerAs } from '@nestjs/config';

export default registerAs('filesystem', () => ({
  default: env('FILESYSTEM_DEFAULT'),
  drivers: {
    s3: {
      bucket: env('FILESYSTEM_S3_BUCKET'),
      region: env('FILESYSTEM_S3_REGION'),
      accessKeyId: env('FILESYSTEM_S3_ACCESS_KEY_ID'),
      secretAccessKey: env('FILESYSTEM_S3_SECRET_ACCESS_KEY'),
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
    },
  },
}));
