import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";

export default class Questions extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        quizId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        question: {
          type: DataTypes.STRING,
        },
        answers: {
          type: DataTypes.STRING,
        },
        needText: {
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
    this.belongsTo(models.Quiz, {
      foreignKey: "quizId",
      as: "quiz",
    });
    this.hasMany(models.QuizAnswers, {
      foreignKey: "qId",
      as: "answers",
    });
  }
}
