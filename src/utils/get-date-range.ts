import moment from 'moment';
import * as R from 'ramda';
import { Op } from 'sequelize';
import { IFastifyInstance } from '../interfaces';

export default async (fastify: IFastifyInstance, limit: number) => {
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
    limit,
  });
  const startDate = R.last(quoteDates ?? []);
  const endDate = R.head(quoteDates ?? []);
  return {
    startDate: moment(startDate?.getDataValue('QuoteDate')).format('YYYY-MM-DD'),
    endDate: moment(endDate?.getDataValue('QuoteDate')).format('YYYY-MM-DD'),
  };
};