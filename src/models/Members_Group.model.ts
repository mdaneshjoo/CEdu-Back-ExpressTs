import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";

export default class Members_Group extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        memberId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        groupId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        deletedBy: {
          type: DataTypes.UUID,
        },
        ...super.baseFields,
      },
      {
        sequelize,
        paranoid: true,
            timestamps:true,
        hooks: {},
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Groups,{
      as:'group',
      foreignKey:{
          allowNull:false,
          name:'groupId'
      }
  })
  this.belongsTo(models.User,{
      as:'groupMember',
      foreignKey:{
          allowNull:false,
          name:'memberId'
      }
  })
  }
}
