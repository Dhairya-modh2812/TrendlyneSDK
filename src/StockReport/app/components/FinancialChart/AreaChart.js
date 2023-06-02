import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts';
import HighchartsStock from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import HcMore from "highcharts/highcharts-more";
import moment from 'moment';
import { FinancialChart } from '../../utils/chart/chart';

HcMore(Highcharts);

function AreaChart(props) {
    const { data } = props;
    let financialOption = FinancialChart();
    let series = [];
    let category = [];
    
    if(data) {
        // 

        data.forEach((item, index) => {
        if(item.value != 0) {
            let yearStr = 'FY' + moment('01' + item.yearStr).format('YY') 
            let seriesData;
            if(index == 0) {
            seriesData = {
                color: "#006aff",
                y: item.value
            }
            }else {
            seriesData = item.value;
            }
            category.unshift(yearStr);
            series.unshift(seriesData)
        }
        })
    }

    financialOption = {
        ...financialOption,
        chart: {
            ...financialOption.chart,
            type: 'area'
        },
        xAxis: {
            ...financialOption.xAxis,
            categories: [...category]
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#006aff',
                lineWidth: 2,
                color: "#e6f0ff",
                
                marker: {
                    enabled: true,
                    enabledThreshold: 1,
                    fillColor: "#006aff",
                    lineWidth: 0,
                    lineColor: '#006aff',
                    radius: 3, 
                    state: {
                        hover: {
                            enabled: false
                        }
                    }
                }
                
            }
        },
        series: [{
            ...financialOption.series[0],
            data: [...series]
        }]
    }
    
    return (<>
        <HighchartsReact  highcharts={HighchartsStock} options={financialOption} />
    </>)
}

export default AreaChart