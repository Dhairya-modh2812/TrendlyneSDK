import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Valuation.module.scss";
import { dateFormatter, formatNumber, getDictionaryToList, percentageRender } from "../../utils/commonFunctions";
import TrendChart from "./components/TrendChart";
import PeersChart from "./components/PeersChart";
import FinancialCard from "./components/FinancialCard";
import DVMlinebar from "../../components/DVMlinebar";
import moment from "moment";
import BuySellChart from "./components/BuySellChart";
import ScoreDistributionCard from "../../components/ScoreDistributionCard";
import Footer from "../../components/Footer";

const Valuation = (props) => {
  let { reportData } = props;
  const { 
      stockData, 
      valuationTrendData, 
      page1,
      peerValuationTrendInsight,
      peerComparisonTabledata, 
      financialsData: {
        annualDataDump = {}
      } = {}
  } = reportData;

  const valutaionMetrics = annualDataDump ? annualDataDump.valutaionMetrics : null;
  let valutaionMetricsData = getDictionaryToList(valutaionMetrics);
  
  const { DVM } = stockData;

  const standaloneInsight = page1?.buySellData?.standaloneInsight;
  let trendChartStartDate;
  let trendChartEndDate;
  if(valuationTrendData && valuationTrendData?.ChartData) {
    let length = valuationTrendData?.ChartData.length;
    trendChartStartDate = valuationTrendData?.ChartData[length - 1].date;
    trendChartEndDate = valuationTrendData?.ChartData[0].date;
  }
  return (
    <div className="container-fluid page-2 stockreport">
      <Header stockData={stockData} />
      <div className="content">
        <div>
          <div className="section-label-box">
            <div className="cardLabel f-24 ml-n-25">Valuation Summary</div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <div className="durability-box">
                <div>
                  <div className={`box box-${DVM?.valuation?.color}`}>
                    <h6 className="f-14 f-semibold">Valuation Score</h6>
                    <div> 
                      <span className={`f-48 text-${DVM?.valuation?.color}`}>{formatNumber(DVM?.valuation?.value, 0)}</span>{" "}
                      <span className="f-20">/ 100</span>
                    </div>
                    <h6 className={`text-${DVM?.valuation?.color}`}>{DVM?.valuation?.st}</h6>
                  </div>
                  <div className="dvm-score-card px-0">
                  <DVMlinebar 
                      value={DVM?.valuation?.value}
                      bad={0}
                      mediumLow={30}
                      mediumHigh={50}
                      high={100}
                  />
                  </div>
                </div>
                <div>
                  <div className="dvm-summary">
                    <ul className="f-14 mb-0">
                      <li>
                        {stockData.stockName} has a valuation score of{" "}
                        <span className="fw-bold">
                          {formatNumber(DVM?.valuation?.value, 0)}
                        </span>
                        , which indicates an {DVM?.valuation?.st}.
                      </li>
                      <li>
                        A High Valuation Score {" "}
                        <span className="fw-bold">(greater than 50) </span>
                        indicates the stock is competitively priced at current P/E, P/BV and share price.
                      </li>
                      <li>
                      The Valuation helps you identify stocks which are still bargains, and whose strengths are not fully priced into the share price.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* <div>
            <div className="cardLabel f-24">Durability Trend</div>
          </div> */}
          <div className="row mb-4">
            <div className="col-6">
                <div className="row trend-chart">
                  <div className="col-11">
                    <div className="section-label-box">
                      <div className="cardLabel f-24 ml-n-25">Valuation Trend</div>
                      <div className="d-block m-auto">{stockData?.stockName} : {moment(trendChartStartDate).format("MMM 'YY")} - {moment(trendChartEndDate).format("MMM 'YY") }</div>
                    </div>
                    <div className="mb-3">
                      <TrendChart data={valuationTrendData?.ChartData}/>
                    </div>
                    <ScoreDistributionCard data={valuationTrendData}/>
                  </div>
                </div>
            </div>
            <div className="col-6">
                <div className="section-label-box">
                    <div className="cardLabel f-24">Valuation v/s Peers</div>
                    {/* <div className="d-block m-auto">{moment(trendChartEndDate).format("DD MMM 'YY")}</div> */}
                </div>
                <div className="mb-3">
                    <PeersChart peerComparisonTabledata={peerComparisonTabledata} NSECode={stockData.NSEcode} BSEcode={stockData.BSEcode}/>
                </div>
                <div className="dvm-summary" dangerouslySetInnerHTML={{__html: peerValuationTrendInsight}}>
                  
                </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center justify-content-between">
          <div className="col-12">
              <div className="section-label-box">
                  <div className="cardLabel f-24 ml-n-25">P/E Buy Sell Zone</div>
              </div>
          </div>
          <div className="col-6">
            {/* <TrendChart data={valuationTrendData?.ChartData}/>    */}
            <div className="row">
              <div className="col-11">
                <BuySellChart buySellData={page1?.buySellData}/>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="dvm-summary">
              <ul className="f-14 mb-0">
                {standaloneInsight && <li>
                  {standaloneInsight}
                </li>}
                <li>
                  This is based on the tendency of the P/E value to revert to its historical mean.
                </li>
                <li>
                  If the P/E value has spent most of its time below the current value, then it means that mnost gains have probably been realised already, and it is time to sell.
                </li>
                <li>
                  If the P/E value has spent very little time below the current value, then it means that there is strong potential upside, and it is time to buy.
                </li>
              </ul>
            </div>
          </div>
        </div>
        {valutaionMetricsData && <div className="row">
            <div className="col-12">
                <div className="section-label-box">
                    <div className="cardLabel f-24 ml-n-25">Valuation Metrics</div>
                </div>
            </div>
            { valutaionMetricsData && valutaionMetricsData.map((financial, index) => {
              return <FinancialCard key={index.toString()} data={financial} chartType={index > 3 ? 'area' : 'column'}/>
            })}
        </div>}
      </div>
      <Footer page={5} />
    </div>
  );
};

export default Valuation;