import {Response} from 'express'
import eMessages from "../statics/eMessages";
import config from "../../config";

export const sendError = (res: Response) => (e?) => {
    if (config.env === 'development') console.log(e || eMessages.notFound)
    if (!e) e = eMessages.notFound
    return res.status(e.code).json({
        status: 'error',
        code: e.code,
        message: e.message
    })
}

export const success = (res: Response) => (entity) => {
    if (entity)
        return res.json({
            status: 'ok',
            code: 200,
            data: entity
        })
    return sendError(res)()
}
