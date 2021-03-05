import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { DataTypes, Sequelize } from 'sequelize';
import dbConfig from '../db-config';

const fastifySequelize = async (fastify: FastifyInstance) => {
  const instance = 'db';
  
  const sequelize = new Sequelize(dbConfig.name ?? '', dbConfig.username ?? '', dbConfig.password ?? '', {
    host: dbConfig.host ?? '',
    dialect: 'mssql',
    dialectOptions: {
      options: { instanceName: "SQLEXPRESS" }
    },
    define: {
      freezeTableName: true,
    }
  });

  sequelize.define('DailyQuote', {
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
  });
  
  decorate();
  
  return Promise.resolve();

  function decorate () {
    fastify.decorate(instance, sequelize);
    fastify.addHook('onClose', () => {
      sequelize.close();
    });
  };

};

export default fastifyPlugin(fastifySequelize);
