import React, { useState } from "react";

import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function DonutChartComponent(props) {
  let { chartData } = props;
 

 
  const options = {
    chart: {
      width: 270,
      height: 270,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      backgroundColor: 'transparent',
    },

    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },

    plotOptions: {
      pie: {
        showInLegend: false,

        dataLabels: {
          enabled: false,
          style: {
            fontweight: "bold",
            fontsize: 50,
          },
        },
      },
    },
  //   tooltip: {
  //     pointFormat: '<b>{point.percentage:.2f}%</b>'
  // },


  tooltip: {
    headerFormat: '',
    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b>' +
        ':<b>{point.percentage:.2f}%</b><br/>' 
},
    series: [
      {
        minPointSize: 10,
        innerSize: "60%",
        zMin: 0,
        
        data: [...chartData],
      },
    ],
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
