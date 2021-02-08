import React, { useEffect, useState } from "react";
import { getCurrencyRates, getPrices } from "./hooks/priceHooks";
import StockList from "./components/StocksList";
import Menu from "./components/Menu";
import StockDetails from "./components/StockDetails";
import Summary from "./components/Summary";
import Settings from "./components/Settings";

function App() {
  useEffect(() => {
    getPrices();
    getCurrencyRates();
  }, [true]);

  const [page, setPage] = useState('StockList');
  const [pageProps, setPageProps] = useState({});

  const onPageChange = (componentName, props) => {
    setPage(componentName);
    setPageProps(props || {});
  };

  return (
    <div className="App">
      {page === 'Menu' && <Menu onPageChange={onPageChange} props={pageProps} />}
      {page === 'StockList' && <StockList onPageChange={onPageChange} props={pageProps} />}
      {page === 'StockDetails' && <StockDetails onPageChange={onPageChange} props={pageProps} />}
      {page === 'Summary' && <Summary onPageChange={onPageChange} props={pageProps} />}
      {page === 'Settings' && <Settings onPageChange={onPageChange} props={pageProps} />}
    </div>
  );
}

export default App;
