import { Request, Response, Router } from "express";
import Channels from "../../../models/Channels.model";
import IController from "../../../interfaces/controller.interface";
import { sendError, success } from "../../../utils/helpers/response";
import { createAndUpdateChannelBody } from "../../../middlewares/Channels/body.middleware"
import passport from "../../../libs/passport";
import User from "../../../models/User.model";
import { sMessages } from "../../../utils/constants/SMessages";
import ServerError from "../../../errors/serverError";
import { eMessages } from '../../../utils/constants/eMessages'



export default class ChannelsController implements IController {
    router = Router()
    constructor() {
        this.init()
    }
    init() {
        this.router.post('/create', passport.token, createAndUpdateChannelBody, this.createChannel)
        this.router.get('/list/:userName', this.getAllChannels)
        this.router.get('/list', passport.token, this.getOwneChannelList)
        this.router.put('/update/:channelId', passport.token, createAndUpdateChannelBody, this.updateChannel)
        this.router.delete('/remove/:channelId', passport.token, this.deleteChannel)

    }



    private createChannel({ body, user }: Request, res: Response) {
        Channels.create({
            ownerId: user['id'],
            ...body
        })
            .then(success(res))
            .catch(sendError(res))
    }

    private getAllChannels({ params }: Request, res: Response) {
        User.getUserChannelAndCount({ userName: params['userName'] }, { exclude: ['ownerId'] })
            .then(success(res))
            .catch(sendError(res))
    }

    private getOwneChannelList({ user }: Request, res: Response) {
        User.getUserChannelAndCount({ id: user['id'] })
            .then(success(res))
            .catch(sendError(res))
    }

    private updateChannel({ body, params, user }: Request, res: Response) {
        Channels.update({ ...body }, {
            where: {
                id: params.channelId,
                ownerId: user['id']
            }
        })
            .then(([number]) => {
                if (number) return number
                throw new ServerError(eMessages.UPDATE_UNABLE)
            })
            .then(success(res, sMessages.UPDATE_AUTH_OK))
            .catch(sendError(res))
    }


    private deleteChannel({ params, user }: Request, res: Response) {
        Channels.destroy({
            where: {
                id: params.channelId,
                ownerId: user['id']
            }

        }).then((number) => {
            if (number) return number
            throw new ServerError(eMessages.DELETE_UNABLE)
        })
            .then(success(res, sMessages.DELETE_OK))
            .catch(sendError(res))
    }



}