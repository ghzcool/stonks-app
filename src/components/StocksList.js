import React from "react";
import { Card, Flex, NavBar, WhiteSpace, WingBlank } from "antd-mobile";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { calculateTotalGain, usePrices, useStocks } from "../hooks/priceHooks";
import { DEFAULT_CURRENCY } from "../constants";

function StockList({ onPageChange }) {

  const stocks = useStocks();
  const prices = usePrices();

  const totalGain = calculateTotalGain(stocks, prices);

  return (
    <div className="StockList">
      <NavBar
        mode="dark"
        className={'top-bar'}
        leftContent={[
          <AiOutlineMenu size={24} key={'menu'} onClick={() => onPageChange('Menu')}/>
        ]}
        rightContent={[
          <AiOutlinePlus size={24} key={'plus'} onClick={() => onPageChange('StockDetails')}/>
        ]}
      >stonks</NavBar>
      <NavBar
        mode="light"
        className={'bottom-bar'}
        leftContent={[

        ]}
        rightContent={[
          <span className={'text-right ' + (totalGain > 0 ? 'gain' : 'lose')}>
            {totalGain > 0 ? '+' : ''}{totalGain.toFixed(2)} {DEFAULT_CURRENCY}
          </span>
        ]}
      />

      <WingBlank size="lg">
        <WhiteSpace size="lg"/>
        {!!prices && (stocks || []).map((item, index) => {
          const price = prices[item.symbol] || {};
          const value = price.value || 0;
          const preMarketPrice = price.preMarketPrice || 0;
          const buyPrice = +item.amount * +item.buyPrice + (+item.transactionFee || 0);
          const sellPrice = +item.amount * +value - (+item.transactionFee || 0);
          const difOne = +value - +item.buyPrice;
          const dif = sellPrice - buyPrice;
          return !!prices[item.symbol] && <div key={index}>
            <Card onClick={() => onPageChange('StockDetails', { item, index })}>
              <Card.Header
                title={<>{item.symbol} {value.toFixed(2)}<span className={'pre-market-price'}>({preMarketPrice})</span>{price.currency}</>}
                extra={<span>{item.amount}</span>}
              />
              <Card.Body>
                <div className={'pull-right ' + (dif > 0 ? 'gain' : 'lose')}>
                  {dif > 0 ? '+' : ''}{dif.toFixed(2)} {price.currency}
                </div>
                <div className={difOne > 0 ? 'gain' : 'lose'}>
                  {difOne > 0 ? '+' : ''}{difOne.toFixed(2)} {price.currency} {difOne > 0 ? '+' : ''}{(100 * difOne / (+item.buyPrice || 1)).toFixed(2)}%
                </div>
              </Card.Body>
              <Card.Footer content={`payed ${buyPrice.toFixed(2)} ${price.currency}`}
                           extra={<div>{`return ${sellPrice.toFixed(2)} ${price.currency}`}</div>}/>
            </Card>
            <WhiteSpace size="lg"/>
          </div>
        })}
      </WingBlank>
    </div>
  );
}

export default StockList;
