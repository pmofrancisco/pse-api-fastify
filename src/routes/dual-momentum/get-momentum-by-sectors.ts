import { Op } from 'sequelize';
import { IFastifyInstance } from '../../interfaces';
import getQuoteDates from './get-quote-dates';

// http://www.followingthetrend.com/stocks-on-the-move-figures-and-charts/

export default async (fastify: IFastifyInstance) => {
  const [startDate, endDate] = await getQuoteDates(fastify);
  const dailyQuotes = await fastify.db?.models['DailyQuote'].findAll({
    attributes: ['StockCode', 'QuoteDate', 'OpenPrice', 'HighPrice', 'LowPrice', 'ClosePrice'],
    where: {
      StockCode: {
        //[Op.in]: ['^FINANCIAL', '^HOLDING', '^INDUSTRIAL', '^MINING-OIL', '^PROPERTY', '^PSEi', '^SERVICE'],
        [Op.in]: ['^FINANCIAL'],
      },
      QuoteDate: {
        [Op.between]: [startDate, endDate],
      },
    },
  });
  return dailyQuotes;
};
