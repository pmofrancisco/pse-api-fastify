import { DataTypes } from 'sequelize';

export default {
  StockCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  QuoteDate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OpenPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  HighPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  LowPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  ClosePrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  Volume: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  Value: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
};
