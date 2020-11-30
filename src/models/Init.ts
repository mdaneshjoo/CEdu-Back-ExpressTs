import User from './User.model'
import PersonalInfo from "./Personal-info.model";
import Channel from "./Channels.model";
import Subscriber_Channel from "./Subscriber-channel.model";
import Posts from './Posts.model';
export default class ModelInit{
    constructor(seqeulize){
        this.initModels(seqeulize)
    }
    private initModels(seqeulize) {
        const models = {
            Channels:Channel.init(seqeulize),
            User:User.init(seqeulize),
            PersonalInfo:PersonalInfo.init(seqeulize),
            Subscriber_Channel:Subscriber_Channel.init(seqeulize),
            Posts:Posts.init(seqeulize)
            // more models here .........
        }
        for (const key in models) {
            const model = models[key];
            typeof model.associate === "function" && model.associate(models);
        }
    }
}
