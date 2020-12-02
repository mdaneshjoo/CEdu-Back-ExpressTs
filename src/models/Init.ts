// models
import User from './User.model'
import PersonalInfo from "./Personal-info.model";
import Channel from "./Channels.model";
import Subscriber_Channel from "./Subscriber-channel.model";
import Posts from './Posts.model';
import Attachments from './Attachments.model';
import CaseHistorys from './CaseHistorys.model';
import Comments from './Comments.model';
import GroupMessages from './GroupMessages.model';
import Groups from './Groups.model';
import Members_Group from './Members_Group.model';
import Notifications from './Notifications.model';
import Questions from './Questions.mode';
import Quiz from './Quiz.model';
import QuizAnswers from './QuizAnswers.model';
import Requests from './Requests.model';
import Settings from './Settings.model';


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
            Posts:Posts.init(seqeulize),
            Attachments:Attachments.init(seqeulize),
            CaseHistorys:CaseHistorys.init(seqeulize),
            Comments:Comments.init(seqeulize),
            GroupMessages:GroupMessages.init(seqeulize),
            Groups:Groups.init(seqeulize),
            Members_Group:Members_Group.init(seqeulize),
            Notifications:Notifications.init(seqeulize),
            Questions:Questions.init(seqeulize),
            QuizAnswers:QuizAnswers.init(seqeulize),
            Quiz:Quiz.init(seqeulize),
            Requests:Requests.init(seqeulize),
            Settings:Settings.init(seqeulize),
            // more models here .........
        }
        for (const key in models) {
            const model = models[key];
            typeof model.associate === "function" && model.associate(models);
        }
    }
}
