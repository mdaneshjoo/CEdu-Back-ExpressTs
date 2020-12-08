import {Response, Request} from 'express'
import {IAuthBody} from "../../../../../interfaces/authBody.interface";
import JoiValidator from "../../../../../utils/validators/joi";

/**
 * validate api for body request
 * @param {string} req.body.userName - Required
 * @param {string} req.body.password - Required
 * @param {string} req.body.email - not Required but validate
 * @param {string} req.body.phoneNumber - not Required but validate
 * @throws {JoivalidationError} userName is required Or email is not valid
 * */
const personalInfoBody = (req: Request, res: Response, next): void => {
    const joi = new JoiValidator()
    req.body = joi.personalInfoValidator(req.body)
    next()
}

export default personalInfoBody
