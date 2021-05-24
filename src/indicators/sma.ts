import * as R from 'ramda';

export default (prices: number[]) => ({
  length: prices.length,
  value: R.sum(prices) / prices.length,
});
