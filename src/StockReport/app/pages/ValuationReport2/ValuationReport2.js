import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Highcharts from 'highcharts';
import HcMore from "highcharts/highcharts-more";
import { NumberWithSign, isEmpty, formatNumber, percentageRender, getDictionaryToList } from '../../utils/commonFunctions';
import Table from '../../components/Table';
import FinancialCard from '../Valuation/components/FinancialCard';
import styles from './ValuationReport2.module.scss';

HcMore(Highcharts);
const ValuationReport2 = (props) => {
    const {reportData} = props;
    const {
        page3, 
        stockData, 
        peerComparisonTabledata,
        financialsData: {
            annualDataDump = {}
        } = {}
    } = reportData;
    
    const valutaionMetrics = annualDataDump ? annualDataDump.valutaionMetrics : null;
    let valutaionMetricsData = getDictionaryToList(valutaionMetrics);
    const columnsTable = [
        { id: 0, name: "", key: "name", Cell: (data) => {
          return <>{data.name}</>
        }},
        { id: 1, name: "comparison", key: "comparison" }
    ];
    const rowAccessor = [{
        label: "Valuation Score",
        key: "valuationScore",
        unit: ""
    },
    {
        label: "P/E Ratio TTM",
        key: "PERatioTTM",
        unit: ""
    },
    {
        label: "Forward P/E Ratio",
        key: "ForwwardPERatio",
        unit: ""
    },
    {
        label: "PEG Ratio TTM",
        key: "PEGRatioTTM",
        unit: ""
    },
    {
        label: "Forward PEG Ratio",
        key: "ForwardPEGRatio",
        unit: ""
    },
    {
        label: "Price to Book Value",
        key: "PriceToBookValue",
        unit: ""
    },
    {
        label: "Price to Sales TTM",
        key: "PriceToSalesTTM",
        unit: ""
    },
    {
        label: "Price to Sales Annual",
        key: "PriceToSalesAnnual",
        unit: ""
    },
    {
        label: "EV to EBITDA",
        key: "EVToEBITDA",
        unit: ""
    },
    {
        label: "Market Cap to Sales",
        key: "MarketCapPerSalesAnnual",
        unit: ""
    },
    {
        label: "Graham Score",
        key: "grahamNumber",
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
        <div className="container-fluid page-2 stockreport">
            <Header stockData={stockData}/>
            <div className="content">
                {valutaionMetricsData && <div className="row">
                    { valutaionMetricsData && valutaionMetricsData.slice(4).map((financial, index) => {
                    return <FinancialCard key={index} data={financial} chartType={index > 3 ? 'area' : 'column'}/>
                    })}
                </div>}
                <div className="row mb-5">
                    <div className="col-12">
                        <div className='section-label-box'>
                            <div className="cardLabel f-24 ml-n-25">Key Metrics - Peer Comparison</div>
                        </div>
                    </div>
                    <div className="col-12">
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
 
export default ValuationReport2;