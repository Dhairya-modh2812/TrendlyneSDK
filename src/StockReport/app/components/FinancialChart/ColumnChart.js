import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsStock from "highcharts/highstock";
import HighchartsReact from 'highcharts-react-official';
import HighchartsPatternFill from "highcharts/modules/pattern-fill";
import HcMore from "highcharts/highcharts-more";
import Exporting from 'highcharts/modules/exporting';
import { FinancialChart } from '../../utils/chart/chart';
import moment from 'moment';
// HcMore(Highcharts);
// Exporting(Highcharts);
HighchartsPatternFill(Highcharts);

const linePattern = "M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9";


function ColumnChart(props) {
  const { data, ttmValue } = props;
  let financialOption = FinancialChart();
  
  let series = [];
  let category = [];
  
  if(data) {
    // check ttm value
    if(ttmValue) {
      category.unshift('TTM');
      series.unshift({color: "#006aff", y: ttmValue})
    }
    
    data.forEach((item, index) => {
      if(item.value != 0) {
        let yearStr = 'FY' + moment('01' + item.yearStr).format('YY') 
        let seriesData;
        if(index == 0) {
          seriesData = {
            color: !ttmValue ?  item.value >= 0 ? "#006aff" : "rgb(252, 90, 90)" : '',
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
    xAxis: {
      ...financialOption.xAxis,
      categories: [...category]
    },
    series: [{
      ...financialOption.series[0],
      data: [...series]
    }]
  }
  return (<>
    <HighchartsReact  highcharts={Highcharts} options={financialOption} />
  </>)
}

export default ColumnChart