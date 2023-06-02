import React, {useState, useEffect} from 'react';
// import Header from './components/Header';
import Card from './components/Card';
import Highcharts, { color } from 'highcharts';
import HighchartsStock from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import HcMore from "highcharts/highcharts-more";
import { NumberWithSign } from '../../utils/commonFunctions';
import { multilineChart, gainerChart,SplineChart } from '../../utils/chart/chart';
import styles from './StockReport6.module.scss';

HcMore(Highcharts);
const StockReport6 = () => {
    const [gainChart, setGainChart] = useState(null);
    let multilineChartOptions = multilineChart();
    multilineChartOptions = {
        ...multilineChartOptions,
        chart: {
            ...multilineChartOptions.chart
        },
        xAxis: {
            ...multilineChartOptions.xAxis,
            categories: ['JUN ‘18', 'SEP ‘18', 'DEC ‘18', 'MAR ‘19', 'APR ‘21', 'JUL ‘21']
        },
        yAxis: [{ // Primary yAxis
            title: {
              text: 'PE RATIO'
            },
            opposite: true,
            labels: {
              align: 'center',
              x: -15,
              y: -3
            },
          }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
              text: 'MOMENTUM SCORE'
            },
            labels: {
              align: 'center',
              x: 20,
              y: -3
            }
        }],
        plotOptions: {
            spline: {
                marker: {
                    enabled: false
                }
            },
        },
        series: [{
            name: 'Valuation Score',
            type: 'spline',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, {y:176.0, marker:{enabled:true,radius:5,fillColor:'#FFF', lineColor: "#016aff", lineWidth: 2}}],
            tooltip: {
              enabled: false
            },
            color: "#016aff"
        
          }, {
            name: 'PE ratio',
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5],
            tooltip: {
              enabled: false
            },
            color: "#9ea6b7"
        }],
        tooltip: {
            enabled: false
        }
    }
    const [multilineChartOption, setMultilineChartOption] = useState(multilineChartOptions)
    let metricChart = SplineChart();
    metricChart = {
        ...metricChart,
        chart: {
            ...metricChart.chart,
            backgroundColor: "transparent"
        }
    }
    useEffect(() => {
        let gainChartOption = gainerChart();
        gainChartOption = {
            ...gainChartOption,
            chart: {
                ...gainChartOption.chart,
                height: 175,
                width: 350,
                backgroundColor: 'transparent'
            },
            xAxis: {
                ...gainChartOption.xAxis,
                labels: {
                    enabled: false
                },
                gridLineWidth: 0,
                lineColor: 'transparent',
                tickColor: 'transparent'
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
                    color: '#606060',
                    width: .5,
                    value: 0
                }],
                  labels: {
                      enabled: false
                }
            },
            plotOptions: {
                ...gainChartOption.plotOptions,
                series: {
                  borderWidth: 0,
                }
            },
            series: [{
                data: [50, 52, 55, 61, 64, -10, 40, 30],
                borderRadius: 5,
                maxPointWidth: 40,
                pointWidth: 30
            }]
        }
        setGainChart(gainChartOption);
    }, []);

    const chartList = [
    {
        title: "INFOSYS LTD.",
        text: 'Low',
        number: 6.8,
        date: 'DEC ‘19',
        value: +9,
        footerText: 'Piotroski score is the highest in the past 8 quarters',
        status: 'danger',
        chartData: [{
            name: 'NVDA',
            data: [34.8, 43.0, 51.2, 41.4],
            color: "#016aff",
            accessibility: {
                description: 'This is the most used screen reader in 2019'
            }
        }],
        textClass: 'danger'
    },
    {
        title: "TATA CONSULTACY",
        text: 'High',
        textClass: 'success',
        number: 96.7,
        date: 'MAR ‘19',
        value: +9,
        footerText: 'Total Revenue Annual Cr growth is higher than historical averages',
        status: 'success',
        chartData: [{
            name: 'JAWS',
            data: [39.6, 23.7, 43.9, 43.7],
            color: "#fc975a"
        }]
    },
    {
        title: "INFOSYS LTD.",
        text: 'Medium',
        textClass: 'warning',
        number: 34.5,
        date: 'MAR ‘19',
        value: +9,
        footerText: 'Net Profit Annual Cr growth is higher than historical averages',
        status: 'success',
        chartData: [{
            name: 'VoiceOver',
            data: [20.2, 30.7, 36.8, 30.9],
            color: "#fec542"
        }]
    },
    {
        title: "WIPRO LTD.",
        text: 'Medium',
        textClass: 'warning',
        number: 33.2,
        date: 'DEC ‘19',
        value: -33,
        footerText: 'Total Revenue Qtr Cr growth is lower than historical averages',
        status: 'danger',
        chartData: [{
            name: 'Narrator',
            data: [20, 21, 18, 19.5],
            color: "#fc5ab2"
        }]
    },
    {
        title: "INFOSYS LTD.",
        text: 'Low',
        textClass: 'danger',
        number: 6.8,
        date: 'DEC ‘19',
        value: -27,
        footerText: 'Net Profit Qtr Cr growth is lower than historical averages',
        status: 'danger',
        chartData: [{
            name: 'ZoomText/Fusion',
            data: [26.1, 36.8, 35.3, 26.5],
            color: "#16d8ec"
        }]
    },
    {
        title: "TATA CONSULTACY",
        text: 'High',
        textClass: 'success',
        number: 96.7,
        date: 'DEC ‘19',
        value: +1.42,
        footerText: 'Operating Profile Margin Annual % is stable compared to historical averages',
        status: 'warning',
        chartData: [{
            name: 'Other',
            data: [20.6, 31.5, 24.2, 35.8],
            color: "#b62fff"
        }]
    }
    ]
    return ( 
        <div className="container-fluid">
            {/* <Header/> */}
            <div className="content">
                <div className="row">
                    <div className="col-md-9">
                        <h1 className={`${styles.heading} mb-20`}>Momentum Score <span className={styles.subHeading}>The current momentum is mid-range, <span className='text-success'>5% higher</span> compared to its 5 year momentum history.</span></h1>
                        <div className={`${styles.legendList} mb-30`}>
                            <div className={styles.legend}>
                                <div className={`${styles.circle} ${styles.blue}`}></div>
                                <div className={styles.text}>Momentum Score</div>
                            </div>
                            <div className={styles.legend}>
                                <div className={`${styles.circle} bg-roman-silver`}></div>
                                <div className={styles.text}>PE RATIO</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className={styles.expensiveText}>
                            <div>
                                <h6></h6>
                            </div>
                            <div>
                                <h6>High Momentum</h6>
                                <p>Momentum Score:  <span className="text-success"> 25.7/100</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-50">
                    <div className="col-md-12">
                        <div className={styles.chartBox}>
                            <HighchartsReact  highcharts={Highcharts}  options={multilineChartOption} />
                        </div>
                    </div>
                    {/* <div className="col-md-5">
                        <div className={styles.cardList}>
                            {cards.map(item => {
                                return <Card data={item} />
                            })}
                        </div>
                    </div> */}
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <h1 className={styles.heading}>PEER GROUPS <span className={styles.subHeading}>Granules India Ltd. is ranked #1 in its momentum score, indicating it is the <span className='text-success'>high</span> in its peer group..</span></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className={`${styles.legendList} mb-30`}>
                            <div className={styles.legend}>
                                <div className={`${styles.circle} ${styles.blue}`}></div>
                                <div className={styles.text}>GRANULES INDIA LTD.</div>
                            </div>
                            <div className={styles.legend}>
                                <div className={`${styles.circle} bg-hot-pink`}></div>
                                <div className={styles.text}>INFOSYS LTD.</div>
                            </div>
                            <div className={styles.legend}>
                                <div className={`${styles.circle} ${styles.purple}`}></div>
                                <div className={styles.text}>TATA CONSULTANCY</div>
                            </div>
                            <div className={styles.legend}>
                                <div className={`${styles.circle} ${styles.beanRed}`}></div>
                                <div className={styles.text}>Bharat Forge Ltd.</div>
                            </div>
                            <div className={styles.legend}>
                                <div className={`${styles.circle} ${styles.orange}`}></div>
                                <div className={styles.text}>WIPRO LTD.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {chartList.map(item => {
                        return <div className="col-md-4">
                            <div className={styles.chartBoxList}>
                                <div className={styles.header}>
                                    <h3 className={styles.head}>{item.title}
                                        <p className={`${styles.text} text-${item.textClass}`}>{item.text}</p>
                                    </h3>
                                    
                                    <div className={styles.circleNumber}>{item.number}</div>
                                </div>
                                <ColumnChart series={item.chartData}/>
                            </div>
                        </div>
                    })}
                </div>
                <div className="row mb-3">
                    <div className="col-md-8">
                        <h1 className={`${styles.heading} mb-20`}>METRICS</h1>
                        
                        <div className="row">
                            <div className="col-12">
                                <div className={`${styles.legendList} mb-30`}>
                                    <div className={styles.legend}>
                                        <div className={`${styles.circle} ${styles.blue}`}></div>
                                        <div className={styles.text}>RSI</div>
                                    </div>
                                    <div className={styles.legend}>
                                        <div className={`${styles.circle} bg-hot-pink`}></div>
                                        <div className={styles.text}>MSI</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className={styles.chartBg}>
                                    <HighchartsReact  highcharts={Highcharts}  options={metricChart} />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className={styles.chartBg}>
                                    <HighchartsReact  highcharts={Highcharts}  options={metricChart} />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-md-4">
                        <h1 className={`${styles.heading} mb-20`}>Price Change Analysis</h1>
                        
                        <div className="row">
                            <div className="col-12">
                                <div className={`${styles.legendList} mb-30`}>
                                    <div className={styles.legend}>
                                        <div className={`${styles.circle} bg-success`}></div>
                                        <div className={styles.text}>High</div>
                                    </div>
                                    <div className={styles.legend}>
                                        <div className={`${styles.circle} bg-danger`}></div>
                                        <div className={styles.text}>Low</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className={styles.chartBg}>
                                    <div>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p className={styles.qtrDuration}>Qtr</p>
                                                <p className={styles.qtrValue}>327.7</p>
                                                <p className={`${styles.qtrPer} text-success`}>23.17%</p>
                                            </div>
                                            <div>
                                                <p className={styles.qtrText}>Infosys Ltd. is near it's 4 week high</p>
                                            </div>
                                        </div>
                                        <div className={styles.line}></div>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p className={styles.qtrDuration}>Year</p>
                                                <p className={styles.qtrValue}>794.2</p>
                                                <p className={`${styles.qtrPer} text-danger`}> (86.41%)</p>
                                            </div>
                                            <div>
                                                <p className={styles.qtrText}>Infosys Ltd. is near it's 4 week high</p>
                                            </div>
                                        </div>
                                        
                                        <div className={styles.line}></div>
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <div>
                                                <p className={styles.qtrDuration}>5 Year</p>
                                                <p className={styles.qtrValue}>1190.8</p>
                                                <p className={`${styles.qtrPer} text-success`}> (227.9%)</p>
                                            </div>
                                            <div>
                                                <p className={styles.qtrText}>Infosys Ltd. is near it's 4 week high</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default StockReport6;

const   ColumnChart = (props) => {
    const {series} = props;
    const [gainChart, setGainChart] = useState(null);
    useEffect(() => {
        let gainChartOption = multilineChart();
        gainChartOption = {
            ...gainChartOption,
            chart: {
                ...gainChartOption.chart,
                height: 200,
                // width: 350,
                backgroundColor: 'transparent'
            },
            yAxis: {
                ...gainChartOption.yAxis,
                labels: {
                    align: 'right',
                    x: 15,
                    y: -3
                },
                tickInterval: 10
            },
            xAxis: {
                ...gainChartOption.xAxis,
                categories: ['JUN ‘18', 'SEP ‘18', 'DEC ‘18', 'MAR ‘19']
            },
            series: [
                ...series
            ]
        }
       
        setGainChart(gainChartOption);
    }, []);

    return (<>
        <HighchartsReact  highcharts={HighchartsStock} options={gainChart} />
    </>)
}