import { UploadedFile } from 'express-fileupload';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

import { config } from '../config';

class S3Service {
    Buckets;

    constructor() {
        this.Buckets = new S3({
            region: config.REGION,
            accessKeyId: config.ACCESS_KEY_ID,
            secretAccessKey: config.SECRET_KEY_ID,
        });
    }

    uploadFile(
        file: UploadedFile,
        itemType: string,
        itemId: number,
    ) {
        try {
            const uploadFilePath = this.FileNameBuilder(file.name, itemType, itemId);

            return this.Buckets.upload({
                Bucket: config.S3_NAME as string,
                Body: file.data,
                Key: uploadFilePath,
                ContentType: file.mimetype,
                ACL: 'public-read',
            })
                .promise();
        } catch (err) {
            return err;
        }
    }

    private FileNameBuilder(fileName: string, itemType: string, itemId: number): string {
        const fileExtension = path.extname(fileName);

        return `${itemType}/${itemId}/${uuidv4()}${fileExtension}`;
    }
}

export const s3Service = new S3Service();
