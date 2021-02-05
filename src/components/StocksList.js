import React from "react";
import { Card, NavBar, WhiteSpace, WingBlank } from "antd-mobile";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { usePrices, useStocks } from "../hooks/priceHooks";

function StockList({ onPageChange }) {

  const stocks = useStocks();
  const prices = usePrices();

  return (
    <div className="StockList">
      <NavBar
        mode="dark"
        leftContent={[
          <AiOutlineMenu size={24} key={'menu'} onClick={() => onPageChange('Menu')}/>
        ]}
        rightContent={[
          <AiOutlinePlus size={24} key={'plus'} onClick={() => onPageChange('StockDetails')}/>
        ]}
      >stonks</NavBar>

      <WingBlank size="lg">
        <WhiteSpace size="lg"/>
        {!!prices && stocks.map((item, index) => {
          const price = prices[item.symbol] || {};
          const buyPrice = +item.amount * +item.buyPrice + (+item.transactionFee || 0);
          const sellPrice = +item.amount * +price.value - (+item.transactionFee || 0);
          const dif = sellPrice - buyPrice;
          return !!prices[item.symbol] && <Card key={index} onClick={() => onPageChange('StockDetails', {item, index})}>
            <Card.Header
              title={`${item.symbol} ${price.value.toFixed(2)} ${price.currency}`}
              extra={<span>{item.amount}</span>}
            />
            <Card.Body>
              <div className={dif > 0 ? 'gain' : 'loss'}>
                {dif > 0 ? '+' : ''}{dif.toFixed(2)} {price.currency} {dif > 0 ? '+' : ''}{(100 * dif / buyPrice).toFixed(2)}%
              </div>
            </Card.Body>
            <Card.Footer content={`payed ${buyPrice.toFixed(2)} ${price.currency}`}
                         extra={<div>{`sell ${sellPrice.toFixed(2)} ${price.currency}`}</div>}/>
          </Card>
        })}
        <WhiteSpace size="lg"/>
      </WingBlank>
    </div>
  );
}

export default StockList;
