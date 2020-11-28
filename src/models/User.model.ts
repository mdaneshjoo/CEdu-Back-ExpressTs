import {CreateOptions, DataTypes, InstanceUpdateOptions, Op, Transactionable} from 'sequelize'
import BaseModel from './Base.model';
import {HookReturn} from "sequelize/types/lib/hooks";
import {Hash} from "../libs/hash";
import PersonalInfo from "./Personal-info.model";
import {Neo4j, cypher} from "../libs/Neo4j";
import ServerError from "../errors/serverError";
import {node, relation} from "cypher-query-builder";
import Subscriber_Channel from "./Subscriber-channel.model";
import Channel from "./Channel.model";
import {ValidationOptions} from "sequelize/types/lib/instance-validator";


export default class User extends BaseModel {
    static init(sequelize) {
        return super.init({
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
        this.hasOne(models.Channel, {
            as: 'channel',
            foreignKey: {
                allowNull: false,
                name: 'ownerId'
            }
        })
        this.belongsToMany(models.Channel, {
            through: 'Subscriber_Channel',
            as: 'subscribedChannels',
            foreignKey: 'subscriberId'

        })
    }

}
