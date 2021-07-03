import { Op } from 'sequelize';
import { IFastifyInstance } from '../../interfaces';

export default async (fastify: IFastifyInstance) => {
  return await fastify.db?.models['TrendFollowing'].findAll({
    attributes: ['StockCode', 'SMA50', 'SMA100', 'ClosePrice', 'HighestClosePrice50', 'ClosePriceDiff', 'AverageValue50'],
    order: [
      ['ClosePriceDiff', 'asc'],
    ],
  });
};
