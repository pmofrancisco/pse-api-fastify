import { Model, Op } from 'sequelize';
import { IDailyQuote, IFastifyInstance } from '../../interfaces';

export default async (fastify: IFastifyInstance) => {
  const [latestQuoteDate] = await fastify.db?.models['DailyQuote'].findAll({
    attributes: ['QuoteDate'],
    where: {
      StockCode: {
        [Op.eq]: '^PSEi',
      },
    },
    order: [
      ['QuoteDate', 'desc'],
    ],
    limit: 1,
  }) as Model<IDailyQuote, any>[];
  return latestQuoteDate;
};
