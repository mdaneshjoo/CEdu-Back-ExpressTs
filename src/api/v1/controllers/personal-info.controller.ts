import {Request, Response, Router} from 'express'
import IController from '../../../interfaces/controller.interface'
import PersonalInfo from "../../../models/personal-info.model";
import Multer from "../../../libs/Multer";
import personalInfoBody from "../../../middlewares/personal-info/saveValidator.middleware";
import {uploadAvatar} from "../../../middlewares/upload/upload.middleware";
import picMimeTypes from '../../../utils/mimeTypes/onlyImages'


/**
 * @classdesc this class used for control user personal info
 * */
export default class PersonalInfoController implements IController {
    router = Router()
    // private multer=new Multer()
    constructor() {
        this.init()
    }

    init(): void {
        this.router.post('/info', uploadAvatar,personalInfoBody, this.save)
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
    private save(req:Request, res: Response) {
        const {body, user, file}= req
        // file.
        PersonalInfo.create({
            userId: user['id'],
            // avatar,
            ...body
        })

    }


}
