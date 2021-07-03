import { DataTypes } from 'sequelize';

export default {
  StockCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SMA50: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  SMA100: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  ClosePrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  HighestClosePrice50: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  ClosePriceDiff: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  AverageValue50: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
};
