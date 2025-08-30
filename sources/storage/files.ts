import * as Minio from "minio";

export const s3client = new Minio.Client({
  endPoint: process.env.S3_HOST!,
  port: parseInt(process.env.S3_PORT || "9000", 10),
  useSSL: process.env.S3_USE_SSL === "true",   // boolean
  accessKey: process.env.S3_ACCESS_KEY!,
  secretKey: process.env.S3_SECRET_KEY!,
});

export const s3bucket = process.env.S3_BUCKET!;
export const s3host = process.env.S3_HOST!;
export const s3public = process.env.S3_PUBLIC_URL!;
export const s3ssl = process.env.S3_USE_SSL === "true";      // boolean
export const s3port = parseInt(process.env.S3_PORT || "9000", 10);  // number

export async function loadFiles() {
  await s3client.bucketExists(s3bucket); // throws if missing/inaccessible
}

export function getPublicUrl(path: string) {
  return `${s3public}/${path}`;
}

export type ImageRef = {
  width: number;
  height: number;
  thumbhash: string;
  path: string;
};
