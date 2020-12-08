import { ValidationError ,UniqueConstraintError, DatabaseError } from "sequelize";
import { eMessages, systemErrorMessages } from "../utils/constants/eMessages";
import config from "../configs/config";
import ServerError from "./serverError";
import { IErrorPropertys } from "../interfaces/errorMessages.interface";
import JoivalidationError from "./JoivalidationError";

/**
 * @classdesc this class is for handle errors by it types also if give an undefined error it will return not found error
 * */
export class HandelErrors {
    private errorProperty: IErrorPropertys

    constructor(private _Error) {
        this.noError(_Error)
        this.seqeulizeError(_Error)
        this.joiError(_Error)
        this.databaseError(_Error)
        // other error types in here
        this.syntaxError(_Error)
        this.defaultError(_Error)
        if (config.env === 'development') console.log(this._Error || this.errorProperty)

    }

    private defaultError(e) {
        if (e instanceof ServerError || e instanceof TypeError) return this.errorProperty = systemErrorMessages.default(e)
    }

    private seqeulizeError(e) {
        if (e instanceof ValidationError || e instanceof UniqueConstraintError ) {
            return this.errorProperty = systemErrorMessages.sequlizeValidationError(e)
        }
    }

    private noError(e) {
        if (!e) return this.errorProperty = eMessages.NOT_FOUND
    }

    private joiError(e) {
        if (e instanceof JoivalidationError) return this.errorProperty = eMessages.VALIDATE_JOI(e)
    }

    private syntaxError(e) {
        if (e instanceof SyntaxError) return this.errorProperty = systemErrorMessages.default(e)
    }
    
    private databaseError(e){
        if (e instanceof DatabaseError) return this.errorProperty = systemErrorMessages.dbError(e)
    }

    /**
     * you can make sure all type of error in here
     *
     * @example {
     *      code: 1001,
     *      statusCode: 404,
     *      message: not found
     * }
     * @return  error - return error like example
     **/
    public get properError() {
        return this.errorProperty
    }

}


