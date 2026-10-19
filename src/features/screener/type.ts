type Num = number | null;

export type Stock = {
  instrument: string;
  sector: string;

  // price
  lastPrice: Num;
  open: Num;
  dayHigh: Num;
  dayLow: Num;
  previousClose: Num;
  averagePrice: Num;
  change: Num;
  changePercent: Num;
  upperCircuit: Num;
  lowerCircuit: Num;
  week52High: Num;
  week52Low: Num;

  // trading
  volume: Num;
  buyQuantity: Num;
  sellQuantity: Num;
  tradeValueCr: Num;

  // fundamentals
  marketCapCr: Num;
  peRatio: Num;
  roe: Num;
  debtToEquity: Num;
  dividendYield: Num;
  freeCashFlow: Num;
  profitGrowthYoY: Num;
  revenueGrowthYoY: Num;
};
