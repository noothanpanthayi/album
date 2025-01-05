// app/api/list-images/route.ts
import { NextResponse } from "next/server";
import { ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../../utils/aws";

export async function GET(request) {
  const folderName = request.nextUrl.searchParams.get("folderName");
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Prefix: folderName,
  };

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params));
    const imageUrls = await Promise.all(
      data.Contents.filter(item => !item.Key.endsWith('/')).map(async (item) => {
        const url = await getSignedUrl(s3Client, new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: item.Key,
        }), { expiresIn: 600 });
        return url;
      })
    );
    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching images" }, { status: 500 });
  }
}
