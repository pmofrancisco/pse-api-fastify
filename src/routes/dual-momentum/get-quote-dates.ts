import moment from 'moment';
import * as R from 'ramda';
import { Op } from 'sequelize';
import { IFastifyInstance } from '../../interfaces';

export default async (fastify: IFastifyInstance) => {
  const quoteDates = await fastify.db?.models['DailyQuote'].findAll({
    attributes: ['QuoteDate'],
    where: {
      StockCode: {
        [Op.eq]: '^PSEi',
      },
    },
    order: [
      ['QuoteDate', 'desc'],
    ],
    limit: 90,
  });
  const start = R.last(quoteDates ?? []);
  const last = R.head(quoteDates ?? []);
  return [
    moment(start?.getDataValue('QuoteDate')).format('YYYY-MM-DD'),
    moment(last?.getDataValue('QuoteDate')).format('YYYY-MM-DD'),
  ];
};
