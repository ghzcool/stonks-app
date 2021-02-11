import React from "react";
import { NavBar, WhiteSpace, WingBlank } from "antd-mobile";
import { AiOutlineDelete, AiOutlineLeft } from "react-icons/ai";
import StockForm from "./StockForm";
import { getPrices, stocksSubject, useStocks } from "../hooks/priceHooks";

function StockDetails({ onPageChange, props }) {

  const stocks = useStocks();
  const { item, index } = props;

  const goBack = () => onPageChange('StockList');

  const onSubmit = (values) => {
    if (item) {
      const tmp = [...stocks];
      tmp.splice(index, 1, values);
      stocksSubject.next(tmp);
    } else {
      stocksSubject.next([...stocks, values]);
    }
    getPrices();
    goBack();
  };

  const onDelete = () => {
    if (item && confirm('Are you sure?')) {
      const tmp = [...stocks];
      tmp.splice(index, 1);
      stocksSubject.next(tmp);
      goBack();
    }
  };

  return (
    <div className="StockDetails">
      <NavBar
        mode="dark"
        className={'top-bar'}
        leftContent={[
          <AiOutlineLeft size={24} key={'menu'} onClick={goBack}/>
        ]}
        rightContent={item ? [
          <AiOutlineDelete size={24} key={'menu'} onClick={onDelete}/>
        ] : undefined}
      >stonks</NavBar>

      <WingBlank size="lg">
        <WhiteSpace size="lg"/>
        <StockForm values={item || {}} onSubmit={onSubmit} onCancel={goBack}/>
      </WingBlank>
    </div>
  );
}

export default StockDetails;
