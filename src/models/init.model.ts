import User from './user.model'
import PersonalInfo from "./personal-info.model";
export default class ModelInit{
    constructor(seqeulize){
        this.initModels(seqeulize)
    }
    private initModels(seqeulize) {
        const models = {
            User:User.init(seqeulize),
            PersonalInfo:PersonalInfo.init(seqeulize)
            // more models here .........
        }
        for (const key in models) {
            const model = models[key];
            typeof model.associate === "function" && model.associate(models);
        }
    }
}