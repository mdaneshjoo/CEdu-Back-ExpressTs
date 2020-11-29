import User from "../models/User.model";
import { Server, Socket } from "socket.io";

export class SocketIo {
  private _IO: Server;

  public connect() {
    this.IO.on("connection", (listiner) => {
      console.log("ws connected");
      this.validateUsername(listiner);
      this.disconnect(listiner);
    });
  }

  public get IO() {
    return this._IO;
  }
  public set IO(IO: Server) {
    this._IO = IO;
  }

  private disconnect(socket: Socket) {
    socket.on("disconnect", () => {});
  }

  /**
   * @api {websocket} * Username Exist
   * @apiName username check
   * @apiParam {on} validateUserName Required
   * @apiParam {emit} userNameExist Required
   * @apiGroup Auth
   * @apiDescription check Username exist on db or not
   * @apiParamExample {json} send params
   *                  {
   *                      "userName":"foo",
   *                  }
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "userNameExist": ture or false
   *     }
   * @apiWebsocket ws://127.0.0.1:9000
   * 
   * 
   *
   */

  public validateUsername(socket: Socket) {
    socket.on("validateUserName", ({ userName }) => {
      if (userName) {
        User.findByUsername(userName).then((user) => {
          socket.emit("userNameExist", { userNameExist: user ? true : false });
        });
      }
    });
  }
}
