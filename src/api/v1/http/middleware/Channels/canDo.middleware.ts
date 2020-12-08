import { Response, Request } from 'express'
import Channels from "../../../../../models/Channels.model";
import User from "../../../../../models/User.model";



/**
 * validate to know is this request for logedin user or not
 * @throws {ServerError} error
 */
export const isOwneChannel = (req: Request, res: Response, next):void => { 
}