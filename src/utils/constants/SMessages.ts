import {StatusCodes} from 'http-status-codes'


export const sMessages = {
    DEFAULT: {
        message: 'ok',
        code: 3000,
        statusCode: StatusCodes.OK,
        withData: true
    },
    UPDATE_AUTH_OK: {
        message: 'update was successful',
        code: 3001,
        statusCode: StatusCodes.CREATED,
        withData: false
    },
    USER_CREATED: {
        message: 'User crated Successfully',
        code: 3002,
        statusCode: StatusCodes.CREATED,
        withData: true
    },
    DELETE_OK:{
        message: 'Deletion was successful',
        code: 3004,
        statusCode: StatusCodes.CREATED,
        withData: true
    }
    

}

export const systemMessages = {
    default: (e: Error) => {
        return {
            code: 2001,
            statusCode: 100,
            message: e.message
        }
    },
}
