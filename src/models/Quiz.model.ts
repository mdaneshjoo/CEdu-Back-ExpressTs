import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import BaseModel from "./Base.model";

export default class Posts extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
        },
        uuid: {
          type: DataTypes.UUID,
          defaultValue: v4(),
          unique: true,
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
      foreignKey: "userId",
      as: "user",
    });
    this.hasMany(models.Questions, {
      foreignKey: "quizId",
      as: "questions",
    });
  }
}
