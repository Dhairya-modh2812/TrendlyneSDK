import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./StockReport2.module.scss";
import { dateFormatter, formatNumber, getDictionaryToList, percentageRender } from "../../utils/commonFunctions";
import TrendChart from "./components/TrendChart";
import PeersChart from "./components/PeersChart";
import FinancialCard from "./components/FinancialCard";
import DVMlinebar from "../../components/DVMlinebar";
import moment from "moment";
import ScoreDistributionCard from "../../components/ScoreDistributionCard";
import Footer from "../../components/Footer";

const StockReport2 = (props) => {
  let { reportData } = props;
  const { page2, 
      stockData, 
      durabilityTrendData, 
      peerDurabilityTrendInsight, 
      peerComparisonTabledata, 
      financialsData: {
        annualDataDump = {}
      } = {}
  } = reportData;

  const financials = annualDataDump ? annualDataDump.financials : null;
  const { DVM } = stockData;

  let trendChartStartDate;
  let trendChartEndDate;
  if(durabilityTrendData && durabilityTrendData?.ChartData) {
    let length = durabilityTrendData?.ChartData.length;
    trendChartStartDate = durabilityTrendData?.ChartData[length - 1].date;
    trendChartEndDate = durabilityTrendData?.ChartData[0].date;
  }

  let financialData = getDictionaryToList(financials);
  
  return (
    <div className="container-fluid page-2 stockreport">
      <Header stockData={stockData} />
      <div className="content">
        <div>
          <div className="section-label-box">
            <div className="cardLabel f-24 ml-n-25">Durability Summary</div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <div className="durability-box">
                <div>
                  <div className={`box box-${DVM?.durability?.color}`}>
                    <h6 className="f-14 f-semibold">Durability Score</h6>
                    <div>
                      <span className={`f-48 text-${DVM?.durability?.color}`}>{DVM?.durability?.value}</span>{" "}
                      <span className="f-20">/ 100</span>
                    </div>
                    <h6 className={`text-${DVM?.durability?.color}`}>{DVM?.durability?.st}</h6>
                  </div>
                  <div className="dvm-score-card px-0">
                  <DVMlinebar 
                      value={DVM?.durability?.value}
                      bad={0}
                      mediumLow={35}
                      mediumHigh={55}
                      high={100}
                  />
                  </div>
                </div>
                <div>
                  <div className="dvm-summary">
                    <ul className="f-14 mb-0">
                      <li>
                        {stockData.stockName} has a durability score of{" "}
                        <span className="fw-bold">
                          {DVM?.durability?.value}
                        </span>
                        , which indicates {DVM?.durability?.st}.
                      </li>
                      <li>
                        A High Durability Score{" "}
                        <span className="fw-bold">(greater than 55) </span>
                        indicates good and consistent financial performance : stable
                        revenues, cash flows, and low debt.
                      </li>
                      <li>
                        The Durability score looks at many different metrics,
                        including long-term performance data, to identify stocks
                        that have stood the test of time.
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
            <div className="col-6 trend-chart">
                <div className="section-label-box">
                    <div className="cardLabel f-24 ml-n-25">Durability Trend</div>
                    <div className="d-block m-auto">{stockData?.stockName} : {moment(trendChartStartDate).format("MMM 'YY")} - {moment(trendChartEndDate).format("MMM 'YY") }</div>
                </div>
                <div className="mb-3">
                    <TrendChart data={durabilityTrendData?.ChartData}/>
                </div>
                <ScoreDistributionCard data={durabilityTrendData}/>
            </div>
            <div className="col-6">
                <div className="section-label-box">
                    <div className="cardLabel f-24">Durability v/s Peers</div>
                    {/* <div className="d-block m-auto">{moment(trendChartEndDate).format("DD MMM 'YY")}</div> */}
                </div>
                <div className="mb-3">
                    <PeersChart peerComparisonTabledata={peerComparisonTabledata} NSECode={stockData.NSEcode} BSEcode={stockData.BSEcode}/>
                </div>
                <div className="dvm-summary" dangerouslySetInnerHTML={{__html: peerDurabilityTrendInsight}}>
                  
                </div>
            </div>
          </div>
        </div>
        {financialData && <div className="row">
            <div className="col-12">
                <div className="section-label-box">
                    <div className="cardLabel f-24 ml-n-25">Financial Metrics</div>
                </div>
            </div>
            { financialData && financialData.map((financial, index) => {
              return <FinancialCard key={index.toString()} data={financial} chartType={index > 3 ? 'area' : 'column'}/>
            })}
        </div>}
      </div>
      <Footer page={2} />
    </div>
  );
};

export default StockReport2;