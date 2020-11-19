import {DataTypes} from 'sequelize'
import BaseModel from './base.model';



export default class PersonalInfo extends BaseModel {
    static init(sequelize) {
        return super.init({
            userId: {
                type: DataTypes.INTEGER
            },
            name:DataTypes.STRING,
            lastName:DataTypes.STRING,
            avatar:DataTypes.STRING,
            ...super.baseFields,

        }, {
            sequelize,
        });
    }

    static associate(models){
      this.belongsTo(models.User,{
          as:'user',
          foreignKey:{
              allowNull:false,
              name:'userId'
          }
      })
    }

}
