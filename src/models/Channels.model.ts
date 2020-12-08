import {CreateOptions, DataTypes, InstanceUpdateOptions} from 'sequelize'
import BaseModel from './Base.model';
import {HookReturn} from "sequelize/types/lib/hooks";
import PersonalInfo from "./Personal-info.model";


export default class Channels extends BaseModel {

    static init(sequelize) {
        return super.init({
            ...super.uuidID,
            ownerId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
            },
            isPrivate: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            ...super.baseFields,

        }, {
            sequelize,
            paranoid: true,
            timestamps:true,

            hooks: {
                async beforeCreate(channel: Channels, options) {
                    if (!channel.get('title')) channel.set('title', await channel.defaultTitle())
                },
                beforeUpdate(user: Channels, options: InstanceUpdateOptions): HookReturn {

                },
                afterCreate(user: Channels, options: CreateOptions): HookReturn {


                },
                afterUpdate(user: Channels, options: CreateOptions): HookReturn {

                },
                afterValidate(channel: Channels, options) {

                }
            }
        });
    }

    readonly id = this.get('id')
    readonly isPrivate = this.get('isPrivate')

    async defaultTitle() {
        const userId: any = this.get('ownerId')
        const userInfo = await PersonalInfo.findOne({
            where: {userId},
            raw: true
        })
        const defaultName = (userInfo && userInfo['lastName']) ? `${userInfo['lastName']}'s` : 'Untitled'
        return `${defaultName} Channel`
    }


    static associate(models) {
        this.belongsTo(models.User, {
            as: 'owner',
            foreignKey: {
                allowNull: false,
                name: 'ownerId'
            },
        })
        this.belongsToMany(models.User, {
            through: 'Subscriber_Channel',
            as: 'subscribers',
            foreignKey: 'channelId'
        })

        this.hasMany(models.Posts, {
            foreignKey: 'channelId',
            as: 'posts'
        })
    }

}
