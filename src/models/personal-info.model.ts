import {CreateOptions, DataTypes} from 'sequelize'
import BaseModel from './base.model';
import {HookReturn} from "sequelize/types/lib/hooks";
import {cypher, Cy} from "../libs/Neo4j";
import {node} from "cypher-query-builder";
import {assert} from "joi";


export default class PersonalInfo extends BaseModel {
    static init(sequelize) {
        return super.init({
            userId: {
                type: DataTypes.INTEGER
            },
            name: DataTypes.STRING,
            lastName: DataTypes.STRING,
            avatar: DataTypes.STRING,
            ...super.baseFields,

        }, {
            sequelize,
            hooks: {
                afterCreate(info: PersonalInfo, options: CreateOptions): HookReturn {
                    // TODO make here clean and test
                    return cypher.matchNode('user', 'User')
                        .where({user: {id: info.get('userId')}})
                        .return('user')
                        .run()
                        .then(res => {
                            if (res.length)
                                cypher
                                    .matchNode('info', 'User')
                                    .where({info: {id: info.get('userId')}})
                                    .setValues({info: {...Object.assign({}, info.graphAttr(), res[0]['user'].properties)}})
                                    .run()
                        })
                        .catch(e => {
                            console.log(e)
                        })
                },
                afterUpdate(info: PersonalInfo, options: CreateOptions): HookReturn {
                    return new Cy().updateVar('info', 'User',
                        {
                            id: info.get('userId')
                        }, {
                            ...info.graphAttr()
                        })
                        .then(res=>{})
                        .catch(e=>{
                            console.log(e)
                        })
                }
            }
        });
    }

    graphAttr() {
        let info = {}
        const neededFileds = ['name', 'lastName', 'avatar']
        neededFileds.map(field => {
            // put in '' because cypher complain about data without ''
            info[field] = `'${this.get(field)}'`
        })
        return info
    }

    static _CreateOrUpdate(userId: string, body: object, returnFound: boolean = false): Promise<any> {
        return PersonalInfo.findOrCreate({
            where: {
                userId
            },
            defaults: {...body}
        }).then(([personalInfo, created]) => {
            const personalInfoOldData = personalInfo.toJSON();
            if (!created)
                return personalInfo.update({...body}).then(updatedDate => {
                    if (returnFound) return [
                        personalInfoOldData,
                        updatedDate
                    ]
                    return updatedDate
                })
            return personalInfo
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: {
                allowNull: false,
                name: 'userId'
            }
        })
    }

}
