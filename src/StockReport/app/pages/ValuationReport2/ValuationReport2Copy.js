import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Highcharts from 'highcharts';
import HcMore from "highcharts/highcharts-more";
import { NumberWithSign, isEmpty, formatNumber, percentageRender, getDictionaryToList } from '../../utils/commonFunctions';
import Table from '../../components/Table';
import FinancialCard from '../Valuation/components/FinancialCard';
import styles from './ValuationReport2.module.scss';
import ComparisionChart from '../../components/PeerTableChart';
import { peerTableColumnChart } from '../../utils/chart/chart';
import ReactTable from '../../components/ReactTable/ReactTable';
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

    let sparkline = peerTableColumnChart();

    const valutaionMetrics = annualDataDump ? annualDataDump.valutaionMetrics : null;
    let valutaionMetricsData = getDictionaryToList(valutaionMetrics);

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

    const columnsTable = [
        { id: 0, name: "", key: "name", Cell: (data) => {
          return <>{data.name}</>
        }},
        { id: 1, name: "comparison", key: "comparison" }
    ];
    // const [reactRows, setReactRows] = useState([])
    // const [reactCols, setReactCols] = useState([])
    let reactRows = [];
    let reactCols = [];
    let comparisionStaticChart = [];

    const rowAccessor = [{
        label: "Valuation Score",
        key: "valuationScore",
        unit: "",
        Cell: function(cell) {
            return <><RenderDVM cell={cell}/></>
        }
    },
    {
        label: "P/E Ratio TTM",
        key: "PERatioTTM",
        unit: "",
        Cell: function(cell) {
            return <><PERatioTTM cell={cell}/></>
        }
    },
    {
        label: "Forward P/E Ratio",
        key: "ForwardPERatio",
        unit: "",
        Cell: function(cell) {
            return <><ForwardPERatioTTM cell={cell}/></>
        }
    },
    {
        label: "PEG Ratio TTM",
        key: "PEGRatioTTM",
        unit: "",
        Cell: function(cell) {
            return <><PEGRatioTTM cell={cell} keyValue={'PEGRatioTTM'} peerData={peerComparisonTabledata}/></>
        }
    },
    {
        label: "Forward PEG Ratio",
        key: "ForwardPEGRatio",
        unit: "",
        Cell: function(cell) {
            return <><ForwardPEGRatioTTM cell={cell}/></>
        }
    },
    {
        label: "Price to Book Value",
        key: "PriceToBookValue",
        unit: "",
        Cell: function(cell) {
            return <><PriceToBook cell={cell}/></>
        }
    },
    {
        label: "Price to Sales TTM",
        key: "PriceToSalesTTM",
        unit: "",
        Cell: function(cell) {
            return <><PriceToSaleTTM cell={cell} keyValue={'PriceToSalesTTM'} peerData={peerComparisonTabledata}/></>
        }
    },
    {
        label: "Price to Sales Annual",
        key: "PriceToSalesAnnual",
        unit: "",
        Cell: function(cell) {
            return <><PriceToSaleAnnual cell={cell} keyValue={'PriceToSalesAnnual'} peerData={peerComparisonTabledata}/></>
        }
    },
    {
        label: "EV to EBITDA",
        key: "EVToEBITDA",
        unit: "",
        Cell: function(cell) {
            return <><EVToEBITDA cell={cell} keyValue={'EVToEBITDA'} peerData={peerComparisonTabledata}/></>
        }
    },
    {
        label: "Market Cap to Sales",
        key: "MarketCapPerSalesAnnual",
        unit: "",
        Cell: function(cell) {
            return <><MarketCapToSale cell={cell} keyValue={'MarketCapPerSalesAnnual'} peerData={peerComparisonTabledata}/></>
        }
    },
    {
        label: "Graham Score",
        key: "grahamNumber",
        unit: "",
        Cell: function(cell) {
            return <><GrahamNumber cell={cell} keyValue={'grahamNumber'} peerData={peerComparisonTabledata}/></>
        }
    }]
    let dataTable = [ ];

    let final = [];

    rowAccessor && rowAccessor.forEach((data, dataIndex) => {
        let comparisonData = [];
        let dataArray = [];
        let finalData = [];
        finalData.push(data.label)

        let reactObj = {};
        let reactColsObj = {};

        peerComparisonTabledata && peerComparisonTabledata.forEach((item, index) => {
            if(index < peerComparisonTabledata.length) {
                reactColsObj['check'] = item[data.key];
                reactColsObj = {...columns[index + 2], ...reactColsObj}
                reactColsObj[`accessor`] = `${ 'company' + (dataIndex + 1)}`;
                if(peerComparisonTabledata[dataIndex]?.name) {
                    reactColsObj['Header'] = () => {
                        return <>{peerComparisonTabledata[dataIndex]?.name} <div>({dataIndex + 1})</div></>
                    }; 
                }
            }
            reactObj['name'] = rowAccessor[dataIndex]?.label;
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
            
        }
        if(dataIndex < peerComparisonTabledata.length) {
            reactCols.push(reactColsObj);
        }
        final = [...finalData, comparisonData, ...dataArray];
        dataTable.push(final)
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
            headerClassName: 'text-center',
            Cell: function(cell) {
              return <>{cell.value}</>
            }
          }
    )

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
                    <div className="col-12 durability-table">
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
        </div>
    );
}
 
