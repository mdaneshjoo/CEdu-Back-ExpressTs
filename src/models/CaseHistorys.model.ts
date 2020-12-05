import { DataTypes } from "sequelize";
import BaseModel from "./Base.model";

export default class CaseHistorys extends BaseModel {
  static init(sequelize) {
    return super.init(
      {
        ...super.uuidID,
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        isTeaching: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        institution: {
          type: DataTypes.STRING,
        },
        institutionId: {
          type: DataTypes.UUID,
        },
        startDate: {
          type: DataTypes.DATEONLY,
        },
        endDate: {
          type: DataTypes.DATEONLY,
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
      as: 'user',
      foreignKey: {
          allowNull: false,
          name: 'userId'
      }
  })
  }
}
