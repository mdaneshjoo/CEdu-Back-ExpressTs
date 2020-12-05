import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";

export default class Groups extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        ownerId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        groupName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isPrivate: {
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
    this.belongsTo(models.User, {
      as: "user",
      foreignKey: {
        allowNull: false,
        name: "ownerId",
      },
    });
    this.belongsToMany(models.User, {
      through: "Members_Group",
      as: "groupMember",
      foreignKey: "subscriberId",
    });
    this.hasMany(models.GroupMessages, {
      foreignKey: "groupId",
      as: "messages",
    });
  }
}
