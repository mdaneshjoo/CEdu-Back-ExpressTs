import {DataTypes} from 'sequelize'
import BaseModel from './base.model';


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
        });
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
