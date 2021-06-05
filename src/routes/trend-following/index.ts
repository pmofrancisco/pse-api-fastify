import { IFastifyInstance } from '../../interfaces';
import getWatchList from './get-watch-list';

export default async (fastify: IFastifyInstance) => {
  fastify.get('/trend-following/watch-list', async () => getWatchList(fastify));
};
