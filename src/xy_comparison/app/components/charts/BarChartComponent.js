import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function BarChartComponent({first_four_objects, firstStock, secondStock, stocks}) {
    let categories = [];
    let first_stock_array = [];
    let second_stock_array = [];
    if (first_four_objects) {
        for (const [key, value] of Object.entries(first_four_objects)) {
            categories.push(value?.verbose?.lstr);
            first_stock_array.push(value[firstStock])
            second_stock_array.push(value[secondStock])
        }
    }

    const options = {
        chart: {
            type: 'column'
        },
        title: {
            text: ''            
        },
        legend: {
            align: 'letf',
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            visible: true,
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y, 1);
                    }
                }               
            }
        },
        series: [
            {
                type: 'column',
                name: stocks[firstStock]?.name,
                color: '#016aff',
                data: first_stock_array,                
                borderRadius: 5,
                // data: [500],
            },
            {
                type: 'column',
                name: stocks[secondStock]?.name,
                color: '#ff49ad',
                data: second_stock_array,
                // data: [10001],                
                borderRadius: 5,
            }
        ]
    }

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </>
    );
}
