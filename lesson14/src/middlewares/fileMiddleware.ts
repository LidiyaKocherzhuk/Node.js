import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';

import { ErrorHandler } from '../error/errorHandler';
import { constants } from '../constans';

class FileMiddleware {
    public checkFileAvatar(req: Request, res: Response, next: NextFunction): void {
        try {
            if (!req.files?.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar as UploadedFile;

            if (size > constants.PHOTO_MAX_SIZE) {
                next(new ErrorHandler(`File ${name} is too big!`));
                return;
            }

            if (!constants.PHOTOS_MIMETYPE.includes(mimetype)) {
                next(new ErrorHandler('Wrong file format'));
                return;
            }

            next();
        } catch (err) {
            next(err);
        }
    }
}

export const fileMiddleware = new FileMiddleware();
