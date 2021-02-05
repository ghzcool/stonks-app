import React from "react";
import { NavBar, WhiteSpace, WingBlank } from "antd-mobile";
import { AiOutlineHome } from "react-icons/ai";

function Summary({ onPageChange }) {

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
        Summary
      </WingBlank>
    </div>
  );
}

export default Summary;
