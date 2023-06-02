import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Highcharts from 'highcharts';
import HcMore from "highcharts/highcharts-more";
import { NumberWithSign, isEmpty, formatNumber, percentageRender } from '../../utils/commonFunctions';
import Table from '../../components/Table';
import styles from './StockReport4.module.scss';
import ReactTable from '../../components/ReactTable/ReactTable';
import ComparisionChart from '../../components/PeerTableChart';
import { peerTableColumnChart } from '../../utils/chart/chart';
import Footer from '../../components/Footer';
HcMore(Highcharts);

const TB_BG_SUCCESS = "--tb-bg-success"
const TB_BG_WARNING = "--tb-bg-warning"
const TB_BG_DANGER = "--tb-bg-danger"

const StockReport4 = (props) => {
    const {reportData} = props;
    const {
        page3, 
        stockData, 
        peerComparisonTabledata
    } = reportData;
   
    const columns =[
        {
          Header: '',
          accessor: 'name',
          Cell: function(cell) {
            return <>{cell.value}</>
          }
        },
        {
          Header: 'COMPARISON',
          accessor: 'comparision',
          headerClassName: 'text-center',
          className: ' p-0 text-center sparkline-chart',
          Cell: function(cell) {
            return <>
                <ComparisionChart series={cell.value}/>
            </>
          }
        },
        {
            Header: 'Comapnay 1',
            headerClassName: 'text-center',
            Cell: function(cell) {
                let rowIndex = cell.row.index;
                let Cell = rowAccessor[rowIndex].Cell;
                return <>{Cell ? Cell(cell) : cell.value}</>
            }
        },
        {
            Header: 'Comapnay 2',
            headerClassName: 'text-center',
            Cell: function(cell) {
                return <>{percentageRender(cell.value)}</>
            }
        },
        {
            Header: 'Comapnay 3',
            headerClassName: 'text-center',
        },
        {
            Header: 'Comapnay 4',
            headerClassName: 'text-center',
        },
        {
            Header: 'Comapnay 5',
            headerClassName: 'text-center',
        },
        {
            Header: 'Comapnay 6',
            headerClassName: 'text-center',
        },
        {
            Header: 'Comapnay 7',
            headerClassName: 'text-center',
        }
    ];
    let sparkline = peerTableColumnChart();

    const columnsTable = [
        { id: 0, name: "", key: "name", Cell: (data) => {
          return <>{data.name}</>
        }},
        { id: 1, name: "comparison", key: "comparison" }
    ];
    const rowAccessor = [{
        label: "Valuation Score",
        key: "VALUATION_METRIC_val",
        unit: "",
        Cell: function(cell) {
            return <><RenderDVM cell={cell}/></>
        }
    },
    {
        label: "P/E Ratio TTM",
        key: "PE_TTM",
        unit: "%",
        Cell: function(cell) {
            return <><OperatingProfitMarginP cell={cell}/></>
        }
    },
    {
        label: "Forward P/E Ratio",
        key: "forward_pe",
        unit: "",
        Cell: function(cell) {
            return <><PitroskiRender cell={cell}/></>
        }
    },
    {
        label: "PEG Ratio TTM",
        key: "PEG_TTM",
        unit: "%",
        Cell: function(cell) {
            return <><TaxRateRender cell={cell}/></>
        }
    },
    
    {
        label: "Forward PEG Ratio",
        key: "forward_peg",
        unit: "%",
        Cell: function(cell) {
            return <><RoeAndRoARender cell={cell} /></>
        }
    },
    {
        label: "Price to Book Value",
        key: "PBV_A",
        unit: "%",
        Cell: function(cell) {
            return <><RoeAndRoARender cell={cell} /></>
        }
    },
    {
        label: "Price to Sales TTM",
        key: "PS_A",
        unit: "%",
        Cell: function(cell) {
            return <><RoeAndRoARender cell={cell} /></>
        }
    },
    {
        label: "Price to Sales Annual",
        key: "PriceToSales_A",
        unit: "",
        Cell: function(cell) {
            return <><DebtToEquityRender cell={cell}/></>
        }
    },
    {
        label: "EV to EBITDA",
        key: "EVPerEBITDA_A",
        unit: "",
        Cell: function(cell) {
            return <><CurrentRaito cell={cell}/></>
        }
    },
    {
        label: "Market Cap to Sales",
        key: "MarketCapPerSales_A",
        unit: "",
        Cell: function(cell) {
            return <><InterestCoverageRatio cell={cell}/></>
        }
    },
    {
        label: "Price to Free Cash Flow",
        key: "NCF_A",
        unit: "",
        Cell: function(cell) {
            return <><InterestCoverageRatio cell={cell}/></>
        }
    },{
        label: "GRAHAM_NUMBER",
        key: "GRAHAM_NUMBER",
        unit: "",
        Cell: function(cell) {
            return <><InterestCoverageRatio cell={cell}/></>
        }
    }]
    // let dataTable = [ ];

    // let final = [];
    let reactRows = [];
    let reactCols = [];
    let comparisionStaticChart = [];
    rowAccessor && rowAccessor.forEach((data, dataIndex) => {
        let comparisonData = [];
        let dataArray = [];
        let finalData = [];
        finalData.push(data.label);
        let reactObj = {};
        let reactColsObj = {};
       

        peerComparisonTabledata && peerComparisonTabledata.forEach((item, index) => {
            if(index < peerComparisonTabledata.length) {
                reactColsObj['check'] = item[data.key];
                reactColsObj = {...columns[index + 2], ...reactColsObj}
                reactColsObj[`accessor`] = `${ 'company' + (dataIndex + 1)}`;
                if(peerComparisonTabledata[dataIndex]?.get_full_name) {
                    reactColsObj['Header'] = () => {
                        return <>{peerComparisonTabledata[dataIndex]?.get_full_name} <div>({dataIndex + 1})</div></>
                    }; 
                }
            }
            reactObj['name'] = rowAccessor[dataIndex]?.label;
            // reactObj[`${'company' + (index + 1)}`] = item[data.key] ? item[data.key] : '';
            reactObj[`${'company' + (index + 1)}`] = item[data.key] ? item[data.key] : '';
            reactObj['comparision'] = item[data.key];

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
        reactObj['comparision'] = comparisonData;
        reactRows.push(reactObj);   

        if(reactColsObj.check && dataIndex < peerComparisonTabledata.length) {
            reactColsObj['comparision'] = comparisonData
            reactCols.push(reactColsObj);
        }

        // final = [...finalData, comparisonData, ...dataArray];
        // dataTable.push(final)
    });
    peerComparisonTabledata && peerComparisonTabledata.forEach(item => {
        if((item.BSECode == stockData.BSEcode) || (item.NSECode == stockData.NSEcode)) {
            comparisionStaticChart.push({y: 1, color: "#006aff"});
        }else {
            comparisionStaticChart.push(1);   
        }
    })
    reactCols.unshift(
        {
          Header: (row) => {
            let spOption = {
                ...sparkline,
                chart: {
                    ...sparkline.chart,
                    height: 25,
                    marginTop: 3,
                    marginBottom: 0,
                },
                plotOptions: {
                    ...sparkline.plotOptions,
                    series: {
                        ...sparkline.plotOptions.series,
                        dataLabels: {
                            ...sparkline.plotOptions.series.dataLabels,
                            enabled: true,
                            useHTML: true,
                            formatter: function () {
                                return this.x + 1
                            },
                            style: {
                              fontSize: "10px",
                              fontWeight: 600,
                              fontFamily: "Lato Semibold"
                            },
                        },
                    }
                },
                series: [{
                    data: comparisionStaticChart
                }]
            }
            
            return <>COMPARISON
                <ComparisionChart series={comparisionStaticChart} option={spOption}/>
            </>
          },
          accessor: 'comparision',
          headerClassName: 'text-center sparkline-chart',
          className: ' p-0 text-center sparkline-chart',
          Cell: function(cell) {
            let spOption = {
                ...sparkline,
                series: [{
                    data: cell.value
                }]
            }
            return <>
                <ComparisionChart series={cell.value} option={spOption}/>
            </>
          }
        }
    )
    reactCols.unshift(
        {
            Header: '',
            accessor: 'name',
            headerClassName: 'text-center w-250',
            Cell: function(cell) {
              return <>{cell.value}</>
            }
          }
    )
    
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
                    <div className="col-12 durability-table">
                        {/* <ReactTable
                        columns={columns}
                        data={data}
                        getColumnProps={(column) => ({
                            className: "",
                        })}
                        /> */}
                        {/* <Table 
                            id="balanceTable" 
                            columns={columnsTable} 
                            data={dataTable} 
                            rows={dataTable}
                        /> */}
                        <ReactTable 
                            columns={reactCols}
                            data={reactRows}
                            getColumnProps={(row) => {
                                return {}
                            }}
                        />
                    </div>
                </div>
            </div>
            <Footer page={4} />
        </div>
    );
}
 
export default StockReport4;

const RenderDVM = (props) => {
    let cell = props.cell;
    let colorName = cell.value > 55 ? TB_BG_SUCCESS : (cell.value >= 35 && cell.value <= 55 )? TB_BG_WARNING : TB_BG_DANGER;
    return <div>{cell.value}</div>
}
const TaxRateRender = (props) => {
    let cell = props.cell;
    let colorName = cell.value > 23 ? TB_BG_SUCCESS : (cell.value >= 21 && cell.value <= 23 )? TB_BG_WARNING : TB_BG_DANGER;
    return <div>{percentageRender(cell.value)}</div>
}
const PitroskiRender = (props) => {
    let cell = props.cell;
    let colorName = cell.value > 6 ? TB_BG_SUCCESS : (cell.value >= 3 && cell.value <= 6 )? TB_BG_WARNING : TB_BG_DANGER;
    return <div>{formatNumber(cell.value, 1)}</div>
}
const DebtToEquityRender = (props) => {
    let cell = props.cell;
    let colorName = '';
    if(cell.value) {
        colorName = cell.value >= 0 && cell.value < 0.5 ? TB_BG_SUCCESS : (cell.value >= 0.5 && cell.value <= 1 )? TB_BG_WARNING : TB_BG_DANGER;
    }
    return <div>{formatNumber(cell.value, 1)}</div>
}
const CurrentRaito = (props) => {
    let cell = props.cell;
    let colorName = '';
    if(cell.value) {
        colorName = cell.value >= 1.5 ? TB_BG_SUCCESS : (cell.value >= 1 && cell.value <= 1.5 )? TB_BG_WARNING : TB_BG_DANGER;
    }
    return <div>{formatNumber(cell.value, 1)}</div>
}
const InterestCoverageRatio = (props) => {
    let cell = props.cell;
    let colorName = '';
    if(cell.value) {
        colorName = cell.value >= 2 ? TB_BG_SUCCESS : (cell.value >= 1 && cell.value <= 2 )? TB_BG_WARNING : TB_BG_DANGER;
    }
    return <div>{formatNumber(cell.value, 1)}</div>
}
const RecievableTurnRatio = (props) => {
    let cell = props.cell;
    let colorName = '';
    if(cell.value) {
        colorName = cell.value >= 2 ? TB_BG_SUCCESS : (cell.value >= 1 && cell.value <= 2 )? TB_BG_WARNING : TB_BG_DANGER;
    }
    return <div>{formatNumber(cell.value, 1)}</div>
}
const RoeAndRoARender = (props) => {
    let cell = props.cell;
    let colorName = '';
    if(cell.value) {
        colorName = cell.value >= 2 ? TB_BG_SUCCESS : (cell.value >= 1 && cell.value <= 2 )? TB_BG_WARNING : TB_BG_DANGER;
    }
    return <div>{percentageRender(cell.value)}</div>
}
const OperatingProfitMarginP = (props) => {
    let cell = props.cell;
    let colorName = '';
    if(cell.value) {
        colorName = cell.value >= 2 ? TB_BG_SUCCESS : (cell.value >= 1 && cell.value <= 2 )? TB_BG_WARNING : TB_BG_DANGER;
    }
    return <div>{percentageRender(cell.value)}</div> 
}

function getDurabilityOpacity(value, high, middleHigh, middleLow, low) {
    let result;
    if(value > middleHigh) {
        let diff = Math.abs(high - middleHigh);
        result = (value - middleHigh) * 100 / diff;
    }else if(value >= middleLow && value <= middleHigh) {
        let diff = Math.abs(middleHigh - middleLow);
        result = (value - middleLow) * 100 / diff;
    }else {
        let diff = Math.abs(middleLow - low);
        result = (value - low) * 100 / diff;
    }
    let opacity = result / 100;
    if(opacity == 0) {
        opacity = 0.1;
    }
    return opacity;
}