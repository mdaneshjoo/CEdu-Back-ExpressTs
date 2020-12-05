import {DataTypes} from 'sequelize'
import BaseModel from './Base.model';
export default class Subscriber_Channel extends BaseModel {
    static init(sequelize) {
        return super.init({
            ...super.uuidID,
            subscriberId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            channelId:{
                type: DataTypes.UUID,
                allowNull:false
            },
            ...super.baseFields,

        }, {
            sequelize,
            paranoid: true,
            timestamps:true,
        });
    }

    static associate(models) {
        this.belongsTo(models.Channels,{
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
