export default class ServerError extends Error{
    code
    constructor(code,message){
        super(message)
        this.code=code
    }
}