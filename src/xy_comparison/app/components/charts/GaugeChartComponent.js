import React from "react";
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);

export function GaugeChartComponent({object, firstStock, secondStock, stocks}) {
    (function(H) {
        H.addEvent(H.Legend, 'afterColorizeItem', function(e) {
            if (e.visible) {
                e.item.legendSymbol.attr({
                    fill: e.item.userOptions.color
                })
            }
        });
    })(Highcharts);

    let first_stock_y = null;
    let second_stock_y = null;
    let max_value = null;
    
    if (object.first_stock || object.second_stock) {
        max_value = object.first_stock > object.second_stock ? object.first_stock : object.second_stock;

        first_stock_y = (object.first_stock*100)/max_value;
        second_stock_y = (object.second_stock*100)/max_value;
    }


    const options = {
        chart: {
            type: 'solidgauge'
        },

        title: {
            text: object?.verbose?.sstr,
            align: 'center',            
            verticalAlign: 'middle',
            flex:'wrap',
            y: -15,
            widthAdjust: -200,
            style: {               
                fontSize: '12px',
                lineHeight: '16px',
                width: '10px',
                color:'#202020'
            }
        },

        legend: {
            enabled: true
        },

        credits: {
            enabled: false
        },

        pane: {
            startAngle: 0,
            endAngle: 324, // max 90% rotation
            background: [
                {
                    outerRadius: '112%',
                    innerRadius: '88%',
                    backgroundColor: Highcharts.color('#016aff').setOpacity(0.3).get(),
                    borderWidth: 0
                },
                {
                    outerRadius: '87%',
                    innerRadius: '63%',
                    backgroundColor: Highcharts.color('#ff49ad').setOpacity(0.3).get(),
                    borderWidth: 0
                }
            ]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false,
                },
                rounded: true,
                showInLegend: true
            }
        },
        tooltip: {
            valueDecimals: 1,
            formatter: function (tooltip) {
                this.point.y = this.point.options.originalY;
                return tooltip.defaultFormatter.call(this, tooltip);
            }
        },

        series: [
            {
                name: stocks[firstStock]?.name,
                color: '#016aff',
                showInLegend: true,
                data: [
                    {
                        radius: '112%',
                        innerRadius: '88%',
                        color: '#016aff',
                        y: first_stock_y,
                        originalY: object.first_stock,
                    }
                ]
            },
            {
                name: stocks[secondStock]?.name,
                color: '#ff49ad',
                showInLegend: true,
                data: [
                    {
                        radius: '87%',
                        innerRadius: '63%',
                        color: '#ff49ad',
                        y: second_stock_y,
                        originalY: object.second_stock,
                    }
                ]
            }
        ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 600
                },
                chartOptions: {
                    pane: {
                        size: '70%'
                    }
                }
            }]
        },
    };

    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </>
    );
}
