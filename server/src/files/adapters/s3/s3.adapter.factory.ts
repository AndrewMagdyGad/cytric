import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Adapter } from './s3.adapter';

@Injectable()
export class S3AdapterFactory {
  constructor(private configService: ConfigService) {}

  public getS3Adapter() {
    return new S3Adapter({
      bucket: this.configService.get('filesystem.drivers.s3.bucket'),
      accessKeyId: this.configService.get('filesystem.drivers.s3.accessKeyId'),
      secretAccessKey: this.configService.get(
        'filesystem.drivers.s3.secretAccessKey',
      ),
      region: this.configService.get('filesystem.drivers.s3.region'),
    });
  }
}
