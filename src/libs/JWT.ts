import * as jwt from "jsonwebtoken";
import config from "../configs/config";

export default class JWT {
    /**
     * @param {number} id id of user 
     * @param {object} args extra data assined to token az meta data {meta:{username:'foo}}
     * @return {string} token
     */
    public static getToken(id: number, args?: object) {
        return jwt.sign({id, meta: args}, config.secret, {expiresIn: config.JWTexp});
    }
}
