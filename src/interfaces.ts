import { FastifyInstance } from 'fastify';
import { Sequelize } from 'sequelize';

export interface IDailyQuote extends IStockCode {
  ClosePrice: number;
  HighPrice: number;
  LowPrice: number;
  OpenPrice: number;
  QuoteDate: Date;
  Value: number;
  Volume: number;
};

export interface IFastifyInstance extends FastifyInstance {
  db?: Sequelize;
};

export interface IStockCode {
  StockCode: string;
};

export interface ITrend extends IStockCode {
  SMA20: number;
  SMA50: number;
  SMA100: number;
};
