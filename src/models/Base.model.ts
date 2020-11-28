import {Model, DataTypes} from 'sequelize'
import {date} from "joi";
import * as moment from 'moment'

export default class BaseModel extends Model {
    static baseFields = {
        deletedAt:{
            type:DataTypes.DATEONLY,
            allowNull:true
        },
        createdAt:{
            type:DataTypes.DATEONLY,
            allowNull: false,
        } ,
        updatedAt:{
            type:DataTypes.DATEONLY,
            allowNull: false,
        }
    }
}
