import React from "react";
import { Flex, NavBar, WhiteSpace, WingBlank } from "antd-mobile";
import { AiOutlineHome } from "react-icons/ai";
import { usePrices, useStocks } from "../hooks/priceHooks";
import { DEFAULT_CURRENCY } from "../constants";

function Summary({ onPageChange }) {

  const stocks = useStocks();
  const prices = usePrices();
  const grouped = {};
  let payedSum = 0;
  let gainSum = 0;
  stocks.forEach(item => {
    if (item && prices && prices[item.symbol]) {
      if (!grouped[item.symbol]) {
        grouped[item.symbol] = {payed: 0, gain: 0};
      }
      const price = prices[item.symbol];
      const payed = (+item.buyPrice) * (+item.amount) + (+item.transactionFee || 0);
      const gain = ((price.preMarketPrice || price.postMarketPrice || +price.value) * (+item.amount) - (+item.transactionFee || 0)) - payed;
      payedSum += payed;
      gainSum += gain;
      grouped[item.symbol].payed += payed;
      grouped[item.symbol].gain += gain;
    }
  });
  const table = [];
  Object.keys(grouped).forEach(symbol => {
    const price = (prices || {})[symbol] || {};
    table.push({ symbol, gain: grouped[symbol].gain, payed: grouped[symbol].payed, currency: price.currency });
  });
  table.push({ symbol: 'Total', gain: gainSum, payed: payedSum, currency: DEFAULT_CURRENCY });

  return (
    <div className="Summary">
      <NavBar
        mode="dark"
        className={'top-bar'}
        leftContent={[
          <AiOutlineHome size={24} key={'menu'} onClick={() => onPageChange('StockList')}/>
        ]}
      >stonks</NavBar>

      <WingBlank size="lg">
        <WhiteSpace size="lg"/>
        <Flex>
          <Flex.Item><b>Symbol</b></Flex.Item>
          <Flex.Item><b>Payed</b></Flex.Item>
          <Flex.Item className={'text-right'}><b>Gain</b></Flex.Item>
        </Flex>
        {table.map(item => <div key={item.symbol}>
          <WhiteSpace size="lg"/>
          <Flex>
            <Flex.Item>{item.symbol}</Flex.Item>
            <Flex.Item>{(+item.payed).toFixed(2)} {item.currency}</Flex.Item>
            <Flex.Item className={'text-right ' + (item.gain > 0 ? 'gain' : 'lose')}>
              {+item.gain > 0 ? '+' : ''}{(+item.gain).toFixed(2)} {item.currency}
            </Flex.Item>
          </Flex>
        </div>)}
      </WingBlank>
    </div>
  );
}

export default Summary;
