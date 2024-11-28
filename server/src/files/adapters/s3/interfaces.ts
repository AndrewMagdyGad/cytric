import { Body } from 'aws-sdk/clients/s3';

export type UploadedFile = Express.Multer.File;

export type UploadedResponse = {
  url: string;
};

export type DeletedResponse = {
  status: boolean;
};

export type GotResponse = {
  key: string;
  contentLength: number;
  contentType: string;
  body: Body;
};
