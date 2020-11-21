import ServerError from "../errors/serverError"
import {Request, Response} from 'express'
import config from "../config";
import eMessages from "../utils/statics/eMessages";
import multer = require("multer");

export const notFoundPage = (req: Request, res: Response, next) => {
    next(new ServerError(eMessages.routeNotFound))
}

export const errorHandler = async (error, req, res, next) => {
    if (config.env === 'development') console.log(error)
    return res.status(error.code || 500).json({status: 'error', code: error.code || 500, message: error.message})
}
