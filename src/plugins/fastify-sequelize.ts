import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import { DataTypes, Sequelize } from 'sequelize';
import dbConfig from '../db-config';
import dailyQuoteDefinition from '../model-definitions/daily-quote-definition';
import trendFollowingDefinition from '../model-definitions/trend-following-definition';

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

  sequelize.define('DailyQuote', dailyQuoteDefinition);
  sequelize.define('TrendFollowing', trendFollowingDefinition);
  
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
