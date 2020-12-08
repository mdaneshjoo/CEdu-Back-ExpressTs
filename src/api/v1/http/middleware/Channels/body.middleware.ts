import { Response, Request } from 'express'
import JoiValidator from "../../../../../utils/validators/joi";


/**
 * @param {string} req.body.title title of channel
 * @param {boolean} req.body.isPrivate restrict of channel
 * @throws {JoivalidationError} error
 */
export const createAndUpdateChannelBody = (req: Request, res: Response, next): void => {
    const joi = new JoiValidator()
    req.body = joi.createChannelBody(req.body)
    next()
}







