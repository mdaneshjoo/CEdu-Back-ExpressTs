import {DataTypes} from 'sequelize'
import BaseModel from './Base.model';



export default class Subscriber_Channel extends BaseModel {
    static init(sequelize) {
        return super.init({
            subscriberId: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            channelId:{
                type: DataTypes.BIGINT,
                allowNull:false
            },
            ...super.baseFields,

        }, {
            sequelize
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
        this.belongsTo(models.Channel,{
            as:'channel',
            foreignKey:{
                allowNull:false,
                name:'channelId'
            }
        })
        this.belongsTo(models.User,{
            as:'subscriber',
            foreignKey:{
                allowNull:false,
                name:'subscriberId'
            }
        })
    }

}
