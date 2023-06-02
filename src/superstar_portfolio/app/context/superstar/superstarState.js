import React, { useState } from "react";
import superstarContext from "../superstar/superstarContext";

const superstarState = (props) => {
  const [superstarName, setSuperstarName] = useState(" ");
  const PAGE_SIZE_OPTIONS = [15, 25, 50, 75, 100];
  const [currentPageSize, setCurrentPageSize] = useState(15);

  const {
    baseUrl,
    externalView,
    superstarIndexUrl,
    superstarPortfolioUrl,
    superstarBulkBlockDealsUrl,
    superstarInsiderTradingSastUrl,
    corsKey,
    superstarGroupBulkBlockDealsUrl,
    superstarGroupInsiderTradingSastUrl,
    topNavbarToggle,
    topNavbarInsiderToggle,
    topNavbarBulkBlockDealsToggle,
    viewType,
  } = props || {};

  return (
    <superstarContext.Provider
      value={{
        superstarName,
        setSuperstarName,
        baseUrl,
        externalView,
        superstarIndexUrl,
        superstarPortfolioUrl,
        superstarBulkBlockDealsUrl,
        superstarInsiderTradingSastUrl,
        corsKey,
        superstarGroupBulkBlockDealsUrl,
        superstarGroupInsiderTradingSastUrl,
        topNavbarToggle,
        topNavbarInsiderToggle,
        topNavbarBulkBlockDealsToggle, 
        currentPageSize,
        setCurrentPageSize,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        viewType,
      }}
    >
      {props.children}
    </superstarContext.Provider>
  );
};

export default superstarState;
