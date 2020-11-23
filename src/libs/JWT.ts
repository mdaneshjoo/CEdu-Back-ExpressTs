import * as jwt from "jsonwebtoken";
import config from "../configs/config";

export default class JWT {
    public static getToken(id: number, args?: object) {
        return jwt.sign({id, meta: args}, config.secret, {expiresIn: config.JWTexp});
    }
}
