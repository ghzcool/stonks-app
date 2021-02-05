const si = require('stock-info');
const fetch = require('node-fetch');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/prices/:symbols', (req, res) => {
  const symbols = req.params.symbols.split(',');
  si.getStocksInfo(symbols).then(result => {
    const prices = {};
    result.forEach(item => {
      prices[item.symbol] = { value: (item.bid + item.ask) / 2, currency: item.currency };
    });
    res.send(prices);
  }).catch((error) => res.status(500).send(error));
});

let currencyRates = {
  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
  "license": "https://openexchangerates.org/license",
  "timestamp": 1612454400,
  "base": "USD",
  "rates": {
    "AED": 3.673,
    "AFN": 77.249998,
    "ALL": 101.9,
    "AMD": 521.511851,
    "ANG": 1.794168,
    "AOA": 653.38,
    "ARS": 87.9062,
    "AUD": 1.315995,
    "AWG": 1.8,
    "AZN": 1.700805,
    "BAM": 1.63085,
    "BBD": 2,
    "BDT": 84.760389,
    "BGN": 1.63201,
    "BHD": 0.376982,
    "BIF": 1961,
    "BMD": 1,
    "BND": 1.331594,
    "BOB": 6.911635,
    "BRL": 5.4209,
    "BSD": 1,
    "BTC": 0.000027269801,
    "BTN": 72.810999,
    "BWP": 10.940836,
    "BYN": 2.635081,
    "BZD": 2.014792,
    "CAD": 1.283847,
    "CDF": 1979,
    "CHF": 0.903231,
    "CLF": 0.026757,
    "CLP": 738.5,
    "CNH": 6.476453,
    "CNY": 6.4718,
    "COP": 3565.44,
    "CRC": 613.076233,
    "CUC": 1,
    "CUP": 25.75,
    "CVE": 92.45,
    "CZK": 21.615029,
    "DJF": 177.948436,
    "DKK": 6.208088,
    "DOP": 58.05,
    "DZD": 133.243635,
    "EGP": 15.6698,
    "ERN": 14.999688,
    "ETB": 39.39,
    "EUR": 0.834815,
    "FJD": 2.04045,
    "FKP": 0.732174,
    "GBP": 0.732174,
    "GEL": 3.31,
    "GGP": 0.732174,
    "GHS": 5.82,
    "GIP": 0.732174,
    "GMD": 51.55,
    "GNF": 10102.5,
    "GTQ": 7.776666,
    "GYD": 209.114946,
    "HKD": 7.75255,
    "HNL": 24.28,
    "HRK": 6.3169,
    "HTG": 72.376016,
    "HUF": 297.235,
    "IDR": 14030.821474,
    "ILS": 3.290891,
    "IMP": 0.732174,
    "INR": 72.958131,
    "IQD": 1462.5,
    "IRR": 42105,
    "ISK": 130.15,
    "JEP": 0.732174,
    "JMD": 148.429565,
    "JOD": 0.709,
    "JPY": 105.41816667,
    "KES": 109.8,
    "KGS": 83.936742,
    "KHR": 4067,
    "KMF": 407.869965,
    "KPW": 900,
    "KRW": 1120.335152,
    "KWD": 0.302999,
    "KYD": 0.832965,
    "KZT": 422.742047,
    "LAK": 9332.5,
    "LBP": 1520,
    "LKR": 193.403172,
    "LRD": 171.000054,
    "LSL": 15.07,
    "LYD": 4.46,
    "MAD": 8.998057,
    "MDL": 17.415624,
    "MGA": 3780,
    "MKD": 51.372805,
    "MMK": 1387.305284,
    "MNT": 2852.1676,
    "MOP": 7.981274,
    "MRO": 356.999828,
    "MRU": 36.05,
    "MUR": 39.69958,
    "MVR": 15.4,
    "MWK": 780,
    "MXN": 20.463427,
    "MYR": 4.0585,
    "MZN": 75.149996,
    "NAD": 15.07,
    "NGN": 381.2,
    "NIO": 35.03,
    "NOK": 8.644687,
    "NPR": 116.497944,
    "NZD": 1.396714,
    "OMR": 0.384972,
    "PAB": 1,
    "PEN": 3.635,
    "PGK": 3.535,
    "PHP": 48.1145,
    "PKR": 160.2,
    "PLN": 3.758468,
    "PYG": 6867.704456,
    "QAR": 3.64075,
    "RON": 4.0696,
    "RSD": 98.059634,
    "RUB": 75.7025,
    "RWF": 980,
    "SAR": 3.751087,
    "SBD": 8.02131,
    "SCR": 21.205087,
    "SDG": 55.225,
    "SEK": 8.460188,
    "SGD": 1.337696,
    "SHP": 0.732174,
    "SLL": 10184.43849,
    "SOS": 584.5,
    "SRD": 14.154,
    "SSP": 130.26,
    "STD": 20466.377105,
    "STN": 20.55,
    "SVC": 8.746915,
    "SYP": 512.792386,
    "SZL": 15.07,
    "THB": 30.0835,
    "TJS": 11.390179,
    "TMT": 3.5,
    "TND": 2.7,
    "TOP": 2.302136,
    "TRY": 7.13807,
    "TTD": 6.770697,
    "TWD": 27.999001,
    "TZS": 2319,
    "UAH": 27.93114,
    "UGX": 3662.448621,
    "USD": 1,
    "UYU": 42.441596,
    "UZS": 10540,
    "VES": 1629083.18,
    "VND": 23041.019703,
    "VUV": 108.743405,
    "WST": 2.507124,
    "XAF": 547.602828,
    "XAG": 0.03832154,
    "XAU": 0.00055957,
    "XCD": 2.70255,
    "XDR": 0.696478,
    "XOF": 547.602828,
    "XPD": 0.00044054,
    "XPF": 99.619944,
    "XPT": 0.00091951,
    "YER": 250.399984,
    "ZAR": 15.08495,
    "ZMW": 21.46071,
    "ZWL": 322
  }
};

app.get('/api/currencyRates', (req, res) => {
  res.send(currencyRates);
});

const updateCurrencyRates = () => {
  fetch('https://openexchangerates.org/api/latest.json?app_id=691b233a4e564e7299fae2436b847c59').then(async (response) => {
    try {
      currencyRates = await response.json();
    } catch (e) {
      console.error(e);
    }
  }).catch(console.error);
  setTimeout(updateCurrencyRates, 1000 * 60 * 60 * 12);
};

updateCurrencyRates();


app.use(express.static('build'));
app.listen(port);
console.log('Listening ' + port);
