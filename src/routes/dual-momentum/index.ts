import { IFastifyInstance } from '../../interfaces';
import getMomentumBySectors from './get-momentum-by-sectors';
import getQuoteDates from './get-quote-dates';

export default async (fastify: IFastifyInstance) => {
  fastify.get('/dual-momentum/sectors', async () => getMomentumBySectors(fastify));
};
