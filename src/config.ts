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
    JWTexp: process.env.JWT_EXP || '1week',
    dbconfig: {
        database: requiredEnv('DB_NAME'),
        username: requiredEnv("DB_USERNAME"),
        password: requiredEnv('DB_PASSWORD'),
        host: requiredEnv('DB_HOST'),
        driver: dbDriver,
        meta: {
            logging: false,
            timestamp: true,
            paranoid: true

        },
        sync: {force: false} // force true  drop table and make it again
    },
    aws: {
        publishS3: process.env.PUBLISH_S3 || false,
        config: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    }
}


export default {...config}