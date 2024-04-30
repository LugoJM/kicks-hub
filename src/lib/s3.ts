import {
  DeleteObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const accessKeyId = process.env.S3_ACCESS_KEY_ID ?? "";
const secretAccessKey = process.env.S3_SECRET_KEY ?? "";
const Bucket = process.env.AWS_S3_BUCKET_NAME ?? "";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export const uploadtoS3 = async (file: File) => {
  const fileType = file.type;

  const params: PutObjectCommandInput = {
    Bucket,
    Key: `products-images/${Date.now()}-${file.name}`,
    Body: file,
    ContentType: fileType,
  };

  const awsResponse = await new Upload({
    client: s3Client,
    params,
  }).done();

  return awsResponse.Location;
};

export const deleteFileFromS3 = async (fileKey: string) => {
  const params: PutObjectCommandInput = {
    Bucket,
    Key: fileKey,
  };
  await s3Client.send(new DeleteObjectCommand(params));
};
