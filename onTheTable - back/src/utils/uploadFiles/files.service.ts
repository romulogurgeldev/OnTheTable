/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

@Injectable()
export class FilesService {
    public async uploadFile(imageBuffer: Buffer, filename: string, contentType: string){
        const s3 = new S3();
        const key = `${v4()}-${filename}`

        const upload = await s3.upload({
            Bucket: "onthetable-images",
            Body: imageBuffer,
            ContentType: contentType,
            Key: key
        }).promise();

        return upload;
    }
    public async deleteFile(key: string){
        const s3 = new S3();
        const deletes = await s3.deleteObject({
            Bucket: "onthetable-images",
            Key: `${key}`
        }).promise();

        return deletes;
    }
}
