import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import {
  DeleteObjectRequest,
  GetObjectRequest,
  ManagedUpload,
  ObjectCannedACL,
  ObjectKey,
} from 'aws-sdk/clients/s3';
import {
  DeletedResponse,
  GotResponse,
  UploadedFile,
  UploadedResponse,
} from './interfaces';

type S3Config = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
};

@Injectable()
export class S3Adapter {
  private client: S3;
  private acl: ObjectCannedACL = 'public-read';

  constructor(private config: S3Config) {
    this.createClient();
  }

  private createClient() {
    const { accessKeyId, secretAccessKey, region } = this.config;
    this.client = new S3({ accessKeyId, secretAccessKey, region });
  }

  public async put(
    file: UploadedFile,
    key: ObjectKey,
  ): Promise<UploadedResponse> {
    return this.putBuffer(file.buffer, key, file.mimetype);
  }

  public async putBuffer(buffer: Buffer, key: string, type: string) {
    const s3ObjectPayload = {
      Bucket: this.config.bucket,
      ACL: this.acl,
      Body: buffer,
      Key: key,
      ContentType: type,
    };

    return this.client
      .upload(s3ObjectPayload)
      .promise()
      .then<UploadedResponse>((data: ManagedUpload.SendData) => {
        return { url: data.Location };
      });
  }

  public async move(
    key: ObjectKey,
    newKey: ObjectKey,
  ): Promise<UploadedResponse> {
    const copyObjectPayload = {
      Bucket: this.config.bucket,
      CopySource: `${this.config.bucket}/${key}`,
      Key: newKey,
      ACL: this.acl,
    };

    const response = await this.client
      .copyObject(copyObjectPayload)
      .promise()
      .then<UploadedResponse>(() => {
        return { url: this.getObjectUrl(newKey) };
      });

    await this.delete(key);

    return response;
  }

  public async delete(key: ObjectKey): Promise<DeletedResponse> {
    const objectPayload: DeleteObjectRequest = {
      Bucket: this.config.bucket,
      Key: key,
    };

    return await this.client
      .deleteObject(objectPayload)
      .promise()
      .then<DeletedResponse>((data: S3.Types.DeleteObjectOutput) => {
        return { status: true };
      });
  }

  public async get(key: ObjectKey): Promise<GotResponse> {
    const objectParams: GetObjectRequest = {
      Bucket: this.config.bucket,
      Key: key,
    };

    return await this.client
      .getObject(objectParams)
      .promise()
      .then<GotResponse>((data: S3.Types.GetObjectOutput) => {
        return {
          key,
          contentLength: data.ContentLength,
          contentType: data.ContentType,
          body: data.Body,
        };
      });
  }

  private getObjectUrl(key: ObjectKey) {
    return `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${key}`;
  }
}
