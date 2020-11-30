import {CreateOptions, DataTypes, InstanceUpdateOptions, Op} from 'sequelize'
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
                //TODO test here
                type: DataTypes.STRING,
                set: (title) => {
                    if (!title) {
                        const userId: any = this.prototype.get('ownerId')
                        console.log(userId);
                        
                        PersonalInfo.findOne({
                            where:{userId},
                            raw:true
                        })
                            .then(user => {
                                console.log(user)
                                this.prototype.setDataValue('title',`${user['lastName']}'s Channel`)
                            })
                    }
                    this.prototype.setDataValue('title',title)
                }
            },
            isPrivate: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            ...super.baseFields,

        }, {
            sequelize,
            hooks: {
                beforeCreate(user: Channels, options) {

                },
                beforeUpdate(user: Channels, options: InstanceUpdateOptions): HookReturn {

                },
                afterCreate(user: Channels, options: CreateOptions): HookReturn {


                },
                afterUpdate(user: Channels, options: CreateOptions): HookReturn {

                }
            }
        });
    }

    id = this.get('id')

    display() {
        let user = {}
        const neededFileds = ['id']
        neededFileds.map(field => {
            user[field] = this.get(field)
        })
        return user
    }

    graphAttr() {
        let user = {}
        const neededFileds = ['id']
        neededFileds.map(field => {
            user[field] = `'${this.get(field)}'`
        })
        return user
    }

    static associate(models) {
        this.belongsTo(models.User, {
            as: 'owner',
            foreignKey: {
                allowNull: false,
                name: 'ownerId'
            }
        })
        this.belongsToMany(models.User, {
            through: 'Subscriber_Channel',
            as: 'subscribers',
            foreignKey: 'subscriberId'
        })

        this.hasMany(models.Posts,{
            foreignKey:'channelId',
            as:'posts'
        })
    }

}
