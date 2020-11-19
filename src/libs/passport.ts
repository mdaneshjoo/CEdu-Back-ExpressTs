import * as passport from "passport";
import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt";
import config from "../config";
import eMessages from "../utils/statics/eMessages";
import User from "../models/user.model";
import {sendError} from "../utils/helpers/response";

class Passport {
    constructor() {
        this.jwt()
    }

    private jwt() {
        let opts = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.secret
        };
       passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
            User.findByPk(jwt_payload.id).then(user => {
                if (user) return done(null, user.display())
                return done(eMessages.notAuthorized, false)
            }).catch(e => {
                return done(eMessages.notAuthorized, false)
            })

        }));

    }

    public initialize(){
        return passport.initialize()
    }

    public token(req,res,next){
        passport.authenticate('jwt',{session: false})(req,res,next)
    }

}

const pas=new Passport()
export default pas