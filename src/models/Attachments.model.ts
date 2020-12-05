import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import BaseModel from "./Base.model";

export default class Attachments extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        fileUuid: {
          type: DataTypes.UUID,
          defaultValue: v4(),
        },
        address: {
          type: DataTypes.STRING,
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
    this.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
          allowNull: false,
          name: 'userId'
      }
  })
  }
}
