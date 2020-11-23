import {CreateOptions, DataTypes, InstanceUpdateOptions, Op} from 'sequelize'
import BaseModel from './base.model';
import {HookReturn} from "sequelize/types/lib/hooks";
import {Hash} from "../libs/hash";
import PersonalInfo from "./personal-info.model";
import {Cy, cypher} from "../libs/Neo4j";
import ServerError from "../errors/serverError";


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
            isPrivate: {
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
                    return cypher
                        .createNode('user', 'User', {...user.display()})
                        .return('user')
                        .run()
                        .then(res => {
                        })
                        .catch(e => {
                            console.log(e)
                        })
                },
                afterUpdate(user: User, options: CreateOptions): HookReturn {
                    return new Cy()
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

    id = this.get('id')

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

    static _findOrCreate(userName: string, body: object): Promise<any> {
        return User.findOrCreate({
            where: {
                userName
            }
            , defaults: {...body}
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
    }

}
