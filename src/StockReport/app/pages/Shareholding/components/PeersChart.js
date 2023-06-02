import React, { Fragment } from 'react';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { PeerChart } from '../../../utils/chart/chart';
import { formatNumber } from '../../../utils/commonFunctions';

const PeersChart = React.forwardRef((props, ref) =>  {
    const { peerComparisonTabledata, NSECode, BSEcode, pieChartData } = props;
    let stepChart = PeerChart();

    let seriesData = [];
    let chartColors = {
      Promoter: '#d0f2f6',
      DII: '#ccecde',
      FII: '#e6f0ff',
      Public: '#e1c0e5',
      Others: '#e0e0e0'
    }
   
    let categories = [];
    pieChartData.forEach((item, index) => {
      if(index != 0) {
        categories.push(item[0]);
        seriesData.push({y: item[1], color: chartColors[item[0]]})
      }
    })
    stepChart = {
      ...stepChart,
      xAxis: {
          ...stepChart.xAxis,
          categories: [...categories]
      },
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
      plotOptions: {
        ...stepChart.plotOptions,
        series: {
          ...stepChart.plotOptions.series,
          dataLabels: {
            ...stepChart.plotOptions.series.dataLabels,
            formatter:function(value) {
              return `${formatNumber(this.y, 1)}%`
            },
          }
        }
      },
      series: [{
          ...stepChart.series[0],
          data: [...seriesData]
      }]
    }
    
    return (
        <Fragment>
            <HighchartsReact ref={ref} highcharts={Highcharts} options={stepChart}/>
        </Fragment>
    )
})

export default PeersChart