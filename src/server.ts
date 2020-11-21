import App from './app'
import * as bodyParser from 'body-parser'
import config from './config'
import apiRoutes from './api/routes'
import { notFoundPage, errorHandler } from './middlewares/404Error.middleware'
import * as morgan from 'morgan'
import * as cors from 'cors';

const app = new App(
    {
        port: +config.port,
        host: config.host,
        envType: config.env
    },
    {
        middlewares: [
            cors(),
            bodyParser.json(),
            bodyParser.urlencoded({ extended: true }),
            morgan('dev'),


        ],
        router: [
            { path: '/api', router: apiRoutes }
        ],
        thirdParty: [
            notFoundPage,
            errorHandler

        ]
    }
    , config.dbconfig)


app.listen()

