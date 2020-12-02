import {IErrorPropertys} from "../interfaces/errorMessages.interface";

export default class ServerError extends Error {
    code

    constructor(message: IErrorPropertys) {
        if (!message.statusCode) message.statusCode = 500
        super(message.message)
        this.code = message.statusCode
    }
}

