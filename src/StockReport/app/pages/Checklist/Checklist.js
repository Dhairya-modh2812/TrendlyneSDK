import React, { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Checklist.module.scss";
import {
  dateFormatter,
  formatNumber,
  percentageRender,
} from "../../utils/commonFunctions";
import QuestionCard from "./components/QuestionCard";
import LinearLineBar from "./components/LinearLineBar";
import CategoryNumers from "./components/CategoryNumers";
import Footer from "../../components/Footer";

const Checklist = (props) => {
  let { reportData } = props;
  const {
    stockData,
    page1
  } = reportData;
  const { categoryPassData, passP, totalFail, totalPass } = page1?.checklistData;
  const financialsCate = categoryPassData?.financialsData;
  const ownershipCate = categoryPassData?.ownershipData;
  const peerComparisonCate = categoryPassData?.peerComparisonData;
  const valueAndMomentumCate = categoryPassData?.valueAndMomentumData;

  const financialsData = page1?.checklistData?.questionsData?.financialsData;
  const valueAndMomentumData = page1?.checklistData?.questionsData?.valueAndMomentumData;
  const ownershipData = page1?.checklistData?.questionsData?.ownershipData;
  const peerComparisonData = page1?.checklistData?.questionsData?.peerComparisonData;


  return (
    <div className="container-fluid page-2 checklist-page">
      <Header stockData={stockData} />
      <div className="content">
        <div className="section-label-box">
          <div className="cardLabel f-24 ml-n-25">Checklist Summary</div>
        </div>
        <div className="summary-grid mb-3">
          
          
          <div className="box main-summary">
            <h6 className="title f-semibold">Trendlyne Checklist Score</h6>
            <div className="number mb-3">
              <p className="text-success f-48 flex-end">{formatNumber(passP, 1)} 
                <span className="f-20 f-regular">% pass</span>
              </p>
              <div className="float-right f-14"><CategoryNumers yes={totalPass} no={totalFail} /></div>
            </div>
            <LinearLineBar yes={totalPass} no={totalFail}/>
          </div>
          
          
          <div className="equal-sign px-2">=</div>
          
          <div>
          <div className="summary-items">
            <div className="item">
              <h6 className="title f-semibold">Financial <div className="float-right"> <CategoryNumers yes={financialsCate.Yes} no={financialsCate.No} neutral={financialsCate.Neutral} /></div></h6>
              <LinearLineBar yes={financialsCate.Yes} no={financialsCate.No} neutral={financialsCate.Neutral}/>
            </div>
            <div className="divider">
              <span className="plus-sign">+</span>
            </div>
            <div className="item">
              <h6 className="title f-semibold">Value & Momentum <div className="float-right"> <CategoryNumers yes={valueAndMomentumCate.Yes} no={valueAndMomentumCate.No} neutral={valueAndMomentumCate.Neutral} /></div></h6>
              <LinearLineBar yes={valueAndMomentumCate.Yes} no={valueAndMomentumCate.No} neutral={valueAndMomentumCate.Neutral}/>
            </div>
            <div className="divider">
              <span className="plus-sign">+</span>
            </div>
            <div className="item">
              <h6 className="title f-semibold">Ownership <div className="float-right"><CategoryNumers yes={ownershipCate.Yes} no={ownershipCate.No} neutral={ownershipCate.Neutral} /></div></h6>
              <LinearLineBar yes={ownershipCate.Yes} no={ownershipCate.No} neutral={ownershipCate.Neutral}/>
            </div>
            <div className="divider">
              <span className="plus-sign">+</span>
            </div>
            <div className="item">
              <h6 className="title f-semibold">Peer Comparison <div className="float-right"><CategoryNumers yes={peerComparisonCate.Yes} no={peerComparisonCate.No} neutral={peerComparisonCate.Neutral} /></div></h6>
              <LinearLineBar yes={peerComparisonCate.Yes} no={peerComparisonCate.No} neutral={peerComparisonCate.Neutral}/>
            </div>
          </div>
          </div>
          
          {/* <div className="col-12">
            <div className="summary-list">
              <div className="box">
                <h6 className="title f-semibold">Trendlyne Checklist Score</h6>
                <p className="number text-success f-48 d-flex align-items-end">{formatNumber(passP, 1)}% 
                  <span className="f-20 f-regular">pass</span>
                  <div className="float-right f-14"><span className="text-success">{totalPass }</span> | <span className="text-negative">{totalFail}</span></div>
                </p>
              </div>
              <div className="equal-sign px-2">=</div>
              <div className="summary-items">
                <div className="item">
                  <h6 className="title f-semibold">Trendlyne Checklist Score <div className="float-right">2 | 3</div></h6>
                  <p className="">47.8% </p>
                </div>
                <div className="divider"></div>
                <div className="item">
                  <h6 className="title f-semibold">Trendlyne Checklist Score</h6>
                  <p className="">47.8% </p>
                </div>
                <div className="divider"></div>
                <div className="item">
                  <h6 className="title f-semibold">Trendlyne Checklist Score</h6>
                  <p className="">47.8% </p>
                </div>
                <div className="divider"></div>
                <div className="item">
                  <h6 className="title f-semibold">Trendlyne Checklist Score</h6>
                  <p className="">47.8% </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="section-label-box">
                  <div className="cardLabel f-24 ml-n-25">Financial</div>
                </div>
              </div>
              <QuestionCard list={financialsData}/>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="section-label-box">
                  <div className="cardLabel f-24 ">Value & Momentum</div>
                </div>
              </div>
              <QuestionCard list={valueAndMomentumData}/>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="section-label-box">
                  <div className="cardLabel f-24 ml-n-25">Ownership</div>
                </div>
              </div>
              <QuestionCard list={ownershipData}/>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="section-label-box">
                  <div className="cardLabel f-24 ">Peer Comparison</div>
                </div>
              </div>
              <QuestionCard list={peerComparisonData}/>
            </div>
          </div>
        </div>
        
      </div>
      <Footer page={8} />
    </div>
  );
};

export default Checklist;