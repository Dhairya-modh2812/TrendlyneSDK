import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsStock from "highcharts/highstock";
import addTreemapModule from 'highcharts/modules/treemap';

addTreemapModule(Highcharts);

Highcharts.setOptions({
    colors: ['#00a25b', '#50B432']
});

export function StockChart() {

    const options = {
        chart: {
            margin: [0, 0, 0, 0],       
        },
        // colorAxis: {
        //     minColor: '#00a25b',
        //     maxColor: Highcharts.getOptions().colors[0]
        // },
        plotOptions: {
            treemap: {                
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "#f5f6f8",                         
              },
            },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified', 
            data: [{
                name: 'INFOSYS',
                value: 6,
                colorValue: 3,
            }, {
                name: 'ICICI BANK',
                value: 6,
                colorValue: 2,
            }, {
                name: 'AXISBANK',
                value: 4,
                colorValue: 3,
            }, {
                name: 'HDFC LIFE',
                value: 3,
                colorValue: 4,
            }, {
                name: 'KOTAKBANK',
                value: 2,
                colorValue: 5,
            }, {
                name: 'SBILIFE',
                value: 2,
                colorValue: 6,
            }, {
                name: 'BOBFINAN',
                value: 1,
                colorValue: 7,       
            }]
        }],
        title: {
            text: 'Highcharts Treemap'
        }
    }
    return (
        <>
            <div className="StockChart">
                <HighchartsReact 
                highcharts={Highcharts} 
                options={options} />
            </div>
        </>
    )
}