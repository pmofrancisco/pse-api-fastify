import { IFastifyInstance } from '../../interfaces';
import getMomentumBySectors from './get-momentum-by-sectors';
import getPositionSize from './get-position-size';

export default async (fastify: IFastifyInstance) => {
  fastify.get('/dual-momentum/sectors', async () => getMomentumBySectors(fastify));
  fastify.get('/dual-momentum/position-size', async () => getPositionSize(fastify));
};
