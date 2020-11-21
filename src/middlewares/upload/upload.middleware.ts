import {Request,Response,NextFunction} from 'express'
import Multer from "../../libs/Multer";
import picMimeTypes from '../../utils/mimeTypes/onlyImages'

const multer =new Multer
export const uploadAvatar=(req:Request,res:Response)=>
       multer.uploadSingle('avatar','avatar',picMimeTypes)(req,res)

