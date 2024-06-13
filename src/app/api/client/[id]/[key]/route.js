import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
	region:process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME ,
	credentials: {
		accessKeyId:process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID ,
		secretAccessKey:process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
	}
});

const Bucket = 'custom-drive'
export async function GET(req,{params}) {
  const command = new GetObjectCommand({ Bucket, Key: params.key });
  const src = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return NextResponse.json({ src });
}