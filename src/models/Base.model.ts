import { Model, DataTypes,Sequelize } from "sequelize";

import {v4} from "uuid";

export default class BaseModel extends Model {
  static uuidID = {
     id: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:Sequelize.literal('uuid_generate_v4()')
    },
  };
  static baseFields = {
    // deletedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
  };
}
