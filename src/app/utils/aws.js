
import { S3Client } from "@aws-sdk/client-s3"

const s3=new S3Client({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_kEY,
    region:process.env.AWS_REGION
});

export default s3;

