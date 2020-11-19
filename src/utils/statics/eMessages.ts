import httpStatusCodes from "./httpStatusCodes";

export default {
    usernameNotProvide: {message: 'username Not Provided', code: 400},
    notFound: {message: 'Not found', code: 404},
    routeNotFound: {message: 'Destination Not Exist', code: 404},
    notAuthorized: {message: 'You have not access to this part', code: 401},
    required: (item) => {
        return {
            message: `${item} Is Required`,
            code: 400
        }
    },
    userExist: {message: 'This User Name Or Email already exist', code: 400},
    fileTypeNotAcceptable: {message: 'This file type can not Acceptable', code: httpStatusCodes.Not_Acceptable}
}

