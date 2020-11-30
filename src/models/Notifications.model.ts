import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";

export default class Notifications extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        message: {
          type: DataTypes.STRING,
        },
        type: {
          type: DataTypes.STRING,
        },
        typeId: {
          type: DataTypes.UUID,
        },
        readStatus: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
    this.belongsTo(models.User, {
      as: 'users',
      foreignKey: {
          allowNull: false,
          name: 'userId'
      }
  })

  }
}
