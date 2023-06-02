import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsStock from "highcharts/highstock";
import HcMore from "highcharts/highcharts-more";
import Card from './components/Card';
import { multilineChart, gainerChart } from '../../utils/chart/chart';
import Header from '../../components/Header/Header';
import moment from 'moment';
import { formatNumber, isEmpty, numberWithCommas } from '../../utils/commonFunctions';
import styles from './Ownerpage.module.scss';

const colors = {
    FII: "#0369ff",
    DII: "#fe49ad",
    Promoter: "#00a25b",
    Public: "#fec542",
    default: "#ceddfc",
    "Pledges as % of promoter shares (%)": "#fe6d64",
    "Locked as % of promoter shares (%)": "#fec05c"
}
const barChartName = ['Promoter', "MF", "DII", "FII"];
const PledgeChartName = ["Pledges as % of promoter shares (%)", "Locked as % of promoter shares (%)"]

import { pieChart } from '../../utils/chart/chart';
const OwnershipPage = (props) => {


    const { reportData } = props;
    const { stockData, mfData } = reportData;
    const chart_data_total_holdings = mfData?.chartData?.chart_data_total_holdings;
    const { insights } = mfData;
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
    const [columnOptions, setColumnOptions] = useState({ categories: [], series: [] });
    const [pieChartData, setPieChartData] = useState(null)
    useEffect(() => {
        if (reportData?.shareholdingData) {
            const { shareholdingData } = reportData;
            setPieChartData(shareholdingData?.pieChartData);
            setShareholdingData(shareholdingData);

            // const {shareholdingData} = page4;
            // const {pieChartData} = shareholdingData;
            const { barChartData, barChartData: { chartdata } } = shareholdingData;

            let barChart = {};
            let categories = [];
            let PledgesChart = {};
            let Pledgescategories = [];
            let lockedChart = {};
            let lockedCategories = [];
            Object.keys(barChartData.chartdata).forEach(key => {
                let data = [];
                let name = '';
                let Plname = '';
                let PlData = [];
                let lockedName = '';
                let lockedData = [];
                chartdata[key].forEach((value, index) => {
                    if (index != 0) {
                        data.push(value[1]);
                        name = key;

                        if (!categories.includes(value[0])) {
                            categories.push(value[0])
                        }
                    }
                    if (key === "Promoter") {

                        if (value.length > 3) {
                            if (index == 0) {
                                Plname = value[3];
                            }
                            if (index != 0) {
                                PlData.push(value[3]);
                            }


                            if (!Pledgescategories.includes(value[3])) {
                                Pledgescategories.push(value[3])
                            }
                        }
                        if (value.length > 5) {
                            if (index == 0) {
                                lockedName = value[5];
                            }
                            if (index != 0) {
                                lockedData.push(value[5]);
                            }


                            if (!lockedCategories.includes(value[5])) {
                                lockedCategories.push(value[5])
                            }
                        }

                    }
                });

                if (barChartName.includes(name)) {
                    barChart[name] = {
                        name: name,
                        data: data,
                        color: colors[name] ? colors[name] : colors.default
                    }
                }
                if (PledgeChartName.includes(Plname)) {
                    PledgesChart[Plname] = {
                        name: Plname,
                        data: PlData,
                        color: colors[Plname] ? colors[Plname] : colors.default
                    }
                }
                if (PledgeChartName.includes(lockedName)) {
                    PledgesChart[lockedName] = {
                        name: lockedName,
                        data: lockedData,
                        color: colors[lockedName] ? colors[lockedName] : colors.default
                    }
                }

            })

            let newSeries = [];
            let pledgeSeries = [];
            if (barChart['Promoter']) {
                newSeries = [...newSeries, barChart["Promoter"]]
            }
            if (PledgesChart["Pledges as % of promoter shares (%)"]) {
                newSeries = [...newSeries, PledgesChart["Pledges as % of promoter shares (%)"]]
            }
            if (PledgesChart["Locked as % of promoter shares (%)"]) {
                newSeries = [...newSeries, PledgesChart["Locked as % of promoter shares (%)"]]
            }
            if (barChart['FII']) {
                newSeries = [...newSeries, barChart["FII"]]
            }
            if (barChart['DII']) {
                newSeries = [...newSeries, barChart["DII"]]
            }

            // Object.keys(barChart).forEach(key => {
            //     newSeries.push(barChart[key]);
            // })
            // Object.keys(PledgesChart).forEach(key => {
            //     pledgeSeries.push(PledgesChart[key]);
            // })
            setColumnOptions({ categories: [...categories, ...Pledgescategories], series: [...newSeries, ...pledgeSeries] });
            if (!isEmpty(shareholdingData?.detailedHoldings)) {
                let superStar = [...shareholdingData?.detailedHoldings[moment(shareholdingData?.barChartData?.latestDate).format('DD-MMM-YYYY').toString()]?.publicNonInstitutionalHolding];
                let fiiTable = [...shareholdingData?.detailedHoldings[moment(shareholdingData?.barChartData?.latestDate).format('DD-MMM-YYYY').toString()]?.FIIHolding];
                let diiTable = [...shareholdingData?.detailedHoldings[moment(shareholdingData?.barChartData?.latestDate).format('DD-MMM-YYYY').toString()]?.DIIHolding];
                let promoterTable = [...shareholdingData?.detailedHoldings[moment(shareholdingData?.barChartData?.latestDate).format('DD-MMM-YYYY').toString()]?.promoterHolding];
                setSuperStarTable(prev => ({ ...prev, data: superStar }));
                setFIITable(prev => ({ ...prev, data: fiiTable }));
                setDIITable(prev => ({ ...prev, data: diiTable }));
                setPromotorTable(prev => ({ ...prev, data: promoterTable }));
            }
        }
    }, [reportData]);
    useEffect(() => {
        let seriesData = [];
        pieChartData && pieChartData.map((item, i) => {
            if (i == 0) return;
            let index = pieChartColor.findIndex(chart => {
                return chart.name === item[0];
            });
            seriesData.push({ color: pieChartColor[index].color, name: item[0], y: item[1] });
        });
        let option = {
            ...assetPieChart,
            series: [{
                ...assetPieChart.series[0],
                data: [...seriesData]
            }]
        };
        setPieLegend(seriesData);
        setPieChartOption(option);
    }, [pieChartData]);

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
                enabled: true,
                shared: true
            },
            xAxis: {
                ...gainChartOption.xAxis,
                categories: columnOptions.categories,
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
                min: 0
            },
            plotOptions: {
                ...gainChartOption.plotOptions,
                series: {
                    color: "#0369ff33",
                    dataLabels: {
                        enabled: false,
                        formatter: function () {
                            return `${this.y}%`
                        },
                        style: {
                            fontSize: "9px"
                        }
                    },

                    borderRadius: 3
                }
            },
            series: [...columnOptions.series]
        }
        setGainChart(gainChartOption);
    }, [columnOptions]);
    useEffect(() => {
        let gainChartOption = gainerChart();
        let holders = {
            name: "Holders",
            color: "#016aff",
            data: []
        }
        let bought = {
            name: "Bought",
            color: "#00a25b",
            data: []
        }
        let sold = {
            name: "Sold",
            color: "#fc5a5a",
            data: []
        };
        let cat = [];
        
        chart_data_total_holdings && chart_data_total_holdings.forEach(value => {
            cat.push(value.date)
            holders = {
                ...holders,
                data: [...holders.data, value?.holders != undefined ? value?.holders : null]
            }
            bought = {
                ...bought,
                data: [...bought.data, value?.buyers != undefined ? value?.buyers : null]
            }
            sold = {
                ...sold,
                data: [...sold.data, value?.sellers != undefined ? value?.sellers : null]
            }
            return
        });

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
                type: "datetime",
                categories: [...cat]
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
                min: 0
            },
            plotOptions: {
                ...gainChartOption.plotOptions,
                series: {
                    borderWidth: 0,
                    borderRadius: 3,
                    color: "#0369ff33",
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y
                        }
                    }
                }
            },
            series: [{
                ...holders
            }, {
                ...bought
            }, {
                ...sold
            }]
        }
        setMutualChart(gainChartOption);
    }, []);
    const recentAction = [{
        title: "Saurabh Mittal",
        label: "SAST",
        statusText: "Disposal",
        status: 'danger',
        description: "has disposed 2,41,363 stocks 3% of total stocks at 317.28 on date 27 Sep 2021	"
    }, {
        title: "Radhakishan Damani",
        label: "Big Deal",
        statusText: "Acquisition",
        status: 'success',
        description: "has acquired 3,54,894 stocks 2% of total stocks at 289.14 on date 24 Sep 2021"
    }, {
        title: "Ashish Dhawan",
        label: "Big Block",
        statusText: "Disposal",
        status: 'danger',
        description: "has disposed 2,75,157 stocks 5% of total stocks at 647.28 on date 27 Sep 2021	"
    }, {
        title: "Rakesh Jhunjhunwala",
        label: "Insider",
        statusText: "Acquisition",
        status: 'success',
        description: "has acquired 9,41,363 stocks 8% of total stocks at 347.28 on date 27 Sep 2021	"
    }];

    const ownerList = [{ ...superStarTable }, { ...promotorTableData }, { ...fiiTableData }, { ...diiTableData }];
    const industryOwnerList = [{
        title: "FLL holding ",
        data: [{
            name: "Sun Pharmaceuti…",
            currentQtr: 24.35,
            qoqChange: 4.39,
            yoyChange: 6.18
        }, {
            name: "Max Financial Se ..",
            currentQtr: 23.39,
            qoqChange: -1.3,
            yoyChange: -4.62
        }, {
            name: "Brigade Enterpris ..",
            currentQtr: 23.39,
            qoqChange: 4.39,
            yoyChange: 5.5
        }, {
            name: "Atul Ltd.",
            currentQtr: 19.5,
            qoqChange: -1.3,
            yoyChange: 4.62
        }, {
            name: "Cyient Ltd.",
            currentQtr: 19.46,
            qoqChange: 0.54,
            yoyChange: -1.9
        }]
    }, {
        title: "MF holding",
        data: [{
            name: "Sun Pharmaceuti…",
            currentQtr: 18.34,
            qoqChange: -1.25,
            yoyChange: -3.18
        }, {
            name: "Max Financial Se ..",
            currentQtr: 23.39,
            qoqChange: 4.3,
            yoyChange: 6.72
        }, {
            name: "Brigade Enterpris ..",
            currentQtr: 19.5,
            qoqChange: 4.39,
            yoyChange: 5.5
        }, {
            name: "Atul Ltd.",
            currentQtr: 19.5,
            qoqChange: -1.3,
            yoyChange: 4.62
        }, {
            name: "Cyient Ltd.",
            currentQtr: 19.46,
            qoqChange: 0.54,
            yoyChange: -1.9
        }]
    }, {
        title: "Superstar holding",
        data: [{
            name: "Sun Pharmaceuti…",
            currentQtr: 18.34,
            qoqChange: -1.25,
            yoyChange: -3.18
        }, {
            name: "Max Financial Se ..",
            currentQtr: 23.39,
            qoqChange: 4.3,
            yoyChange: 6.72
        }, {
            name: "Brigade Enterpris ..",
            currentQtr: 19.5,
            qoqChange: 4.39,
            yoyChange: 5.5
        }, {
            name: "Atul Ltd.",
            currentQtr: 19.5,
            qoqChange: -1.3,
            yoyChange: 4.62
        }, {
            name: "Cyient Ltd.",
            currentQtr: 19.46,
            qoqChange: 0.54,
            yoyChange: -1.9
        }]
    }];
    const cards = [{
        text: 'The number of MF Holdings decreased from 420 to 412 in the period of Sep 2021 to Nov 2021',
        type: 'danger'
    }]

    return (<div className="container-fluid">
        <Header stockData={stockData} />
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
                                            <div className={`${styles.square} ${styles.blue}`} style={{ backgroundColor: item.color }}></div>
                                            <div className={styles.text}>
                                                <span>{item.name}</span>
                                                <span>{item.y}</span>
                                            </div>
                                        </div>
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
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

                                <HighchartsReact highcharts={HighchartsStock} options={gainChart} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {shareholdingData && shareholdingData?.insights?.length > 0 && shareholdingData?.insights?.map(insight => {
                    return <div className="col-md-4 mt-4">
                        <div className={`indicatorBox ${insight?.color}`}>
                            <p className="text">{insight?.longtext}</p>
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
                    if (owner.data.length == 0) {
                        return <></>
                    }
                    return <div className="col-md-6">
                        <div className={`${styles.ownerBox} ${index == 0 ? styles.boxBlue : ''}`}>
                            <div className={styles.title}>{owner.title}</div>
                            <OwnerTable data={owner.data} />
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
                        <HighchartsReact highcharts={HighchartsStock} options={mutualChart} />
                    </div>
                </div>
                <div className="col-md-4">
                    {cards.map(item => {
                        return <Card data={item} />
                    })}

                    {insights.map(insight => {
                        return <div className={`${styles.successBox} ${styles[insight.color]}`}>
                            <p>{insight.text}</p>
                        </div>
                    })}
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
                                            <td width="20%" className={`text-right ${data.qoqChange < 0 ? 'text-danger' : 'text-success'}`}><div>{data.qoqChange}%</div></td>
                                            <td width="20%" className={`text-right ${data.yoyChange < 0 ? 'text-danger' : 'text-success'}`}><div>{data.yoyChange}%</div></td>
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
                <td className="text-right"><div>SHARES</div></td>
                <td className="text-right"><div>SHARES %</div></td>
            </tr>
        </thead>
        <tbody>
            {data.map(data => {
                return <tr>
                    <td><div>{data.name}</div></td>
                    <td className="text-right"><div>{numberWithCommas(data.totalShareVolume)}</div></td>
                    <td className="text-right"><div>{data.holdingPercentage} %</div></td>
                </tr>
            })}
        </tbody>
    </Table>
}