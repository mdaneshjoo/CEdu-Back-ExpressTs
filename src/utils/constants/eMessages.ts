import {StatusCodes} from "http-status-codes";
import {ValidationError} from "sequelize";
import IResponse from "../../interfaces/successResponse.interface";

export const eMessages = {
    USERNAME_NOT_PROVIDED: {
        message: 'username Not Provided',
        code: 1000,
        statusCode: StatusCodes.BAD_REQUEST
    },
    NOT_FOUND: {
        message: 'Not found',
        code: 1001,
        statusCode: StatusCodes.BAD_REQUEST
    },
    ROUTE_NOT_FOUND: {
        message: 'Destination Not Exist',
        code: 1002,
        statusCode: StatusCodes.BAD_REQUEST
    },
    UNAUTHORIZED: {
        message: 'You have not access to this part',
        code: 1003,
        statusCode: StatusCodes.UNAUTHORIZED
    },
    MIME_TYPE_NOT_PROVIDE: {
        message: 'please provide mimetype object for your request',
        code: 1004,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    },
    REQUEIRD: (item) => {
        return {
            message: `${item} Is Required`,
            statusCode: StatusCodes.BAD_REQUEST,
            code: 1005
        }
    },
    USER_EXIST: {
        message: 'This User Name Or Email already exist',
        statusCode: StatusCodes.BAD_REQUEST,
        code: 1006
    },
    FILE_TYPE_NOT_ACCEPTABLE: {
        message: 'This file type can not Acceptable',
        statusCode: StatusCodes.UNSUPPORTED_MEDIA_TYPE,
        code: 1007
    },
    WRONG_USER_OR_PASS: {
        message: 'Username or Password is wrong',
        statusCode: StatusCodes.UNAUTHORIZED,
        code: 1008
    },
    VALIDATE_JOI: (e: Error) => {
        return {
            message: e.message,
            statusCode: StatusCodes.BAD_REQUEST,
            code: 1009
        }
    }


}

export const systemErrorMessages = {
    default: (e: Error) => {
        return {
            code: 2001,
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: e.message
        }
    },
    sequlizeValidationError: (e: ValidationError) => {
        return {
            code: 2002,
            statusCode: StatusCodes.BAD_REQUEST,
            message: e.errors[0].message
        }
    }
}
