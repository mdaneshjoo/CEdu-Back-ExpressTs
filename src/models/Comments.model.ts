import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";

export default class Comments extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        postId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        commentOwner: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        comment: {
          type: DataTypes.TEXT,
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
    this.belongsTo(models.Posts, {
      foreignKey: "postId",
      as: "post",
    });
  }
}
