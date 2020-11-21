export default {
    // Client errors (400–499)
    clientErrors: {
        Not_Acceptable: 406,
        Bad_Request:400,
        Unauthorized:401,
        Forbidden:403,
        Not_Found:404,
        Unsupported_Media_Type:415,
    },
    // Server errors (500–599)
    serverErrors: {
        Internal_Server_Error:500,
        Service_Unavailable:503
    },
    //Successful responses (200–299)
    successResponse: {},
    // Informational responses (100–199)
    informationResponse: {},
    // Redirects (300–399)
    redirect: {}
}
