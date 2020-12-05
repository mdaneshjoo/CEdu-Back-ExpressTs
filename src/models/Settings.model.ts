import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";

export default class Settings extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        //   add setting model here
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
