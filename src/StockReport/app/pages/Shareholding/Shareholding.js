import React, { Fragment, useRef, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Table } from 'react-bootstrap';
import { getDictionaryToList, isEmpty, numberWithCommas, percentageRender } from "../../utils/commonFunctions";
import PeersChart from "./components/PeersChart";
import LineChart from "./components/LineChart";
import { calculateShareholderLineChart, getMajorShareholders, mfChartCalculation } from "./components/chartCalculation";
import Insights from "./components/Insights";
import ReactCustomTable from "./components/CustomTable";
import moment from "moment";
import BulkBlockDeal from "./components/BulkBlockDeal";
import InsiderTrading from "./components/InsiderTrading";
import MFChart from "./components/MFChart";
import {getTrendInsightArrow} from '../../utils/Constants/commonAssets';
import Footer from "../../components/Footer";

const Shareholding = (props) => {
  let { reportData } = props;
  const highChartRef = useRef();
  const {
    stockData,
    shareholdingData,
    mfData,
    BBdealsdata,
    insiderSASTdata
  } = reportData;

  const [highestSector, setHighestSector] = useState();
  
  const { pieChartData, insights, barChartColorInsight = null} = shareholdingData;
  
  const chart_data_total_holdings = !isEmpty(mfData?.chartData) ? mfData?.chartData?.chart_data_total_holdings : [];
 
  let columnOptions = calculateShareholderLineChart(shareholdingData);
  
  let mfChartOptions = mfChartCalculation(chart_data_total_holdings)
  
  let {superStarTable, promotorTableData, fiiTableData, diiTableData, latestDate} = getMajorShareholders(shareholdingData);
  const ownerList = [{ ...superStarTable }, { ...promotorTableData }, { ...fiiTableData }, { ...diiTableData }];
  
  let tableColumns = [{
    heading: "Name",
    key: 'name'
  }, {
    heading: "Shares %",
    key: 'holdingPercentage',
    columnClassName: 'text-right w-25',
    formatter: ({row}) => {
      return <>{percentageRender(row.holdingPercentage)}</>
    }
  }, {
    heading: "Change %",
    key: 'changePercentage',
    columnClassName: 'text-right',
    formatter: ({row}) => {
      let className = row.changePercentage ? row.changePercentage >= 0 ? 'text-success': 'text-danger': '';
      return <div className={className}>{percentageRender(row.changePercentage)}</div>
    }
  }]

  useEffect(() => {
    let max = highChartRef.current.chart.yAxis[0].dataMax;
    let investor = pieChartData?.filter(item => item[1] == max).map(item => ({label: item[0], value: item[1]}));
      if(investor.length > 0) {
        setHighestSector({label: investor[0].label, value: investor[0].value })
      }
  }, [highChartRef])

  // create Shareholding Trend insights
  const createInsight = (column) => {
    let jsx = column?.series?.map((item, index) => {
      let Icon = barChartColorInsight ? getTrendInsightArrow(barChartColorInsight[item.name]) : <></>
      return <span key={index}>{item.name} {Icon} , </span>;
    })

    return jsx 
  }
  return (<Fragment>
    <div className="container-fluid page-2 shareholding">
      <Header stockData={stockData} />
      <div className="content">
        <div className="row">
          {/* <div className="col-12">
            <h1 className="main-title f-semibold">Shareholding</h1>
          </div> */}
          <div className="col-6 pr-4">
            <div className="row">
              <div className="col-11">
                <div className="section-label-box">
                  <div className="cardLabel f-24 ml-n-25">Shareholding Summary</div>
                </div>
                <div className="py-3">
                  <PeersChart ref={highChartRef} pieChartData={pieChartData}/>
                </div>
                
                {highestSector && <div className="dvm-summary">
                  {`Retail investors (${highestSector.label}) form the biggest shareholding segment`}
                </div>}
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <div className="section-label-box">
                  <div className="cardLabel f-24 ">Shareholding Trend</div>
                </div>
                <div className="py-3">
                  <LineChart columnOptions={columnOptions}/>
                </div>
                <div className="dvm-summary">
                  {createInsight(columnOptions)} over the {barChartColorInsight?.qtr} quarter
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="section-label-box">
              <div className="cardLabel f-24 ml-n-25">Mutual Fund Holding and Action</div>
            </div>
          </div>
          <div className="col-7">
            <div className="py-3">
              <MFChart chartOption={mfChartOptions}/>
            </div>
          </div>
          <div className="col-5">
            <Insights insights={insights}/>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-6">
            <div className="section-label-box">
              <div className="cardLabel f-24 ml-n-25">Major Shareholders </div>
              <div className="d-block m-auto">{stockData?.stockName} : {moment(latestDate).format("MMM 'YY")}</div>
            </div>
          </div>
        </div>
        <div className="row">
          {ownerList.map((owner, index) => {
            if (owner.data.length == 0) {
              return <></>
            }
            return <div key={index} className="col-3">
                <div className="card">
                  <div className="card-body">
                    <div className="title">{owner.title}</div>
                    {/* <OwnerTable data={owner.data} /> */}
                    <ReactCustomTable columns={tableColumns} data={owner.data}/>
                  </div>
                </div>
            </div>
          })}
        </div>
        <BulkBlockDeal data={BBdealsdata}/>
      </div>
      <Footer page={11} />
    </div>
    {insiderSASTdata && insiderSASTdata.length > 0 && <div className="container-fluid page-2 shareholding">
      <Header stockData={stockData} />
      <div className="content">
        <InsiderTrading data={insiderSASTdata}/>
      </div>
      <Footer page={12} />
    </div>}
    </Fragment>
  );
};

export default Shareholding;
