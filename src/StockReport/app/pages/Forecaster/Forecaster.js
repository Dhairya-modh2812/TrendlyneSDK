import React, { Fragment, useState } from "react";
import Header from "../../components/Header/Header";
import { getDictionaryToList, isEmpty, percentageRender } from "../../utils/commonFunctions";
import AnalysisRecomdation from "./components/AnalysisRecomdation";
import PriceTarget from "./components/PriceTarget";
import { areaLineEstimateChartCard } from "./components/chartOptionCal";
import AverageEstimateCard from "./components/AverageEstimateCard";
import SharePriceChart from "./components/SharePriceChart";
import Footer from "../../components/Footer";
const Forecaster = (props) => {
  let { reportData } = props;
  const {
    stockData,
    page1,
    forecasterData,
  } = reportData;
  const { forecasterTarget } = page1;
  
  if(isEmpty(forecasterData)) {	
    return <></>	
  }
  const surprisesData = {...forecasterData?.SURPRISES};
  const recommendation = forecasterData?.RECOMMENDATION;
  const seo = forecasterData?.SEO;
  let targetPrice = surprisesData['TARGET_PRICE']; 
  delete surprisesData['ANALYST_RECOMMENDATION']
  delete surprisesData['TARGET_PRICE']
  // check if surprisesData , recommendation and target price is empty then return empty tag
  if(isEmpty(surprisesData) && isEmpty(recommendation) && targetPrice &&  isEmpty(targetPrice)) {
    return <></>
  }
  
  

  let parseData = getDictionaryToList(surprisesData).reverse();
  
  // remove the empty object data from list
  parseData = parseData.filter(item => !isEmpty(item))
  const {avgTarget, consensusRecommendation, upsideP} = forecasterTarget;

  let insight = null;
  if(recommendation.length > 0) {
    insight = recommendation[recommendation.length - 1]?.INSIGHT?.st
  }
  return (<Fragment>
    <div className="container-fluid page-2 forecaster">
      <Header stockData={stockData} />
      <div className="content">
        <div className="row">
          <div className="col-12">
            <h1 className="main-title f-semibold">Forecaster</h1>
          </div>
          <div className="col-6 pr-4">
            <div className="row">
              <div className="col-12">
                <div className="section-label-box">
                  <div className="cardLabel f-24 ml-n-25">Consensus Recommendation</div>
                </div>
                <p className="f-regular f-16">Consensus Recommendation</p>
                {consensusRecommendation ? 
                  <p className={`f-24 f-bold ${consensusRecommendation?.toLowerCase()}`}> {consensusRecommendation}</p> 
                  : <p className={`f-24 f-regular`}> - </p> 
                }

                <AnalysisRecomdation page1={page1} recommendation={recommendation}/>
                {insight && <div className="dvm-summary">
                  {insight}
                </div>}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="section-label-box">
                  <div className="cardLabel f-24 ">Share Price Target</div>
                </div>
                <p className="f-regular f-16">Share Price Target (Avg)</p>
                {avgTarget ? 
                  <p className={`f-24 f-bold ${consensusRecommendation?.toLowerCase()}`}>₹ {avgTarget} <span className="f-14 f-semimedium">({percentageRender(upsideP)} upside)</span></p> 
                : <p className={`f-24 f-regular`}> - </p> }

                {targetPrice && <div className="py-3">
                  <SharePriceChart ANNUAL={targetPrice?.ANNUAL}/>
                </div>}
                {targetPrice && !isEmpty(targetPrice) && !isEmpty(targetPrice?.INSIGHT?.ANNUAL) && <div className="dvm-summary">
                  {targetPrice?.INSIGHT?.ANNUAL?.forwardInsight?.lt}
                </div>}
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="section-label-box">
              <div className="cardLabel f-24 ml-n-25">Key Metrics - Average Estimates</div>
            </div>
          </div>
          <div className="col-12">
            <div className="card-grid">
              {forecasterData && parseData.slice(0,6).map((data, index) => {
                return <AverageEstimateCard key={index.toString()} data={data}/>
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer page={9} />
    </div>
    {forecasterData && parseData.length > 6 &&  <div className="container-fluid page-2 forecaster">
      <Header stockData={stockData} />
      <div className="content">
          <div className="row">
            <div className="col-12">
              <div className="card-grid">
                {forecasterData && parseData.slice(6).map((data, index) => {
                  return <AverageEstimateCard key={index.toString()} data={data}/>
                })}
              </div>
            </div>
          </div>
      </div>
      <Footer page={10} />
    </div>}
    </Fragment>
  );
};

export default Forecaster;