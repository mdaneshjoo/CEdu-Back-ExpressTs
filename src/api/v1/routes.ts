import AuthController from './controllers/auth.controller'
import InitialRoute from './initial.route'
import passport from "../../libs/passport";
import PersonalInfoController from "./controllers/personal-info.controller";


const router = new InitialRoute({
    route: [
        {path: '/auth', controller: new AuthController(), middleware: []},
        {path: '/user', controller: new PersonalInfoController(), middleware: [passport.token]},
    ]
}).router


export default router


