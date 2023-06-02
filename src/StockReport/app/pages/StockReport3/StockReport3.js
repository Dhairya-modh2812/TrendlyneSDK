import React, { useState } from "react";
import Header from "../../components/Header/Header";
import FinancialCard from "./components/FinancialCard";
import ReactTable from "../../components/ReactTable/ReactTable";
import Table from "../../components/Table";
import { getDictionaryToList } from "../../utils/commonFunctions";
import Footer from "../../components/Footer";
const StockReport3 = (props) => {
  const { reportData } = props;
  const { 
    page2, 
    stockData,
    financialsData: {
      annualDataDump = {}
    } = {}
  } = reportData;
  const { DVM } = stockData;
  const financialsRatio  = annualDataDump ? annualDataDump.financialsRatio : null; 
  const balanceSheet = annualDataDump ? annualDataDump.balanceSheet : null;
  const cashFlow = annualDataDump ? annualDataDump.cashFlow : null;

  if(financialsRatio == null && balanceSheet == null && cashFlow == null) {
    return <></>
  }
  const financialRatioData = getDictionaryToList(financialsRatio)
  const balanceSheetData = getDictionaryToList(balanceSheet)
  const cashFlowData = getDictionaryToList(cashFlow)
  
  if(financialRatioData?.length == 0 && balanceSheetData?.length == 0 && cashFlowData?.length == 0) {
    return <></>
  }

  return (
    <div className="container-fluid page-2 stockreport">
      <Header stockData={stockData} />
      <div className="content">
        <div className="row">
          <div className="col-12">
            <div className="section-label-box">
              <div className="cardLabel f-24 ml-n-25">Balance Sheet</div>
            </div>
          </div>
          {balanceSheetData && balanceSheetData.map((financial, index) => {
            return (
              // <div className="col-3">
                <FinancialCard
                  key={index.toString()}
                  data={financial}
                  chartType={index > 3 ? "area" : "column"}
                />
              // </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="section-label-box">
              <div className="cardLabel f-24 ml-n-25">Cashflow</div>
            </div>
          </div>
          {cashFlowData && cashFlowData.map((financial, index) => {
            return (
              // <div className="col-3">
                <FinancialCard
                  key={index.toString()}
                  data={financial}
                  chartType={index > 3 ? "area" : "column"}
                />
              // </div>
            );
          })}
        </div>
        <div className="row">
          <div className="col-12">
            <div className="section-label-box">
              <div className="cardLabel f-24 ml-n-25">Financial Ratios </div>
            </div>
          </div>
          {financialRatioData && financialRatioData.map((item, index) => {
            return (
              // <div className="col-3">
                <FinancialCard key={index.toString()} data={item} chartType={"area"} />
              // </div>
            );
          })}
        </div>
      </div>
      <Footer page={3} />
    </div>
  );
};

export default StockReport3;