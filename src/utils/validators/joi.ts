import Schemas from "./Schemas";
import * as Joi from 'joi'
import ServerError from "../../errors/serverError";
import JoivalidationError from "../../errors/JoivalidationError";
import {eMessages} from "../constants/eMessages";

/**
 * @classdesc this class is for validation objectes
 * */
export default class JoiValidator {
    Joi = Joi
    private schema = new Schemas()

    constructor() {
    }

    public authValidate(body: object) {
        const {value, error} = Joi.object(this.schema.authSchema).validate(body)
        if (error) throw new JoivalidationError(error)
        return value
    }

    /**
     * @param {string} body.password
     * @param {string} body.phoneNumber
     * @param {string} body.email
     * @return value - validated value if validation was ok
     * @throws error - validation error
     * */
    public authUpdateValidate(body) {
        const {value, error} = Joi.object(this.schema.updateAuth).validate(body)
        if (error) throw new JoivalidationError(error)
        return value
    }


    public personalInfoValidator(body: object) {
        const {value, error} = Joi.object(this.schema.personalInfoSchema).validate(body)
        if (error) throw new JoivalidationError(error)

        return value
    }


}
