import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";

export default class GroupMessages extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        groupId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        massgeSenderId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        isquiz: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        quizId: {
          type: DataTypes.UUID,
        },
        message: {
          type: DataTypes.TEXT,
        },
        message_uuid: {
          type: DataTypes.UUID,
        },
        haveAttachment: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        attachment_uuid: {
          type: DataTypes.UUID,
        },
        deletedBy: {
          type: DataTypes.UUID,
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
    this.belongsTo(models.Groups, {
      foreignKey: "groupId",
      as: "groups",
    });
  }
}
