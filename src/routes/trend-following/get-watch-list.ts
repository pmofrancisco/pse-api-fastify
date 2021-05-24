import * as R from 'ramda';
import { Model, Op } from 'sequelize';
import sma from '../../indicators/sma';
import { IDailyQuote, IFastifyInstance, ITrend } from '../../interfaces';
import getDateRange from '../../utils/get-date-range';

export default async (fastify: IFastifyInstance) => {
  const { startDate, endDate } = await getDateRange(fastify, 150);
  const dailyQuoteModels = await fastify.db?.models['DailyQuote'].findAll({
    attributes: ['StockCode', 'ClosePrice'],
    where: {
      QuoteDate: {
        [Op.between]: [startDate, endDate],
      },
    },
  }) as Model<IDailyQuote, any>[];
  const dailyQuotes: IDailyQuote[] = dailyQuoteModels.map((quoteMode) => quoteMode.get({ plain: true }));
  const stockCodes = R.uniq(dailyQuotes.map(({ StockCode }) => StockCode));
  const trends = stockCodes.map((StockCode) => {
    const quotes = R.reverse(R.filter(R.propEq('StockCode', StockCode), dailyQuotes));
    const { value: SMA20 } = sma(R.slice(0, 20, quotes.map(({ ClosePrice }) => ClosePrice)));
    const { value: SMA50 } = sma(R.slice(0, 50, quotes.map(({ ClosePrice }) => ClosePrice)));
    const { value: SMA100 } = sma(R.slice(0, 100, quotes.map(({ ClosePrice }) => ClosePrice)));
    return { StockCode, SMA20, SMA50, SMA100 } as ITrend;
  });
  return R.filter(({ SMA20, SMA50, SMA100 }) => SMA20 > SMA50 && SMA50 > SMA100, trends);
};
