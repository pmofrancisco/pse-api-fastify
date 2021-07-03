import { IFastifyInstance } from '../../interfaces';
import getWatchList from './get-watch-list';
import getTrendFollowing from './get-trend-following';

export default async (fastify: IFastifyInstance) => {
  fastify.get('/trend-following', async () => getTrendFollowing(fastify));
  fastify.get('/trend-following/watch-list', async () => getWatchList(fastify));
};
