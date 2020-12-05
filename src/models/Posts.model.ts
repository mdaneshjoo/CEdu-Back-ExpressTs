import { DataTypes } from "sequelize";
import { v4 } from "uuid";
import BaseModel from "./Base.model";

export default class Posts extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        channelId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        video: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        disc: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        // no need becuase of id is uuid now if not you should user this to make url
        post_uuid: {
          type: DataTypes.UUID,
          allowNull: false,
          unique: true,
          defaultValue: v4(),
        },

        haveAttachment: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        attachment_uuid: {
          type: DataTypes.UUID,
          unique: true,
        },
        isquiz: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        quizId: {
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
    this.belongsTo(models.Channels, {
      foreignKey: "channelId",
      as: "channel",
    });
    this.hasMany(models.Comments, {
      foreignKey: "postId",
      as: "comments",
    });
  }
}
