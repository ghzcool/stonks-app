import { BehaviorSubject } from "rxjs";
import { hookFromSubject } from "./index";
import { DEFAULT_CURRENCY } from "../constants";

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
    return fetch(new Request('/api/prices/' + stocks.map(item => item.symbol).join(','))).then(async (response) => {
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

export const priceSubject = new BehaviorSubject({ currency: DEFAULT_CURRENCY });
export const usePrice = hookFromSubject(priceSubject);
export const getPrice = (symbol) => {
  if (symbol) {
    return fetch(new Request('/api/prices/' + symbol)).then(async (response) => {
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