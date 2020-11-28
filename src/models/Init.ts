import User from './User.model'
import PersonalInfo from "./Personal-info.model";
import Channel from "./Channel.model";
import Subscriber_Channel from "./Subscriber-channel.model";
export default class ModelInit{
    constructor(seqeulize){
        this.initModels(seqeulize)
    }
    private initModels(seqeulize) {
        const models = {
            User:User.init(seqeulize),
            PersonalInfo:PersonalInfo.init(seqeulize),
            Channel:Channel.init(seqeulize),
            Subscriber_Channel:Subscriber_Channel.init(seqeulize)
            // more models here .........
        }
        for (const key in models) {
            const model = models[key];
            typeof model.associate === "function" && model.associate(models);
        }
    }
}
