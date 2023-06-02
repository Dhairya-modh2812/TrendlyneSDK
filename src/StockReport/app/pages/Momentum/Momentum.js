import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Momentum.module.scss";
import { formatNumber, getDictionaryToList } from "../../utils/commonFunctions";
import TrendChart from "./components/TrendChart";
import PeersChart from "./components/PeersChart";
import DVMlinebar from "../../components/DVMlinebar";
import moment from "moment";

import KeyCard from "../../components/Momentum/KeyCard";
import PriceAnalysisChart from "./components/PriceAnalysisChart";
import ScoreDistributionCard from "../../components/ScoreDistributionCard";

import SimpleMovingAverage from "./components/SimpleMovingAverage";
import ExponentialMovingAverage from "./components/ExponentialMovingAverage";
import Footer from "../../components/Footer";

const Momentum = (props) => {
  let { reportData } = props;
  const { 
      stockData, 
      momentumTrendData, 
      peerMomentumTrendInsight, 
      peerComparisonTabledata, 
      momentumData
  } = reportData;

  const { DVM } = stockData;

  let trendChartStartDate;
  let trendChartEndDate;
  if(momentumTrendData && momentumTrendData?.ChartData) {
    let length = momentumTrendData?.ChartData.length;
    trendChartStartDate = momentumTrendData?.ChartData[length - 1].date;
    trendChartEndDate = momentumTrendData?.ChartData[0].date;
  }
  
  const momentumMetrics = momentumData?.momentumMetrics;
  let keyCard = getDictionaryToList(momentumMetrics);
  keyCard = keyCard.slice(0, keyCard.length - 2)
  
  let priceChangeAnalysis = momentumData?.priceChangeAnalysis;
  let priceChangeInList = getDictionaryToList(priceChangeAnalysis);
  
  return (
    <div className="container-fluid page-2 momentum">
      <Header stockData={stockData} />
      <div className="content">
        <div>
          <div className="section-label-box">
            <div className="cardLabel f-24 ml-n-25">Momentum Summary</div>
          </div>
          <div className="row mb-4">
            <div className="col-12">
              <div className="durability-box">
                <div>
                  <div className={`box box-${DVM?.momentum?.color}`}>
                    <h6 className="f-14 f-semibold">Momentum Score</h6>
                    <div> 
                      <span className={`f-48 text-${DVM?.momentum?.color}`}>{formatNumber(DVM?.momentum?.value, 0)}</span>{" "}
                      <span className="f-20">/ 100</span>
                    </div>
                    <h6 className={`text-${DVM?.momentum?.color}`}>{DVM?.momentum?.st}</h6>
                  </div>
                  <div className="dvm-score-card px-0">
                  <DVMlinebar 
                      value={DVM?.momentum?.value}
                      bad={0}
                      mediumLow={35}
                      mediumHigh={60}
                      high={100}
                  />
                  </div>
                </div>
                <div>
                  <div className="dvm-summary">
                    <ul className="f-14 mb-0">
                      <li>
                        {stockData.stockName} has a Momentum score of{" "}
                        <span className="fw-bold">
                          {/* {formatNumber(DVM?.valuation?.value, 0)} */}
                          {formatNumber(DVM?.momentum?.value, 0)}
                        </span>
                        , which indicates that it is {DVM?.valuation?.st}.
                      </li>
                      <li>
                        A High Momentum Score indicates the stock is seeing buyer demand, and is bullish across its technicals compared to the rest of the stock universe.
                      </li>
                      <li>
                        Momentum is a very effective short term score, while Durability and Valuation help assess the stock’s health over the long term.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row mb-4">
            <div className="col-6">
                <div className="row trend-chart">
                  <div className="col-11">
                    <div className="section-label-box">
                      <div className="cardLabel f-24 ml-n-25">Momentum Trend</div>
                      <div className="d-block m-auto">{stockData?.stockName} : {moment(trendChartStartDate).format("MMM 'YY")} - {moment(trendChartEndDate).format("MMM 'YY") }</div>
                    </div>
                    <div className="mb-3">
                      <TrendChart data={momentumTrendData?.ChartData}/>
                    </div>
                    <ScoreDistributionCard data={momentumTrendData}/>
                  </div>
                </div>
            </div>
            <div className="col-6">
                <div className="section-label-box">
                    <div className="cardLabel f-24">Momentum v/s Peers</div>
                    <div className="d-block m-auto">{moment(trendChartEndDate).format("DD MMM 'YY")}</div>
                </div>
                <div className="mb-3">
                    <PeersChart peerComparisonTabledata={peerComparisonTabledata} NSECode={stockData.NSEcode} BSEcode={stockData.BSEcode}/>
                </div>
                <div className="dvm-summary" dangerouslySetInnerHTML={{__html: peerMomentumTrendInsight}}>
                  
                </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
                <div className="row">
                  <div className="col-11">
                    <div className="section-label-box">
                      <div className="cardLabel f-24 ml-n-25">Price Change Analysis</div>
                    </div>
                    <div className="mb-3">
                      <PriceAnalysisChart data={priceChangeInList} currentPrice={stockData?.currentPrice}/>
                    </div>
                  </div>
                </div>
            </div>
            <div className="col-6">
                <div className="section-label-box">
                    <div className="cardLabel f-24">Key Momentum Metrics</div>
                </div>
                <div className="key-card-grid mb-3">
                    {keyCard && keyCard.length > 0 && keyCard?.map((data, index) => {
                      return <KeyCard key={data?.title} data={data}/>
                    })}
                </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
                <div className="row">
                  <div className="col-11">
                    <div className="section-label-box">
                      <div className="cardLabel f-24 ml-n-25">Simple Moving Averages</div>
                    </div>
                    <SimpleMovingAverage simpleMovingAverageData={momentumData?.simpleMovingAverageData}/>
                  </div>
                </div>
            </div>
            <div className="col-6">
                <div className="section-label-box">
                    <div className="cardLabel f-24">Exponential Moving Averages</div>
                </div>
                <ExponentialMovingAverage exponentialMovingAverageData={momentumData?.exponentialMovingAverageData}/>
            </div>
          </div>
        </div>
        
      </div>
      <Footer page={6} />
    </div>
  );
};

export default Momentum;