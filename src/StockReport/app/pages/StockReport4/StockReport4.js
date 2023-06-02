import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Highcharts from 'highcharts';
import HcMore from "highcharts/highcharts-more";
import { NumberWithSign, isEmpty, formatNumber, percentageRender } from '../../utils/commonFunctions';
import Table from '../../components/Table';
import styles from './StockReport4.module.scss';

HcMore(Highcharts);
const StockReport4 = (props) => {
    const {reportData} = props;
    const {
        page3, 
        stockData, 
        peerComparisonTabledata
    } = reportData;
    
    const columnsTable = [
        { id: 0, name: "", key: "name", Cell: (data) => {
          return <>{data.name}</>
        }},
        { id: 1, name: "comparison", key: "comparison" }
    ];
    const rowAccessor = [{
        label: "Durability Score",
        key: "durabilityScore",
        unit: ""
    },
    {
        label: "Operating Profit Margin %",
        key: "operatingProfitMarginP",
        unit: "%"
    },
    {
        label: "Tax Rate %",
        key: "taxRateP",
        unit: "%"
    },
    {
        label: "Piotroski Score",
        key: "pitroskiScore",
        unit: ""
    },
    {
        label: "ROE %",
        key: "ROCEP",
        unit: "%"
    },
    {
        label: "ROCE %",
        key: "ROEP",
        unit: "%"
    },
    {
        label: "ROA %",
        key: "ROAP",
        unit: "%"
    },
    {
        label: "Debt to Equity Ratio",
        key: "TDEBT_CE_A",
        unit: "%"
    },
    {
        label: "Current Ratio",
        key: "currentRatio",
        unit: ""
    },
    {
        label: "Interest Coverage Ratio",
        key: "interestCoverageRatio",
        unit: ""
    }]
    let dataTable = [ ];

    let final = [];

    rowAccessor && rowAccessor.forEach((data, dataIndex) => {
        let comparisonData = [];
        let dataArray = [];
        let finalData = [];
        finalData.push(data.label)
        peerComparisonTabledata && peerComparisonTabledata.forEach((item, index) => {
            if(data.key) {
                if(index == dataIndex) columnsTable.push({id: index + 1, name: item.name, key: "comparison"});
                
                // check stock code for show active on comparision chart
                if((item.BSECode == stockData.BSEcode) || (item.NSECode == stockData.NSEcode)) {
                    comparisonData.push({y: item[data.key], color: "#006aff"});
                }else {
                    comparisonData.push(item[data.key]);    
                }
                dataArray.push(data.unit == "%" ? percentageRender(item[data.key]) : formatNumber(item[data.key], 1));
            }
        });
        final = [...finalData, comparisonData, ...dataArray];
        dataTable.push(final)
    });

    return ( 
        <div className="container-fluid stockreport">
            <Header stockData={stockData}/>
            <div className="content">
                <div className="row mb-5">
                    <div className="col-12">
                        <div className='section-label-box'>
                            <div className="cardLabel f-24 ml-n-25">Key Metrics - Peer Comparison</div>
                        </div>
                    </div>
                    <div className="col-12">
                        {/* <ReactTable
                        columns={columns}
                        data={data}
                        getColumnProps={(column) => ({
                            className: "",
                        })}
                        /> */}
                        <Table 
                            id="balanceTable" 
                            columns={columnsTable} 
                            data={dataTable} 
                            rows={dataTable}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default StockReport4;