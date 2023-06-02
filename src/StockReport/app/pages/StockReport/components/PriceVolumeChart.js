import React, {useEffect, useState} from 'react'
import Highcharts from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import { stockChart, Chart } from '../../../utils/chart/chart';
import Card from './Card';
import moment from 'moment';

function PriceVolumeChart(props) {
    let { chartData} = props;
    let stockChartOptions = stockChart();
    const [stockChartOption, setStockChartOption] = useState({});

    useEffect(() => {
        if(chartData) {
            let stockChart = stockChartOptions;
            let stockEOD = [];
            let volumeEOD = [];
            chartData.forEach(item => {
               
                stockEOD.unshift([
                    moment(item.date).valueOf(),
                    item.close_price
                ])
                volumeEOD.unshift([
                    moment(item.date).valueOf(),
                    item.volume
                ])
            })
            stockChart.series[0].data = [...stockEOD];
            stockChart.series[1].data = [...volumeEOD];
            setStockChartOption(stockChart);
        }
    }, [chartData])

    return (
        <>  
            <HighchartsReact  highcharts={Highcharts}  constructorType={"stockChart"} options={stockChartOption} />        
        </>
    )
}

export default PriceVolumeChart