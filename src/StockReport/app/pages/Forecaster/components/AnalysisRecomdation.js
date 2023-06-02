import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { stackChart } from '../../../utils/chart/chart';
import { isEmpty } from '../../../utils/commonFunctions';
// import styles from './AnalysisRecomdation.module.scss';


function AnalysisRecomdation(props) {
    const {recommendation} = props;
    
    if(isEmpty(recommendation)) {
        return <></>
    }
    let strongSell = [];
    let sell = [];
    let hold = [];
    let buy = [];
    let strongBuy = [];
    let categories = [];
    recommendation.forEach(item => {
        categories.push(item.asofdate);
        strongSell.push(item?.STRONG_SELL?.value)
        sell.push(item?.SELL.value)
        hold.push(item?.HOLD?.value)
        buy.push(item?.BUY?.value)
        strongBuy.push(item?.STRONG_BUY?.value)
    })

    let gainChartOption = stackChart();
    let seriesData = [{
        name: 'Strong Buy',
        data: [...strongBuy],
        color: "#00A25B",
        maxPointWidth: 52
    },{
        name: 'Buy',
        data: [...buy],
        color: "#1EC079",
        maxPointWidth: 52
    },{
        name: 'Hold',
        data: [...hold],
        color: "#FFC542",
        maxPointWidth: 52
    }, {
        name: 'Sell',
        data: [...sell],
        color: "#FF8C8C",
        maxPointWidth: 52
    },{
        name: 'Strong Sell',
        data: [...strongSell],
        color: "#FC5A5A",
        maxPointWidth: 52
    }];
    
    gainChartOption = {
        ...gainChartOption,
        chart: {
            ...gainChartOption,
            type: 'column',
            height: 325,
            width: 550
        },
        yAxis: {
            ...gainChartOption.yAxis,
        },
        xAxis: {
            ...gainChartOption.xAxis,
            labels: {
                enabled: true,
            },
            categories: categories
        },
        legend: {
            ...gainChartOption.legend,
            reversed: false
        },
        plotOptions: {
            ...gainChartOption.plotOptions,
            series: {
                ...gainChartOption.plotOptions.series,
                dataLabels: {
                    ...gainChartOption.plotOptions.series.dataLabels,
                  useHTML: false,
                
                }
            }
        },
        series: [...seriesData]
    }
    
    return (<>
            <HighchartsReact highcharts={Highcharts} options={gainChartOption} />
        </>
    )
}

export default AnalysisRecomdation