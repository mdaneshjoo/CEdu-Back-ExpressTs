import {Response, Request} from 'express'
import {IAuthBody} from "../interfaces/authBody.interface";
import JoiValidator from "../utils/validators/joi";

export default class AuthenticationMiddleware {
    /**
     * validate api for body request
     * @param {string} req.body.userName - Required
     * @param {string} req.body.password - Required
     * @param {string} req.body.email - not Required but validate
     * @param {string} req.body.phoneNumber - not Required but validate
     * @throws {ServerError} userName is required Or email is not valid
     * */
    controlLoginSignupBody(req: Request, res: Response, next): void {
        const joi = new JoiValidator()
        req.body = joi.authValidate(req.body)
        next()
    }

    /**
     * validate api for body request
     * @param {string} req.body.password -can update password
     * @param {string} req.body.email - email will be validate
     * @param {string} req.body.phoneNumber - phoneNumber will be validate
     * @throws {ServerError} validation error
     * */
    controlUpdateBody(req: Request, res: Response, next): void {
        const joi = new JoiValidator()
        req.body = joi.authUpdateValidate(req.body)
        next()
    }
}



