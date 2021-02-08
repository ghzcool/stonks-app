import React from "react";
import { Flex, NavBar, WhiteSpace, WingBlank } from "antd-mobile";
import { AiOutlineHome } from "react-icons/ai";
import { usePrices, useStocks } from "../hooks/priceHooks";
import { DEFAULT_CURRENCY } from "../constants";

function Summary({ onPageChange }) {

  const stocks = useStocks();
  const prices = usePrices();
  const grouped = {};
  let sum = 0;
  stocks.forEach(item => {
    if (item && prices && prices[item.symbol]) {
      if (!grouped[item.symbol]) {
        grouped[item.symbol] = 0;
      }
      const price = prices[item.symbol];
      const value = ((+price.value) * (+item.amount) - (+item.transactionFee || 0)) - ((+item.buyPrice) * (+item.amount) + (+item.transactionFee || 0));
      sum += value;
      grouped[item.symbol] += value;
    }
  });
  const table = [];
  Object.keys(grouped).forEach(symbol => {
    const price = (prices || {})[symbol] || {};
    table.push({ symbol, gain: grouped[symbol], currency: price.currency });
  });
  table.push({ symbol: 'Total', gain: sum, currency: DEFAULT_CURRENCY });

  return (
    <div className="Summary">
      <NavBar
        mode="dark"
        leftContent={[
          <AiOutlineHome size={24} key={'menu'} onClick={() => onPageChange('StockList')}/>
        ]}
      >stonks</NavBar>

      <WingBlank size="lg">
        <WhiteSpace size="lg"/>
        <Flex>
          <Flex.Item><b>Symbol</b></Flex.Item>
          <Flex.Item className={'text-right'}><b>Gain</b></Flex.Item>
        </Flex>
        {table.map(item => <div key={item.symbol}>
          <WhiteSpace size="lg"/>
          <Flex>
            <Flex.Item>{item.symbol}</Flex.Item>
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
