import React, {useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsStock from "highcharts/highstock";
import HcMore from "highcharts/highcharts-more";
import Card from './components/Card';
import { multilineChart , gainerChart} from '../../utils/chart/chart';
// import Header from './components/Header';
import moment from 'moment';
import { formatNumber, numberWithCommas } from '../../utils/commonFunctions';
import styles from './Ownerpage.module.scss';

import { pieChart } from '../../utils/chart/chart';
const OwnershipPage = (props) => {
    
    
    const {reportData} = props;
    const assetPieChart = pieChart();
    const [pieChartOption, setPieChartOption] = useState({});
    const [shareholdingData, setShareholdingData] = useState()
    const [pieLegend, setPieLegend] = useState([]);
    const [superStarTable, setSuperStarTable] = useState({
        title: "Superstar",
        data: []
    })
    const [fiiTableData, setFIITable] = useState({
        title: "FII",
        data: []
    })
    const [diiTableData, setDIITable] = useState({
        title: "DII",
        data: []
    })
    const [promotorTableData, setPromotorTable] = useState({
        title: "Promoters",
        data: []
    })
    const pieChartColor = [{
        name: 'Promoter',
        y: 78867,
        color: "#016aff"
    }, {
        name: 'DII',
        y: 505370,
        color: "#00a25b"
    }, {
        name: 'Public',
        y: 312685,
        color: "#fec542"
    }, {
        name: 'FII',
        y: 551500,
        color: "#fc5a5a"
    }, {
        name: 'Others',
        y: 551500,
        color: "#577cae"
    }];

    const [pieChartData, setPieChartData] = useState(null)
    useEffect(() => {
        if(reportData.shareholdingData) {
            const {shareholdingData} = reportData;
            setPieChartData(shareholdingData.pieChartData);
            setShareholdingData(shareholdingData)
            // const {shareholdingData} = page4;
            // const {pieChartData} = shareholdingData;
            let testObj = shareholdingData.detailedHoldings;

            let superStar = [];
            let fiiTable = [];
            let diiTable = [];
            let promoterTable = [];
            var orderedDates = {};
            Object.keys(testObj).sort(function(a, b) {
                return moment(b, 'DD-MMM-YYYY').toDate() - moment(a, 'DD-MMM-YYYY').toDate();
            }).forEach(function(key, index) {
                if(index <= 2) {
                    orderedDates[key] = testObj[key];
                }
            });
            Object.keys(orderedDates).sort(function(a, b) {
                return moment(b, 'DD-MMM-YYYY').toDate() - moment(a, 'DD-MMM-YYYY').toDate();
            }).forEach(function(key, index) {
                if(index <= 2) {
                    let tableData = orderedDates[key];
                    let sprStar = tableData.publicNonInstitutionalHolding && tableData.publicNonInstitutionalHolding.map(data => {
                        return {
                            name: data.name,
                            qtr : key,
                            shares: numberWithCommas(data.totalShareVolume),
                            sharePer : `${formatNumber(data.holdingPercentage, 1)} %`
                        }
                    })
                    let fii = tableData.FIIHolding && tableData.FIIHolding.map(data => {
                        return {
                            name: data.name,
                            qtr : key,
                            shares: numberWithCommas(data.totalShareVolume),
                            sharePer : `${formatNumber(data.holdingPercentage, 1)} %`
                        }
                    })
                    let dii = tableData.DIIHolding && tableData.DIIHolding.map(data => {
                        return {
                            name: data.name,
                            qtr : key,
                            shares: numberWithCommas(data.totalShareVolume),
                            sharePer : `${formatNumber(data.holdingPercentage, 1)} %`
                        }
                    })
                    let promotor = tableData.promoterHolding && tableData.promoterHolding.map(data => {
                        return {
                            name: data.name,
                            qtr : key,
                            shares: numberWithCommas(data.totalShareVolume),
                            sharePer : `${formatNumber(data.holdingPercentage, 1)} %`
                        }
                    })
                    superStar = [...superStar, ...sprStar];
                    fiiTable = [...fiiTable, ...fii]
                    diiTable = [...diiTable, ...dii]
                    promoterTable = [...promoterTable, ...promotor]
                orderedDates[key] = testObj[key];
                }
            });
            setSuperStarTable(prev => ({...prev, data: superStar}))
            setFIITable(prev => ({...prev, data: fiiTable}))
            setDIITable(prev => ({...prev, data: diiTable}))
            setPromotorTable(prev => ({...prev, data: promoterTable}))
        }
    }, [reportData]);
    useEffect(() => {
        let seriesData = [];
        pieChartData && pieChartData.map((item, i) => {
            if(i == 0) return ;
            let index = pieChartColor.findIndex(chart => {
                return chart.name === item[0];
            });
            seriesData.push({color: pieChartColor[index].color, name: item[0], y: item[1]});
        });
        let option = { 
            ...assetPieChart,
            series : [{
                ...assetPieChart.series[0],
                data: [...seriesData]
            }]
        };
        setPieLegend(seriesData);
        setPieChartOption(option);
    }, [pieChartData]); 

    const [multilineChartOption, setMultilineChartOption] = useState(multilineChart());
    const [gainChart, setGainChart] = useState(null);
    const [mutualChart, setMutualChart] = useState(null);
    
    useEffect(() => {
        let gainChartOption = gainerChart();
        gainChartOption = {
            ...gainChartOption,
            chart: {
                ...gainChartOption.chart,
                height: 200,
                backgroundColor: 'transparent'
            },
            legend: {
                ...gainChartOption.legend,
                enabled: true,
                symbolWidth: 16,
                symboleHeight: 16,
                symbolRadius: 3,
                align: 'left',
                verticalAlign: 'top',
                layout: 'horizontal',
                x: 0,
                y: 0,
            },
            tooltip: {
                enabled: false
            },
            xAxis: {
                ...gainChartOption.xAxis,
                gridLineWidth: 0,
                lineColor: 'transparent',
                tickColor: 'transparent',
                labels: {
                    format: "{value:%b %e}"
                },
                type: "datetime",
                title: {
                    text: "Quarter",
                    y: 10
                }
            },
            yAxis: {
                ...gainChartOption.yAxis,
                visible: true,
                offset: 5,
                title: {
                    text: null
                },
                gridLineWidth: 0,
                plotLines: [{
                    color: '#cfd4dc',
                    width: .5,
                    value: 0
                }],
                min: 10
            },
            plotOptions: {
                ...gainChartOption.plotOptions,
                series: {
                  color: "#0369ff33",
                  dataLabels: {
                    enabled: true,
                    formatter: function() {
                      return this.y 
                    }
                  },
                  pointWidth: 30,
                  borderRadius: 3
                }
            },
            series: [{
                name: 'John',
                data: [22, 17, 18, 17, 19],
                color: "#016aff"
            }, {
                name: 'Jane',
                data: [19, 17, 18, 20, 19],
                color: "#ff49ad"
            }]
        }
        setGainChart(gainChartOption);
    }, []);
    useEffect(() => {
        let gainChartOption = gainerChart();
        gainChartOption = {
            ...gainChartOption,
            chart: {
                ...gainChartOption.chart,
                height: 300,
                backgroundColor: 'transparent'
            },
            legend: {
                ...gainChartOption.legend,
                enabled: true,
                symbolWidth: 16,
                symboleHeight: 16,
                symbolRadius: 3,
                align: 'left',
                verticalAlign: 'top',
                layout: 'horizontal',
                x: 0,
                y: 0,
            },
            tooltip: {
                enabled: false
            },
            xAxis: {
                ...gainChartOption.xAxis,
                gridLineWidth: 0,
                lineColor: 'transparent',
                tickColor: 'transparent',
                labels: {
                    format: "{value:%b %e}"
                },
                type: "datetime"
            },
            yAxis: {
                ...gainChartOption.yAxis,
                visible: true,
                offset: 5,
                title: {
                    text: null
                },
                gridLineWidth: 0,
                plotLines: [{
                    color: '#cfd4dc',
                    width: .5,
                    value: 0
                }],
                min: 10
            },
            plotOptions: {
                ...gainChartOption.plotOptions,
                series: {
                    borderWidth: 0,
                    borderRadius: 3,
                    color: "#0369ff33",
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.y 
                        }
                    }
                }
            },
            series: [{
                name: 'Holders',
                data: [420, 412],
                color: "#016aff"
            }, {
                name: 'Bought',
                data: [86, 77],
                color: "#00a25b"
            }, {
                name: 'Sold',
                data: [116, 159],
                color: "#fc5a5a"
            }]
        }
        setMutualChart(gainChartOption);
    }, []);
    const recentAction = [{
        title:"Saurabh Mittal",
        label: "SAST",
        statusText: "Disposal",
        status: 'danger',
        description: "has disposed 2,41,363 stocks 3% of total stocks at 317.28 on date 27 Sep 2021	"
    }, {
        title:"Radhakishan Damani",
        label: "Big Deal",
        statusText: "Acquisition",
        status: 'success',
        description: "has acquired 3,54,894 stocks 2% of total stocks at 289.14 on date 24 Sep 2021"
    }, {
        title:"Ashish Dhawan",
        label: "Big Block",
        statusText: "Disposal",
        status: 'danger',
        description: "has disposed 2,75,157 stocks 5% of total stocks at 647.28 on date 27 Sep 2021	"
    }, {
        title:"Rakesh Jhunjhunwala",
        label: "Insider",
        statusText: "Acquisition",
        status: 'success',
        description: "has acquired 9,41,363 stocks 8% of total stocks at 347.28 on date 27 Sep 2021	"
    }];

    // const ownerList = [{
    //     title: "Superstar",
    //     data: [{
    //         name: "Sudha Gopalakrishnan",
    //         qtr : "JUN 2021",
    //         shares: 95357000,
    //         sharePer : "2.2%"
    //     },{
    //         name: "Rohan Murty	",
    //         qtr : "MAR 2021",
    //         shares: 60812892,
    //         sharePer : "1.4 %"
    //     },{
    //         name: "S Gopalakrishnan",
    //         qtr : "DEC 2020",
    //         shares: 41853808,
    //         sharePer : "1.0 %"
    //     }]
    // },{
    //     title: "Promoters",
    //     data: [{
    //         name: "Sudha Gopalakrishnan",
    //         qtr : "JUN 2021",
    //         shares: 95357000,
    //         sharePer : "2.2%"
    //     },{
    //         name: "Rohan Murty	",
    //         qtr : "MAR 2021",
    //         shares: 60812892,
    //         sharePer : "1.4 %"
    //     },{
    //         name: "S Gopalakrishnan",
    //         qtr : "DEC 2020",
    //         shares: 41853808,
    //         sharePer : "1.0 %"
    //     }]
    // },,{
    //     title: "FII",
    //     data: [{
    //         name: "Sudha Gopalakrishnan",
    //         qtr : "JUN 2021",
    //         shares: 95357000,
    //         sharePer : "2.2%"
    //     },{
    //         name: "Rohan Murty	",
    //         qtr : "MAR 2021",
    //         shares: 60812892,
    //         sharePer : "1.4 %"
    //     },{
    //         name: "S Gopalakrishnan",
    //         qtr : "DEC 2020",
    //         shares: 41853808,
    //         sharePer : "1.0 %"
    //     }]
    // },,{
    //     title: "DII",
    //     data: [{
    //         name: "Sudha Gopalakrishnan",
    //         qtr : "JUN 2021",
    //         shares: 95357000,
    //         sharePer : "2.2%"
    //     },{
    //         name: "Rohan Murty	",
    //         qtr : "MAR 2021",
    //         shares: 60812892,
    //         sharePer : "1.4 %"
    //     },{
    //         name: "S Gopalakrishnan",
    //         qtr : "DEC 2020",
    //         shares: 41853808,
    //         sharePer : "1.0 %"
    //     }]
    // }];
    const ownerList = [{...superStarTable},{ ...promotorTableData},{...fiiTableData},{...diiTableData}];
    const industryOwnerList = [{
        title: "FLL holding ",
        data: [{
            name: "Sun Pharmaceuti…",
            currentQtr : 24.35,
            qoqChange: 4.39,
            yoyChange : 6.18
        },{
            name: "Max Financial Se ..",
            currentQtr : 23.39,
            qoqChange: -1.3,
            yoyChange : -4.62
        },{
            name: "Brigade Enterpris ..",
            currentQtr : 23.39,
            qoqChange: 4.39,
            yoyChange : 5.5
        },{
            name: "Atul Ltd.",
            currentQtr : 19.5,
            qoqChange: -1.3,
            yoyChange : 4.62
        },{
            name: "Cyient Ltd.",
            currentQtr : 19.46,
            qoqChange: 0.54,
            yoyChange : -1.9
        }]
    },{
        title: "MF holding",
        data: [{
            name: "Sun Pharmaceuti…",
            currentQtr : 18.34,
            qoqChange: -1.25,
            yoyChange : -3.18
        },{
            name: "Max Financial Se ..",
            currentQtr : 23.39,
            qoqChange: 4.3,
            yoyChange : 6.72
        },{
            name: "Brigade Enterpris ..",
            currentQtr : 19.5,
            qoqChange: 4.39,
            yoyChange : 5.5
        },{
            name: "Atul Ltd.",
            currentQtr : 19.5,
            qoqChange: -1.3,
            yoyChange : 4.62
        },{
            name: "Cyient Ltd.",
            currentQtr : 19.46,
            qoqChange: 0.54,
            yoyChange : -1.9
        }]
    },{
        title: "Superstar holding",
        data: [{
            name: "Sun Pharmaceuti…",
            currentQtr : 18.34,
            qoqChange: -1.25,
            yoyChange : -3.18
        },{
            name: "Max Financial Se ..",
            currentQtr : 23.39,
            qoqChange: 4.3,
            yoyChange : 6.72
        },{
            name: "Brigade Enterpris ..",
            currentQtr : 19.5,
            qoqChange: 4.39,
            yoyChange : 5.5
        },{
            name: "Atul Ltd.",
            currentQtr : 19.5,
            qoqChange: -1.3,
            yoyChange : 4.62
        },{
            name: "Cyient Ltd.",
            currentQtr : 19.46,
            qoqChange: 0.54,
            yoyChange : -1.9
        }]
    }];
    const cards = [{
        text: 'The number of MF Holdings decreased from 420 to 412 in the period of Sep 2021 to Nov 2021',
        type: 'danger'
    }]

    return (<div className="container-fluid">
        {/* <Header /> */}
        <div className="content">
            <div className="row">
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className={styles.chartHeading}>SHAREHOLDING SUMMARY</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={`d-flex justify-content-center ${styles.grayDiv}`}>   
                                <div>
                                    {pieChartOption && <HighchartsReact highcharts={Highcharts} options={pieChartOption} />}
                                </div>
                            
                                <div className={styles.legendList}>
                                    {pieLegend.length > 0 && pieLegend.map(item => {
                                        return <div className={styles.legend}>
                                        <div className={`${styles.square} ${styles.blue}`} style={{backgroundColor: item.color}}></div>
                                        <div className={styles.text}>
                                            <span>{item.name}</span>
                                            <span>{item.y}</span>
                                        </div>
                                    </div>
                                    })}
                                    {/* <div className={styles.legend}>
                                        <div className={`${styles.square} ${styles.blue}`}></div>
                                        <div className={styles.text}>
                                            <span>Prompters</span>
                                            <span>205</span>
                                        </div>
                                    </div>
                                    <div className={styles.legend}>
                                        <div className={`${styles.square} ${styles.orange}`}></div>
                                        <div className={styles.text}>
                                            <span> MF</span>
                                            <span>1466</span>
                                        </div>
                                    </div>
                                    <div className={styles.legend}>
                                        <div className={`${styles.square} ${styles.beanRed}`}></div>
                                        <div className={styles.text}>
                                            <span>FII</span>
                                            <span>192</span>
                                        </div>
                                    </div>
                                    <div className={styles.legend}>
                                        <div className={`${styles.square} ${styles.purple}`}></div>
                                        <div className={styles.text}>
                                            <span>Public</span>
                                            <span>860</span>
                                        </div>
                                    </div>
                                    <div className={styles.legend}>
                                        <div className={`${styles.square} ${styles.aquaBlue}`}></div>
                                        <div className={styles.text}>
                                            <span>Others</span>
                                            <span>255</span>
                                        </div>
                                    </div> */}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    {/* <div className="row my-4">
                        <div className="col-md-6">
                            <div className={`indicatorBox info`}>
                                <p className="text">Promoters unpledged 2.26% of shares in last quarter. </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`indicatorBox danger`}>
                                <p className="text">Total pledge stands at 6.36% of promoter holdings</p>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className={styles.chartHeading}>HISTORICAL HOLDINGs</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className={`${styles.grayDiv}`}>   
                                
                                <HighchartsReact  highcharts={HighchartsStock} options={gainChart} />
                                
                            </div>
                        </div>
                    </div>
                    {/* <div className="row my-4">
                        <div className="col-md-6">
                            <div className={`indicatorBox success`}>
                                <p className="text">Mutual Funds have increased holdings from 11.93% to 12.03% in Jun 2021 qtr.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={`indicatorBox danger`}>
                                <p className="text">FII/FPI have decreased holdings from 11.67% to 11.5% in Jun 2021 qtr</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="row">
                {shareholdingData && shareholdingData.insights.length > 0 && shareholdingData.insights.map(insight => {
                    return <div className="col-md-4 mt-4">
                    <div className={`indicatorBox ${insight.color}`}>
                        <p className="text">{insight.longtext}</p>
                    </div>
                </div>
                })}
                    <div className="col-md-4">

                    </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={styles.heading}>Owners name sections</div>
                </div>
            </div>
            <div className="row">
                {ownerList.map((owner, index) => {
                    if(owner.data.length == 0 ) {
                        return <></>
                    }
                    return <div className="col-md-6">
                        <div className={`${styles.ownerBox} ${index == 0 ? styles.boxBlue : ''}`}>
                            <div className={styles.title}>{owner.title}</div>
                            <OwnerTable data={owner.data}/>
                        </div>
                    </div>
                })}
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={styles.heading}>Recent Action</div>
                </div>
            </div>
            <div className="row">
                {recentAction.map((item, index) => {
                    return <div className="col-md-3">
                        <div className={styles.recentBox}>
                            <div className="d-flex justify-content-between">
                                <div className={styles.label}>{item.label}</div>
                                <div className={`${styles.status} text-${item.status}`}>{item.statusText}</div>
                            </div>
                            <div className={styles.title}>{item.title}</div>
                            <div className={styles.description}>{item.description}</div>
                        </div>
                    </div>
                })}
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={styles.heading}>Mutual Fund</div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className={styles.ownerBox}>
                        <HighchartsReact  highcharts={HighchartsStock} options={mutualChart} />
                    </div>
                </div>
                <div className="col-md-4">
                    {cards.map(item => {
                        return <Card data={item} />
                    })}

                    <div className={`${styles.successBox} ${styles.success}`}>
                        <p>SBI ETF Nifty 50 was the highest buyer of 1,258,539 shares in Sep 2021 </p>
                    </div>
                    <div className={`${styles.successBox} ${styles.danger}`}>
                        <p>ICICI Prudential Value Discovery Fund Growth was the highest seller of 2,951,831 shares in Sep 2021  </p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={styles.heading}>Industry institutional ownership comparison</div>
                </div>
            </div>
            <div className="row">
                {industryOwnerList.map((owner, index) => {
                    return <div className="col-md-4">
                        <div className={`${styles.chartHeading} text-uppercase mb-2`}>{owner.title}</div>
                        <div className={`${styles.tableBox}`}>
                            <Table className={styles.table}>
                                <thead>
                                    <tr>
                                        <td width="40%"><div>STOCK NAME</div></td>
                                        <td width="20%"><div>CURRENT QTR%</div></td>
                                        <td width="20%" className="text-right"><div>QOQ CHANGE %</div></td>
                                        <td width="20%" className="text-right"><div>YOY CHANGE %</div></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {owner.data.map(data => {
                                        return <tr>
                                        <td width="40%"><div>{data.name}</div></td>
                                        <td width="20%"><div>{data.currentQtr}</div></td>
                                        <td width="20%" className={`text-right ${data.qoqChange < 0 ? 'text-danger': 'text-success'}`}><div>{data.qoqChange}%</div></td>
                                        <td width="20%" className={`text-right ${data.yoyChange < 0 ? 'text-danger': 'text-success'}`}><div>{data.yoyChange}%</div></td>
                                    </tr>
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                })}
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="indicatorBox success">
                        <p className="title">Infosys</p>
                        <p className="text">Promoters unpledged 2.26% of shares in last quarter. </p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`indicatorBox success`}>
                        <p className="title">Atul Ltd.</p>
                        <p className="text">Promoters unpledged 2.26% of shares in last quarter. </p>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}
 
export default OwnershipPage;

const OwnerTable = (props) => {
    const { data } = props;
    return <Table className={styles.table}>
        <thead>
            <tr>
                <td><div>NAME</div></td>
                <td><div>QTR</div></td>
                <td className="text-right"><div>SHARES</div></td>
                <td className="text-right"><div>SHARES %</div></td>
            </tr>
        </thead>
        <tbody>
            {data.map(data => {
                return <tr>
                    <td><div>{data.name}</div></td>
                    <td><div>{data.qtr}</div></td>
                    <td className="text-right"><div>{data.shares}</div></td>
                    <td className="text-right"><div>{data.sharePer}</div></td>
                </tr>
            })}
        </tbody>
    </Table>
}