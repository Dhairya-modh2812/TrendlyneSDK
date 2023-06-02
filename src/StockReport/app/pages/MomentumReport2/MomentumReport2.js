import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./MomentumReport2.module.scss";
import { getDictionaryToList, percentageRender } from "../../utils/commonFunctions";
import KeyCard from "../../components/Momentum/KeyCard";
import PivotChart from "./components/PivotChart";
import MomentumOscillators from "./components/MomentumOscillators";
import DailyVolumeAnalysis from "./components/DailyVolumeAnalysis";
import Footer from "../../components/Footer";

const Momentum = (props) => {
  let { reportData } = props;
  const { 
      stockData, 
      momentumData
  } = reportData;

  const volatilityMetrics = momentumData?.volatilityMetrics;
  let volatilityMetricsList = getDictionaryToList(volatilityMetrics);
  
  const momentumMetrics = momentumData?.momentumMetrics;
  const keyCard = getDictionaryToList(momentumMetrics).slice(-2);

  const candlesticks = momentumData?.candlesticks;
  const bullishCandlestick = candlesticks?.bullishCandlestick;
  const bearishCandlestick =  candlesticks?.bearishCandlestick;

  const pivotInsight = momentumData?.pivotData?.insight;
  return (
    <div className="container-fluid page-2 momentum">
      <Header stockData={stockData} />
      <div className="content">
        
        <div className="row mb-4">
          <div className="col-6">
              <div className="row">
                <div className="col-11">
                  <div className="section-label-box">
                    <div className="cardLabel f-24 ml-n-25">Momentum Oscillators</div>
                  </div>
                  <MomentumOscillators momentumOscillatorsData={momentumData?.momentumOscillatorsData}/>
                </div>
              </div>
          </div>
          <div className="col-6">
              <div className="section-label-box">
                  <div className="cardLabel f-24">Pivot Support & Resistances</div>
              </div>
              {pivotInsight && <p className="f-regular f-16">{pivotInsight}</p>}
              <div className="mt-4">
                <PivotChart stockData={stockData} pivotData={momentumData?.pivotData}/>
              </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="section-label-box">
            <div className="cardLabel f-24 ml-n-25">Volatility Metrics</div>
          </div>
          <div className="row">
            <div className="col-12">
              <p className="f-20 f-bold mb-2">Beta</p>
            </div>
          </div>
          <div className="row beta">
            <div className="col-4">
              <div className="row">
                <div className="col-12">
                  <div className="beta-grid">
                    {volatilityMetricsList && volatilityMetricsList.map(item => {
                      return <div key={item?.label} className="box">
                      <h6 className="title">{item?.label}</h6>
                      <h3 className={`number text-${item?.color}`}>{item?.data}</h3>
                    </div>
                    })}
                  </div>
                  {volatilityMetrics && <div className="dvm-summary">{volatilityMetrics?.beta_3M?.insight}</div>}
                </div>
                
              </div>
            </div>
            <div className="col-6">
              <div className="key-card-grid mb-3">
                {keyCard && keyCard.length > 0 && keyCard?.map((data, index) => {
                  return <KeyCard key={index.toString()} data={data}/>
                })}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row mb-4">
            <div className="col-6">
                <div className="row">
                  <div className="col-11">
                    <div className="section-label-box">
                      <div className="cardLabel f-24 ml-n-25">Daily Volume Analysis</div>
                    </div>
                    <DailyVolumeAnalysis dailyVolumeAnalysis={momentumData?.dailyVolumeAnalysis}/>
                  </div>
                </div>
            </div>
            <div className="col-6 active-candle-sticks">
                <div className="section-label-box">
                    <div className="cardLabel f-24">Active Candlesticks</div>
                </div>
                <div className="list">
                  <div className="card">
                    <div className="grey">Bullish Candlestick Pattern</div>
                    <div className="card-content">
                      {bullishCandlestick && bullishCandlestick.length > 0  ? bullishCandlestick.map(item => {
                        return (<div className="bullish-item" key={item.name}>
                        <div className="candle">
                          <div className="line"></div>
                          <div className={`candle-card bg-${item?.color}`}></div>
                        </div>
                        <span className={`f-14 f-semibold text-${item?.color}`}>{item.name}</span>
                      </div>)
                      }) : "No active candlesticks"}  
                    </div>
                  </div>
                  <div className="card">
                    <div className="grey">Bearish Candlestick Patterns</div>
                    <div className="card-content">
                      {bearishCandlestick && bearishCandlestick.length > 0  ? bearishCandlestick.map(item => {
                        return (<div className="bullish-item" key={item.name}>
                        <div className="candle">
                          <div className="line"></div>
                          <div className={`candle-card bg-${item?.color}`}></div>
                        </div>
                        <span className={`f-14 f-semibold text-${item?.color}`}>{item.name}</span>
                      </div>)
                      }) : "No active candlesticks"}    
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer page={7} />
    </div>
  );
};

export default Momentum;