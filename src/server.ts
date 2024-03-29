import fastify from 'fastify';
import fastifySequelize from './plugins/fastify-sequelize';
import dailyQuotesRoute from './routes/daily-quotes';
import dualMomentumRoute from './routes/dual-momentum';
import trendFollowingRoute from './routes/trend-following';

const server = fastify({ logger: true });

server.register(fastifySequelize).ready();
server.register(dailyQuotesRoute);
server.register(dualMomentumRoute);
server.register(trendFollowingRoute);

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
