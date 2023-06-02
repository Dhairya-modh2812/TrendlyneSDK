import React, { Fragment, useState, useEffect } from 'react'
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HcMore from "highcharts/highcharts-more";
import { formatNumber, getDictionaryToList } from '../../../utils/commonFunctions';

HcMore(Highcharts);
function PivotChart(props) {
    const { pivotData, stockData } = props;
    const {open, low, high, close, currentPrice} = stockData;
    const [chartOptionData, setChartOption] = useState(null);
    
    let configObj = {
        first_resistance_r1: {
            label: 'R1'
        },
        second_resistance_r2: {
            label: 'R2'
        },
        third_resistance_r3: {
            label: 'R3'
        },
        first_support_s1: {
            label: 'S1'
        },
        second_support_s2: {
            label: 'S2'
        },
        third_support_s3: {
            label: 'S3'
        }
    }

    useEffect(() => {
        if(pivotData) {
            // setPivotChartData(pivotData);
            let plotLineOption = [];
            let keys = Object.keys(pivotData);
            
            keys.forEach((key, index) => {
                let resObj = {};
                if(configObj[key]) {
                    resObj.label = configObj[key].label;
                    resObj.value = pivotData[key].value;
                    plotLineOption.push(resObj);
                }
                if(key == 'pivotPoint') {
                    resObj.label = `Pivot`;
                    resObj.value = pivotData[key].value
                    plotLineOption.push(resObj);
                }
            })
            plotLineOption.sort(function(a, b) {
                return  parseFloat(a.value) - parseFloat(b.value);
            });
            
            let min = Math.min(...plotLineOption.map(item => item.value));
            let max = Math.max(...plotLineOption.map(item => item.value));

            let plotLineConfig = {
                color: '#e0e0e0', // Color value
                dashStyle: 'dash', // Style of the plot line. Default to solid
                value: null, // Value of where the line will appear
                width: 1, // Width of the line    
                zIndex: 1,  
                label: {
                    text: "",
                    align: "right",
                    verticalAlign: "middle",
                    y: 0,
                    x: 80,
                    style: {
                        fontFamily: "Lato",
                        textTransform: "uppercase",
                        fontSize: "10px",
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight:" 1.43",
                        color: "#666"
                    },
                    useHTML: true,
                    formatter: function () {
                        return `${this.options.label.text} - ` + formatNumber(this.options.value, 1);
                    },
                }
            }

            // create plot lines with config object
            const plotOptions = plotLineOption.map(item => {
                return {
                    ...plotLineConfig,
                    value: item.value,
                    label: {
                        ...plotLineConfig.label,
                        text: item.label
                    }
                }
            });

            // add LTP plot lines object in list of plotOption
            plotOptions.push({
                ...plotLineConfig,
                color: "#006aff", //set color for LTP plot line
                value: currentPrice,
                label: {
                    ...plotLineConfig.label,
                    style: {
                        ...plotLineConfig.label.style,
                        color: "#006aff" //set LTP label text color
                    },
                    y: -5,
                    x: -20,
                    text: 'LTP'
                }
            })
            const chartOption = {
                chart: {
                    height: 352,
                    width: 460,
                    marginRight: 100
                },
                rangeSelector: {
                    enabled: false,
                    selected: 1,
                },
                navigator: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                exporting: { enabled: false },
                credits: {
                    enabled: false,
                },
                legend: {
                    enabled: false,
                },
                title: {
                    text: ''
                },
                tooltip: {
                    enabled: false
                },
                yAxis: { // Primary yAxis
                    gridLineWidth: 0,
                    lineColor: "transparent",
                    tickColor: "transparent",
                    title: {
                        text: ''
                    },
                    opposite: false,
                    max: max,
                    min: min,
                    // min: 1470,
                    plotLines: plotOptions
            
                },
                plotOptions: {
                    candlestick: {
                        color: '#fc5a5a',
                        lineColor: "#fc5a5a",
                        upLineColor: '#00a25b',
                        upColor: '#00a25b'
                    }
                },
                xAxis: {
                    visible: true,
                    categories: [],
                    gridLineWidth: 1,
                    lineColor: "transparent",
                    tickColor: "transparent",
                    title: {
                        text: "",
                    },
                    labels: {
                        enabled: false,
                        align: "left"
                    }
                },
                series: [{
                    type: 'candlestick',
                    data: [[open, high, low, close]],  // [open, high, low, close]
                    maxPointWidth: 28
                }]
            }
            setChartOption(chartOption)
        }
    }, [pivotData])
    if(!chartOptionData) {
        return <></>
    }
    
    return (
        <Fragment>            
            <HighchartsReact  highcharts={Highcharts} options={chartOptionData}/>
        </Fragment>
    )
}

export default PivotChart