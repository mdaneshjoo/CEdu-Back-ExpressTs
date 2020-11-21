import httpStatusCodes from "./httpStatusCodes";

export default {
    usernameNotProvide: {message: 'username Not Provided', code: httpStatusCodes.clientErrors.Bad_Request},
    notFound: {message: 'Not found', code: httpStatusCodes.clientErrors.Bad_Request},
    routeNotFound: {message: 'Destination Not Exist', code: httpStatusCodes.clientErrors.Bad_Request},
    notAuthorized: {message: 'You have not access to this part', code: httpStatusCodes.clientErrors.Unauthorized},
    mimetypeNotProvide: {
        message: 'please provide mimetype object for your request',
        code: httpStatusCodes.serverErrors.Internal_Server_Error
    },
    required: (item) => {
        return {
            message: `${item} Is Required`,
            code: httpStatusCodes.clientErrors.Bad_Request
        }
    },
    userExist: {message: 'This User Name Or Email already exist', code: httpStatusCodes.clientErrors.Bad_Request},
    fileTypeNotAcceptable: {
        message: 'This file type can not Acceptable',
        code: httpStatusCodes.clientErrors.Unsupported_Media_Type
    }
}

