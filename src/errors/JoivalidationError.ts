import {IErrorPropertys} from "../interfaces/errorMessages.interface";

export default class JoivalidationError extends Error {
    code
    constructor(message: IErrorPropertys) {
        if (!message.statusCode) message.statusCode = message.code || 500
        super(message.message)
        this.code = message.statusCode
    }
}

