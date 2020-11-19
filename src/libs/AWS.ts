import * as multer from 'multer'
import * as multerS3 from 'multer-s3'
import * as aws from 'aws-sdk'
import config from "../config";
import picMimeTypes from '../utils/mimeTypes/onlyImages'
import ServerError from "../errors/serverError";
import eMessages from "../utils/statics/eMessages";

export default class AWS {
    private s3 = new aws.S3(config.aws.config);

    private uploadS3(str: string) {
        return multer({
            sftp:{},
            storage: multerS3({
                s3: this.s3,
                acl: 'public-read',
                bucket: 'bucket-name',
                metadata: (req, file, cb) => {
                    cb(null, {fieldName: file.fieldname})
                },
                key: (req, file, cb) => {
                    cb(null, `${str}-${Date.now().toString()}`)
                }
            }),
            fileFilter(req, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                (Object.keys(picMimeTypes).indexOf(req.file.mimetype) === -1) ?
                    callback(new ServerError(eMessages.fileTypeNotAcceptable)) :
                    callback(null, true)
            }
        });
    }

    uploadImage() {
        this.uploadS3()
    }
}