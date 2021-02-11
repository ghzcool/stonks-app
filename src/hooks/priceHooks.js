import { BehaviorSubject } from "rxjs";
import { hookFromSubject } from "./index";

let savedPrices = {};
const savedPricesString = localStorage.getItem('prices');
if (savedPricesString) {
  try {
    savedPrices = JSON.parse(savedPricesString);
  } catch (e) {
    console.error(e);
  }
}

export const pricesSubject = new BehaviorSubject(savedPrices);
export const usePrices = hookFromSubject(pricesSubject);
export const getPrices = () => {
  const stocks = stocksSubject.getValue();
  if (stocks.length) {
    const symbols = {};
    stocks.forEach(item => {
      symbols[item.symbol] = true;
    });
    return fetch(new Request('/api/prices/' + Object.keys(symbols).join(',') + '?t=' + new Date().getTime()))
      .then(async (response) => {
        try {
          const prices = await response.json();
          pricesSubject.next(prices);
          localStorage.setItem('prices', JSON.stringify(prices));
        } catch (e) {
          console.error(e);
        }
      }).catch(console.error);
  }
};

export const priceSubject = new BehaviorSubject(null);
export const usePrice = hookFromSubject(priceSubject);
export const getPrice = (symbol) => {
  if (symbol) {
    priceSubject.next(null);
    return fetch(new Request('/api/prices/' + symbol + '?t=' + new Date().getTime())).then(async (response) => {
      try {
        const prices = await response.json();
        priceSubject.next(prices[symbol]);
      } catch (e) {
        console.error(e);
      }
    }).catch(console.error);
  }
};

let savedCurrencyRates = null;
const savedCurrencyRatesString = localStorage.getItem('currencyRates');
if (savedCurrencyRatesString) {
  try {
    savedCurrencyRates = JSON.parse(savedCurrencyRatesString);
  } catch (e) {
    console.error(e);
  }
}

export const currencyRatesSubject = new BehaviorSubject(savedCurrencyRates);
export const useCurrencyRates = hookFromSubject(currencyRatesSubject);
export const getCurrencyRates = () => {
  return fetch(new Request('/api/currencyRates')).then(async (response) => {
    try {
      const currencyRates = await response.json();
      currencyRatesSubject.next(currencyRates);
      localStorage.setItem('currencyRates', JSON.stringify(currencyRates));
    } catch (e) {
      console.error(e);
    }
  }).catch(console.error);
};

let savedStocks = [];
const savedStocksString = localStorage.getItem('stocks');
if (savedStocksString) {
  try {
    savedStocks = JSON.parse(savedStocksString);
  } catch (e) {
    console.error(e);
  }
}
export const stocksSubject = new BehaviorSubject(savedStocks);
export const useStocks = hookFromSubject(stocksSubject);
stocksSubject.subscribe(stocks => {
  localStorage.setItem('stocks', JSON.stringify(stocks));
});

export const convertCurrency = (value, currencyFrom, currencyTo) => {
  const currency = currencyRatesSubject.getValue();
  if (!currency) {
    return value;
  }
  const valueBase = value / currency.rates[currencyFrom];
  return valueBase * currency.rates[currencyTo];
};


export const calculateTotalGain = (stocks, prices) => {
  let gainSum = 0;
  (stocks || []).forEach(item => {
    if (item && prices && prices[item.symbol]) {
      const price = prices[item.symbol];
      const payed = (+item.buyPrice) * (+item.amount) + (+item.transactionFee || 0);
      const gain = ((price.preMarketPrice || +price.value) * (+item.amount) - (+item.transactionFee || 0)) - payed;
      gainSum += gain;
    }
  });
  return gainSum;
};
