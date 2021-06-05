import { IFastifyInstance } from '../../interfaces';
import getDailyQuotes from './get-daily-quotes';
import getLatestQuoteDate from './get-latest-quote-date';

export default async (fastify: IFastifyInstance) => {
  fastify.get('/daily-quotes', async () => getDailyQuotes(fastify));
  fastify.get('/daily-quotes/latest-quote-date', async () => getLatestQuoteDate(fastify));
};
