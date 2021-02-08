import React from "react";
import { List, NavBar, WhiteSpace } from "antd-mobile";
import { AiOutlineLeft } from "react-icons/ai";

function Menu({ onPageChange }) {

  return (
    <div className="Menu">
      <NavBar
        mode="dark"
        leftContent={[
          <AiOutlineLeft size={24} key={'menu'} onClick={() => onPageChange('StockList')}/>
        ]}
      >stonks</NavBar>

      <WhiteSpace size="lg"/>
      <List className="my-list">
        <List.Item onClick={() => onPageChange('StockList')}>My stonks</List.Item>
        <List.Item onClick={() => onPageChange('Summary')}>Summary</List.Item>
        {/*<List.Item onClick={() => onPageChange('Settings')}>Settings</List.Item>*/}
      </List>
    </div>
  );
}

export default Menu;
