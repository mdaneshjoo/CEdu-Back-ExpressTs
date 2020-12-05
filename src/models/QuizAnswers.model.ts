import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";

export default class QuizAnswers extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        qId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        responderId: {
          type: DataTypes.UUID,
        },
        answers: {
          type: DataTypes.STRING,
        },
        isTrue: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
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
    this.belongsTo(models.Questions, {
      foreignKey: "qId",
      as: "question",
    });
  }
}
