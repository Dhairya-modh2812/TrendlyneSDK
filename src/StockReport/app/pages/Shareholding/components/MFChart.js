import React, { Fragment, useState } from 'react';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { multilineChart, PeerChart } from '../../../utils/chart/chart';

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
      enabled: false,
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
      title: {
        text: "",
      },
    },

    xAxis: {
      title: {
        text: "",
      },
      accessibility: {
        description: "",
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

function MFChart(props) {
    const { chartOption} = props;
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
            return this?.point?.name + ', ' + this.y
        }
    }
    
    if(chartOption) {
        stepChart = {
            ...chartOption
        }
    }
    return (
        <Fragment>
            <HighchartsReact  highcharts={Highcharts}  options={stepChart}/>
        </Fragment>
    )
}

export default MFChart