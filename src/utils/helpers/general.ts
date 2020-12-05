import * as fs from 'fs'
import ServerError from "../../errors/serverError";


export const deleteFile = (file) => {
    try {
        if (fs.existsSync(file)) fs.unlinkSync(file)
    } catch (e) {
        throw new ServerError(e)
    }
}