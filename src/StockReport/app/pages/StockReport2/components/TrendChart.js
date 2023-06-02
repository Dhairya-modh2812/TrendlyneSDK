import React, { Fragment } from 'react';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { StepChart } from '../../../utils/chart/chart';
import moment from 'moment';
import { plotLinesValues, zonesValues, getZonesList } from '../../../utils/Constants/commonConstants';

function TrendChart(props) {
    const { data } = props;
    if(data == undefined ) {
        return <></>
    }
    let seriesData = [];
    let zonesList = getZonesList('durability');
    data.forEach(item => {
        seriesData.push([moment(item.date).valueOf(), item.value])
    })
    const plotLines = [
        {
          value: plotLinesValues['durability'].good,
          color: "#00a25b",
          dashStyle: "dash",
          width: 1,
          zIndex: 5,
          label: {
            text: "Good",
            align: "right",
            verticalAlign: "middle",
            y: 3,
            x: 35,
            style: {
              color: "#00a25b",
              textTransform: "uppercase",
              fontSize: "10px",
              fontFamily: "Lato,sans-serif"
            },
            useHTML: true,
          },
        },
        {
          value: plotLinesValues['durability'].medium,
          color: "#ff9633",
          dashStyle: "dash",
          width: 1,
          zIndex: 5,
          label: {
            text: "Medium",
            align: "right",
            verticalAlign: "middle",
            y: 3,
            x: 45,
            style: {
              color: "#ff9633",
              textTransform: "uppercase",
              fontSize: "10px",
              fontFamily: "Lato,sans-serif"
            },
          }
        },
    ]
    let stepChart = StepChart();
    stepChart = {
         ...stepChart,
         yAxis: {
            ...stepChart.yAxis,
            plotLines
         },
         series: [{
            ...stepChart.series[0],
            data: [...seriesData],
            zones: zonesList
         }]
    }

    return (
        <Fragment>
            <HighchartsReact  highcharts={Highcharts}   options={stepChart}/>
        </Fragment>
    )
}

export default TrendChart