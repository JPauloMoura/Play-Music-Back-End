import { S3 } from 'aws-sdk';

export class S3Service {
    private s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    public async uploadFile(input: UploadFileInput): Promise<UploadFileOutput> {
        const name: string = `${Date.now()}.${input.name.replace(/[\s_]+/g, "-")}`

        const result = await this.s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: name,
            Body: input.file,
        }).promise()

        return { link: result.Location }
    }
    
}

interface UploadFileInput {
    name: string;
    file: any
}

interface UploadFileOutput {
    link: string;
}