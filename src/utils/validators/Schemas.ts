import * as Joi from 'joi'

export default class Schemas {
    private _authSchema = {
        userName: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),


        email: Joi.string()
            .email({minDomainSegments: 2}),

        phoneNumber: Joi.string()
    }

    get authSchema() {
        return this._authSchema
    }

    set authSchema(schema: any) {
        this._authSchema = schema
    }


    private _personalInfoSchema = {
        name: Joi.string(),
        lastName: Joi.string(),
    }

    get personalInfoSchema() {
        return this._personalInfoSchema
    }
    set personalInfoSchema(schema: any) {
        this._personalInfoSchema = schema
    }

}
