import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
	region:'ap-south-1' ,
	credentials: {
		accessKeyId:'AKIA2KVQI3ET4PX2RU5B' ,
		secretAccessKey:'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',
	}
});

const Bucket = 'custom-drive'
export async function GET(req,{params}) {
  const command = new GetObjectCommand({ Bucket, Key: params.key });
  const src = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return NextResponse.json({ src });
}