import {Request, Response, Router} from 'express'
import IController from '../../../interfaces/controller.interface'
import User from "../../../models/user.model";
import {sendError, success} from "../../../utils/helpers/response";
import ServerError from "../../../errors/serverError";
import eMessages from "../../../utils/statics/eMessages";
import JWT from "../../../libs/JWT";

/**
 * @classdesc for login and signup
 * */
export default class AuthController implements IController {
    router = Router()

    constructor() {
        this.init()
    }

    init(): void {
        this.router.post('/login', this.login)
        this.router.post('/signup', this.signup)
    }

    /**
     * @api {post} /auth/login Request For Login
     * @apiName Login
     * @apiGroup AuthMiddleware
     *
     * @apiParam {String} userName Required
     * @apiParam {String} password Required
     * @apiParam {String} email
     * @apiParam {String} phoneNumber
     * @apiParamExample {json} login params
     *                  {
     *                      "userName":"foo",
     *                      "password":"bar"
     *                  }
     * @apiSuccess (200) {object} user User detail.
     * @apiSuccess (200) {String} token JWT Bearer Token.
     * @apiSuccessExample {json} Success-Response:
     *                      {
     *                          user:{
     *                              id:1,
     *                          },
     *                          token : <bearer-token>
     *                      }
     */
    private login({body}: Request, res: Response) {
        User.findByUsername(body.userName)
            .then(user => {
                if (!user) throw new ServerError(eMessages.notFound)
                return AuthController.makeResponse(user)
            })
            .then(success(res))
            .catch(sendError(res))
    }


    /**
     * @api {post} /auth/signup Request For register
     * @apiName Signup
     * @apiGroup AuthMiddleware
     *
     * @apiParam {String} userName Required
     * @apiParam {String} password Required
     * @apiParam {String} email
     * @apiParam {String} phoneNumber
     * @apiParamExample {json} signup params
     *                  {
     *                      "userName":"foo",
     *                      "password":"bar"
     *                  }
     * @apiSuccess (200) {object} user User detail.
     * @apiSuccess (200) {String} token JWT Bearer Token.
     * @apiSuccessExample {json} Success-Response:
     *                      {
     *                          user:{
     *                              id:1,
     *                          },
     *                          token : <bearer-token>
     *                      }
     */
    private signup({body}: Request, res: Response) {
        User._findOrCreate(body.userName, body)
            .then(([user, created]) => {
                if (!created) throw new ServerError(eMessages.userExist)
                if (user) {
                    return AuthController.makeResponse(user)
                }
            })
            .then(success(res))
            .catch(sendError(res))


    }

    //TODO make controller for update user
    //TODO make controller with socket for validate user exist when typing


    /**
     * make response object with koken and user detail exept password
     * @param {User} user - user instance
     * @param {any} meta - add extra field
     * @return object - returns object two property user and token
     * */
    private static makeResponse(user: User,meta=null): object {
        return {
            user: user.display(),
            meta,
            token: JWT.getToken(<number>user.id)
        }
    }
}
