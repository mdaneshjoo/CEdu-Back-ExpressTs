import {Request, Response, Router} from 'express'
import IController from '../../../interfaces/controller.interface'
import PersonalInfo from "../../../models/personal-info.model";

/**
 * @classdesc this class used for control user personal info
 * */
export default class PersonalInfoController implements IController {
    router = Router()

    constructor() {
        this.init()
    }

    init(): void {
        this.router.post('/info', this.save)
    }

    /**
     * @api {post} /user/info Request for saving user info
     * @apiName save Personal info
     * @apiGroup user info
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
    private save({body,user}: Request, res: Response) {

        PersonalInfo.create({
            userId:user['id'],
            ...body
        })

    }


}
