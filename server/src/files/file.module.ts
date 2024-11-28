import { Module } from '@nestjs/common';
import { S3AdapterFactory } from './adapters/s3/s3.adapter.factory';

@Module({
  exports: [S3AdapterFactory],
  providers: [S3AdapterFactory],
})
export class FileModule {}
