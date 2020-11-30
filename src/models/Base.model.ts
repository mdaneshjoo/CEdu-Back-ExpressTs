import { Model, DataTypes } from "sequelize";

import { v4 } from "uuid";

export default class BaseModel extends Model {
  static uuidID = {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: v4(),
    },
  };
  static baseFields = {
    deletedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  };
}
