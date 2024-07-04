import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";
import { createWriteStream } from 'fs';


const s3Client = new S3Client({
	region:process.env.S3_UPLOAD_REGION ,
	credentials: {
		accessKeyId:process.env.S3_UPLOAD_KEY ,
		secretAccessKey:process.env.S3_UPLOAD_SECRET,
	}
});

const Bucket = process.env.S3_UPLOAD_BUCKET


export async function GET(req,{params}) {
  const command = new GetObjectCommand({ Bucket, Key: params.key });
  const src = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  return NextResponse.json({ src });
}
