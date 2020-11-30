import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";
import { REQUEST_STATUS_ENUM } from "../Constants";

export default class Requests extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        requesterId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        typeOfRequest: {
          type: DataTypes.STRING,
        },
        typeId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM(...REQUEST_STATUS_ENUM),
          allowNull: false,
        },

        updatedBy: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        ...super.baseFields,
      },
      {
        sequelize,
        hooks: {},
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User,{
      foreignKey:'userId',
      as:'user'
    })
  }
}
