import { FastifyInstance } from 'fastify';
import { Sequelize } from 'sequelize';

export interface IFastifyInstance extends FastifyInstance {
  db?: Sequelize
}
