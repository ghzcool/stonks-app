import React from "react";
import { NavBar, WhiteSpace, WingBlank } from "antd-mobile";
import { AiOutlineHome } from "react-icons/ai";

function Settings({ onPageChange }) {

  return (
    <div className="Settings">
      <NavBar
        mode="dark"
        leftContent={[
          <AiOutlineHome size={24} key={'menu'} onClick={() => onPageChange('StockList')}/>
        ]}
      >stonks</NavBar>

      <WingBlank size="lg">
        <WhiteSpace size="lg"/>
        settings
      </WingBlank>
    </div>
  );
}

export default Settings;
