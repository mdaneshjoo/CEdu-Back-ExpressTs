import {CreateOptions, DataTypes, InstanceUpdateOptions, Op, Transactionable} from 'sequelize'
import BaseModel from './Base.model';
import {HookReturn} from "sequelize/types/lib/hooks";
import {Hash} from "../libs/hash";
import PersonalInfo from "./Personal-info.model";
import {Neo4j, cypher} from "../libs/Neo4j";


export default class User extends BaseModel {
    static init(sequelize) {
        return super.init({
         ...super.uuidID,
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            googleId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                unique: true
            },
            isUni: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            ...super.baseFields,

        }, {
            sequelize,
            hooks: {
                beforeCreate(user: User, options) {
                    const password = user.get('password').toString()
                    return new Hash().hashPasword(password).then(hasedPass => {
                        user.set('password', hasedPass)
                    })
                },
                beforeUpdate(user, options: InstanceUpdateOptions): HookReturn {
                    const password = user.get('password').toString()
                    return new Hash().hashPasword(password).then(hasedPass => {
                        user.set('password', hasedPass)
                    })
                },
                afterCreate(user: User, options: CreateOptions): HookReturn {
                    return Promise.all([
                        cypher
                            .createNode('user', 'User', {...user.display()})
                            .run(),
                        //
                    ]).then(res => {
                    })
                        .catch(e => {
                            console.log(e)
                        })


                },
                afterUpdate(user: User, options: CreateOptions): HookReturn {
                    return new Neo4j()
                        .updateVar('user', 'User',
                            {id: user.get('id')},
                            {...user.grapgAttr()})
                        .then(res => {
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
            }
        });
    }

    readonly id = this.get('id')

    static findByUsername(userName: string,): Promise<any> {
        return User.findOne({
            where: {
                userName
            },
            include: [
                {
                    model: PersonalInfo,
                    as: 'info'
                }
            ]
        })
    }

    static _findOrCreate(userName: string, body: object,): Promise<any> {
        return User.findOrCreate({
            where: {
                userName
            },
            defaults: {...body},
        })
    }

    display() {
        let user = {}
        const neededFileds = ['id', 'userName', 'email', 'phoneNumber', 'isUni', 'isPrivate']
        neededFileds.map(field => {
            user[field] = this.get(field)
        })
        return user
    }

    grapgAttr() {
        let user = {}
        const neededFileds = ['userName', 'email', 'phoneNumber', 'isUni', 'isPrivate']
        neededFileds.map(field => {
            user[field] = `'${this.get(field)}'`
        })
        return user
    }

    static associate(models) {
        this.hasOne(models.PersonalInfo, {
            as: 'info',
            foreignKey: {
                allowNull: false,
                name: 'userId'
            }
        })
        this.hasMany(models.Channels, {
            as: 'channels',
            foreignKey: {
                allowNull: false,
                name: 'ownerId'
            }
        })
        this.belongsToMany(models.Channels, {
            through: 'Subscriber_Channel',
            as: 'subscribedChannels',
            foreignKey: 'subscriberId'

        })

        this.hasMany(models.Groups, {
            as: 'groups',
            foreignKey: {
                allowNull: false,
                name: 'ownerId'
            }
        })
        this.belongsToMany(models.Groups, {
            through: 'Members_Group',
            as: 'joinedGroups',
            foreignKey: 'memberId'

        })

        this.hasMany(models.Requests, {
            as: 'requests',
            foreignKey: {
                allowNull: false,
                name: 'userId'
            }
        })
        this.hasMany(models.Notifications, {
            as: 'notifications',
            foreignKey: {
                allowNull: false,
                name: 'userId'
            }
        })
        this.hasMany(models.Settings, {
            as: 'settings',
            foreignKey: {
                allowNull: false,
                name: 'userId'
            }
        })
        this.hasMany(models.Attachments, {
            as: 'attached',
            foreignKey: {
                allowNull: false,
                name: 'userId'
            }
        })
        this.hasMany(models.CaseHistorys, {
            as: 'historys',
            foreignKey: {
                allowNull: false,
                name: 'userId'
            }
        })
        this.hasMany(models.Quiz, {
            as: 'quizzes',
            foreignKey: {
                allowNull: false,
                name: 'userId'
            }
        })
    }

}
