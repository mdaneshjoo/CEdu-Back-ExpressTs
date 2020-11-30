import {CreateOptions, DataTypes} from 'sequelize'
import BaseModel from './Base.model';
import {HookReturn} from "sequelize/types/lib/hooks";
import { Neo4j} from "../libs/Neo4j";
import ServerError from "../errors/serverError";


export default class PersonalInfo extends BaseModel {
    static init(sequelize) {
        return super.init({
            ...super.uuidID,

            userId: {
                type: DataTypes.UUID
            },
            name: {
                type:DataTypes.STRING,
                allowNull:false
            },
            lastName: {
                type:DataTypes.STRING,
                allowNull:false
            },
            avatar: {
                type:DataTypes.STRING,
                defaultValue:'/constants/images/default-avatar.png'
            },
            ...super.baseFields,

        }, {
            sequelize,
            hooks: {
                afterCreate(info: PersonalInfo, options: CreateOptions): HookReturn {
                    const neo4j = new Neo4j()
                    return neo4j.findAllNode('user', 'User',
                        {user: {id: info.get('userId')}},
                        'user'
                    ).then(res => {
                        return neo4j.updateValue('info', 'User',
                            {info: {id: info.get('userId')}},
                            {info: {...Object.assign({}, info.graphAttr(), res[0]['user'].properties)}}
                        )
                    }).then(res => {
                    }).catch(e => {
                        new ServerError(e)
                    })
                },
                afterUpdate(info: PersonalInfo, options: CreateOptions): HookReturn {
                    return new Neo4j().updateVar('info', 'User',
                        {
                            id: info.get('userId')
                        }, {
                            ...info.graphAttr()
                        })
                        .then(res => {
                        })
                        .catch(e => {
                            new ServerError(e)
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
