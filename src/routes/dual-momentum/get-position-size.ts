import * as R from 'ramda';
import { Op } from 'sequelize';
import { IFastifyInstance } from '../../interfaces';

// https://school.stockcharts.com/doku.php?id=technical_indicators:average_true_range_atr

export default async (fastify: IFastifyInstance) => {
  const length = 20;
  const dailyQuotes = await fastify.db?.models['DailyQuote'].findAll({
    attributes: ['StockCode', 'QuoteDate', 'OpenPrice', 'HighPrice', 'LowPrice', 'ClosePrice', 'Volume', 'Value'],
    where: {
      StockCode: {
        [Op.eq]: '^PSEi',
      },
    },
    order: [
      ['QuoteDate', 'desc'],
    ],
    limit: length + 2,
  });
  const sortedQuotes = R.reverse(dailyQuotes ?? []);
  const ranges = sortedQuotes.reduce(
    (value, quote, index) => {
      if (index === 0) return value;
      
      const { currentAtr, priorAtr, trueRanges } = value;
      const currentTr = Math.max(
        quote.getDataValue('HighPrice') - quote.getDataValue('LowPrice'),
        Math.abs(quote.getDataValue('HighPrice') - sortedQuotes[index - 1].getDataValue('ClosePrice')),
        Math.abs(quote.getDataValue('LowPrice') - sortedQuotes[index - 1].getDataValue('ClosePrice')),
      );
      return {
        currentAtr: index === length + 1 ? ((priorAtr * (length - 1)) + currentTr) / length : currentAtr,
        priorAtr: index === length ? R.sum(R.concat(trueRanges, [currentTr])) / length : priorAtr,
        trueRanges: R.concat(trueRanges, [currentTr]),
      };
    },
    {
      currentAtr: 0,
      priorAtr: 0,
      trueRanges: [] as number[],
    },
  );
  return ranges;
};
