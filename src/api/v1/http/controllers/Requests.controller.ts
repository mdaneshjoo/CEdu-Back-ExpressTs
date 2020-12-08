import { Request, Response, Router } from "express";
import IController from "../../../../interfaces/controller.interface";


export default class RequestsController implements IController {
    router = Router()
    constructor() {
        this.init()
    }
    init() { }

}