export default ValuationReport2;

const RenderDVM = (props) => {
    let cell = props.cell;
    let className = cell.value > 50 ? 'text-success' : (cell.value >= 30 && cell.value <= 50 )? 'text-warning' : 'text-danger';
    return <div>{formatNumber(cell.value,1)}</div>
}

const PERatioTTM = (props) => {
    let {cell, key, peerData} = props.cell;
    let colorName = '';
    return <div>{formatNumber(cell.value, 1)}</div> 
}
const ForwardPERatioTTM = (props) => {
    let cell = props.cell;
    let colorName = '';
    return <div >{formatNumber(cell.value, 1)}</div> 
}
const PEGRatioTTM = (props) => {
    let {cell, peerData, keyValue} = props;
    const textColor = getColorsBasedOnCompanys(peerData, cell.value, keyValue)
    return <div >{formatNumber(cell.value, 1)}</div> 
}
const ForwardPEGRatioTTM = (props) => {
    let cell = props.cell;
    let colorName = '';
    return <div >{formatNumber(cell.value, 1)}</div> 
}

const PriceToBook = (props) => {
    let cell = props.cell;
    let colorName = '';
    return <div >{formatNumber(cell.value, 1)}</div> 
}
const PriceToSaleTTM = (props) => {
    let {cell, peerData, keyValue} = props;
    const textColor = getColorsBasedOnCompanys(peerData, cell.value, keyValue)
    return <div >{formatNumber(cell.value, 1)}</div> 
}
const PriceToSaleAnnual = (props) => {
    let {cell, peerData, keyValue} = props;
    const textColor = getColorsBasedOnCompanys(peerData, cell.value, keyValue)
    return <div >{formatNumber(cell.value, 1)}</div> 
}
const EVToEBITDA = (props) => {
    let {cell, peerData, keyValue} = props;
    const textColor = getColorsBasedOnCompanys(peerData, cell.value, keyValue)
    return <div >{formatNumber(cell.value, 1)}</div> 
}
const MarketCapToSale = (props) => {
    let {cell, peerData, keyValue} = props;
    const textColor = getColorsBasedOnCompanys(peerData, cell.value, keyValue)
    return <div >{formatNumber(cell.value, 1)}</div> 
}
const GrahamNumber = (props) => {
    let {cell, peerData, keyValue} = props;
    const textColor = getColorsBasedOnCompanys(peerData, cell.value, keyValue)
    return <div>{formatNumber(cell.value, 1)}</div> 
}

const getColorsBasedOnCompanys = (peersData, value, key) => {
    if(!value) {
        return "";
    }
    let sorted = peersData && peersData.sort((a, b) => b[key] - a[key]);
    const index = sorted.findIndex(item => item[key] == value);
    if(index != -1) {
        if(index >= 0 && index <= 1) {
            return "text-success"
        }else if(index >= 2 && index <= 4) {
            return "text-warning"
        }else {
            return "text-danger"
        }
    }
    return ''
}