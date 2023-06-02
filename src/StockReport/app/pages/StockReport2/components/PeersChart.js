import React, { Fragment, useState } from 'react';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PeerChart } from '../../../utils/chart/chart';

function PeersChart(props) {
    const { peerComparisonTabledata, NSECode, BSEcode } = props;
    let stepChart = PeerChart();
    let categories = [];

    let seriesData = [];
    let first = -1 , second = -1;
    let firstIndex = -1 , secondIndex = -1;

    if(peerComparisonTabledata == null || peerComparisonTabledata.length == 0) {
        return <>N.A</>
    }
    peerComparisonTabledata.forEach((item, index) => {

        categories.push(item.name);
        seriesData.push(item);

        if(item.durabilityScore > first){
            second = first;
            first = item.durabilityScore;
        }
        else if( item.durabilityScore > second && item.durabilityScore != first){
            second = item.durabilityScore;
        }
    })
    
    seriesData = seriesData.map(item => {
        return (item.NSECode == NSECode || item.BSECode == BSEcode) ? {y:item.durabilityScore, color: "#006aff", dataLabels: { color: "#fff" }} : item.durabilityScore ;
    })

    stepChart = {
        ...stepChart,
        xAxis: {
            ...stepChart.xAxis,
            categories: [...categories]
        },
        series: [{
            ...stepChart.series[0],
            data: [...seriesData]
        }]
    }

    return (
        <Fragment>
            <HighchartsReact  highcharts={Highcharts} options={stepChart}/>
        </Fragment>
    )
}

export default PeersChart