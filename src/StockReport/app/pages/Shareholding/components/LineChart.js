import React, { Fragment, useState } from 'react';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { multilineChart, PeerChart } from '../../../utils/chart/chart';
import { formatNumber } from '../../../utils/commonFunctions';

const DEFAUL_CHART_OPTION = {
    chart: {
      type: "line",
      height: 300,
    },

    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
    },
    title: {
      text: "",
    },
    navigator: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },

    xAxis: {
      title: {
        text: "",
      },
      accessibility: {
        description: "Time from December 2010 to September 2019",
      },
      categories: [],
    },

    tooltip: {
      valueSuffix: "%",
      enabled: false,
    },

    plotOptions: {
      line: {
        marker: {
          enabled: true,
        },
      },
    },
    series: [],
};

function LineChart(props) {
    const { columnOptions } = props;
    
    let stepChart = DEFAUL_CHART_OPTION;
    let marker = {
        enabled: true,
        symbol: "circle"
    }
    let dataLabels = {
        enabled: true,
        fontFamily: "lato",
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.43,
        textSlign: "left",
        formatter: function(value) {            
            return formatNumber(this.y, 1) + '%'
        }
    }

    stepChart = {
        ...stepChart,
        plotOptions: {
          ...stepChart.plotOptions,
          series: {
            ...stepChart.plotOptions.series,
            dataLabels
          }
        } ,
        yAxis: {
          ...stepChart.yAxis,
          labels: {
            ...stepChart.yAxis.labels,
            enabled: true,
            formatter: function(value) {
              return this.value + '%'
            }
          }
        },
        xAxis: {
            ...stepChart.xAxis,
            categories: [...columnOptions.categories]
        },
        series: [...columnOptions.series]
    }
      
   
    return (
        <Fragment>
            <HighchartsReact  highcharts={Highcharts} options={stepChart}/>
        </Fragment>
    )
}

export default LineChart