import {Dialect} from 'sequelize'
import * as dotenv from 'dotenv';
import * as path from 'path'
import ENVerror from './errors/envError'

dotenv.config({
    path: path.join(process.cwd(), '.env'),
})


const dbDriver: Dialect = 'postgres'
const requiredEnv = (name) => {
    if (!process.env[name]) {
        throw new ENVerror('You must set the ' + name + ' environment variable')
    }
    return process.env[name]
}

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 10000,
    host: process.env.HOST || '0.0.0.0',
    secret: requiredEnv('SECRET'),
    JWTexp: process.env.JWT_EXP || '4week',
    dbconfig: {
        database: requiredEnv('DB_NAME'),
        username: requiredEnv("DB_USERNAME"),
        password: requiredEnv('DB_PASSWORD'),
        host: requiredEnv('DB_HOST'),
        driver: dbDriver,
        options: {
            meta: {
                logging: false,
                timestamp: false,
                paranoid: true
            },
            sync: {force: false} // force true  drop table and make it again
        }
    },
    aws: {
        publishS3: process.env.PUBLISH_S3 || false,
        url: process.env.PUBLISH_S3 || '',
        config: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    },
    uploadServer: {
        publishToUploadServer: process.env.PUBLISH_US || false,
        url: process.env.PUBLISH_US || ''
    },
    uploadHere: {
        url: '',
        publishHere: process.env.PUBLISH_Here || false,
        rootDist: process.env.UPLOAD_DIST || 'uploads'
    }

}
config.uploadHere.url = config.host +':'+ config.port + '/'

export default {...config}
