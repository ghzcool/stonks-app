import React from "react";
import { Card, NavBar, WhiteSpace, WingBlank } from "antd-mobile";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import { calculateTotalGain, usePrices, useStocks } from "../hooks/priceHooks";
import { DEFAULT_CURRENCY } from "../constants";
import moment from 'moment-timezone';

const openTime = "09:30:00";
const closeTime = "16:00:00";

function StockList({ onPageChange }) {

  const stocks = useStocks();
  const prices = usePrices();

  const totalGain = calculateTotalGain(stocks, prices);

  const now = moment();
  const openMoment = moment.tz(now.format('YYYY-MM-DD') + 'T' + openTime, 'America/New_York');
  const closeMoment = moment.tz(now.format('YYYY-MM-DD') + 'T' + closeTime, 'America/New_York');
  let nextIsOpen = now.isSameOrBefore(openMoment);
  const timeToOpen = openMoment.diff(now, 'hour');
  const timeToOpenM = openMoment.diff(now, 'minute');
  const timeToClose = closeMoment.diff(now, 'hour');
  const timeToCloseM = closeMoment.diff(now, 'minute');

  return (
    <div className="StockList">
      <NavBar key={'top'}
              mode="dark"
              className={'top-bar'}
              leftContent={[
                <AiOutlineMenu size={24} key={'menu'} onClick={() => onPageChange('Menu')}/>
              ]}
              rightContent={[
                <AiOutlinePlus size={24} key={'plus'} onClick={() => onPageChange('StockDetails')}/>
              ]}
      >stonks</NavBar>
      <NavBar key={'bottom'}
              mode="light"
              className={'bottom-bar'}
              leftContent={[
                nextIsOpen
                  ? <div key={'open'} className={'text-gray'}>opens
                    in {timeToOpenM < 60 ? timeToOpenM : timeToOpen}{timeToOpenM < 60 ? 'm' : 'h'}</div>
                  : <div key={'close'} className={'text-gray'}>closes
                    in {timeToCloseM < 60 ? timeToCloseM : timeToClose}{timeToCloseM < 60 ? 'm' : 'h'}</div>
              ]}
              rightContent={[
                <div key={'gain'} className={'text-right ' + (totalGain > 0 ? 'gain' : 'lose')}>
                  {totalGain > 0 ? '+' : ''}{totalGain.toFixed(2)} {DEFAULT_CURRENCY}
                </div>
              ]}
      />

      <WingBlank size="lg">
        <WhiteSpace size="lg"/>
        {!!prices && (stocks || []).map((item, index) => {
          const price = prices[item.symbol] || {};
          const preMarketPrice = price.preMarketPrice || 0;
          const postMarketPrice = price.postMarketPrice || 0;
          const outMarketPrice = preMarketPrice || postMarketPrice;
          const value = outMarketPrice || price.value || 0;
          const buyPrice = +item.amount * +item.buyPrice + (+item.transactionFee || 0);
          const sellPrice = +item.amount * +value - (+item.transactionFee || 0);
          const difOne = +value - +item.buyPrice;
          const dif = sellPrice - buyPrice;
          return !!prices[item.symbol] && <div key={index}>
            <Card onClick={() => onPageChange('StockDetails', { item, index })}>
              <Card.Header
                title={<>{item.symbol} {!outMarketPrice && value.toFixed(2)} {!!outMarketPrice &&
                <span className={'market-price'}>{value.toFixed(2)}</span>}{price.currency}</>}
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
