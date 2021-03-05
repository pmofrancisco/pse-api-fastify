import fastify from 'fastify';
import fastifySequelize from './plugins/fastify-sequelize';
import dualMomentumRoute from './routes/dual-momentum';

const server = fastify({ logger: true });

server.register(fastifySequelize).ready();
server.register(dualMomentumRoute);

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
