import { Op } from 'sequelize';
import { IFastifyInstance } from '../../interfaces';
import getDateRange from '../../utils/get-date-range';

export default async (fastify: IFastifyInstance) => {
  const { startDate, endDate } = await getDateRange(fastify, 200);
  return await fastify.db?.models['DailyQuote'].findAll({
    attributes: ['StockCode', 'QuoteDate', 'OpenPrice', 'HighPrice', 'LowPrice', 'ClosePrice', 'Volume', 'Value'],
    where: {
      QuoteDate: {
        [Op.between]: [startDate, endDate],
      },
    },
  });
};
