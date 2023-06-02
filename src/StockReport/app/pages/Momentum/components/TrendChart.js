import React, { Fragment } from 'react';

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HcMore from "highcharts/highcharts-more";
import { StepChart } from '../../../utils/chart/chart';
import moment from 'moment';
import { getZonesList, plotLinesValues } from '../../../utils/Constants/commonConstants';
// HcMore(Highcharts);

function TrendChart(props) {
    const { data } = props;
    if(data == undefined ) {
        return <></>
    }
    let seriesData = [];
    let zonesList = getZonesList('momentum');
    data.forEach(item => {
        seriesData.push([moment(item.date).valueOf(), item.value])
    })
    const plotLines = [
        {
          value: plotLinesValues['momentum'].good,
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
          }
        },
        {
          value: plotLinesValues['momentum'].medium,
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
          },
        },
    ]
    let stepChart = StepChart();
    stepChart = {
        ...stepChart,
        chart: {
          ...stepChart.chart,
          type: 'spline'
        },
        yAxis: {
            ...stepChart.yAxis,
            max:100,
            plotLines
        },
        series: [{
            ...stepChart.series[0],
            data: [...seriesData],
            zones: zonesList
        }],
    }
    
    return (
        <Fragment>
            <HighchartsReact  highcharts={Highcharts}  options={stepChart}/>
        </Fragment>
    )
}

export default TrendChart