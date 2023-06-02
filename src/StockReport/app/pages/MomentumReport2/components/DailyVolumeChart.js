import React, { Fragment } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { convertToInternationalCurrencySystem, getDictionaryToList } from '../../../utils/commonFunctions';

function DailyVolumeChart(props) {
    
    const { volumesList, deliverys, period} = props;

    const chartOptions = {
        chart: {
            type: 'column',
            inverted: true,
            height: 200
        },
        scrollbar: {
            enabled: false
        },
        exporting: { enabled: false },
        credits: {
            enabled: false,
        },
        legend: {
            enabled: false,
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: period
        },
        yAxis: [{
            min: 0,
            title: {
                text: ''
            }
        }, {
            title: {
                text: ''
            }
        }],
        legend: {
            symbolHeight: 12,
            symbolWidth: 12,
            symbolRadius: 1   
        },
        tooltip: {
            shared: false
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderRadius: 3,
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    align: "left",
                    formatter: function () {
                        if (this.y) {
                            return `${ convertToInternationalCurrencySystem(this.y)}`;
                        }
                    },
                    style: {
                      fontSize: "14px",
                      fontWeight: 600,
                      fontFamily: "Lato Semibold",
                      color: "#202020",
                    },
                },
            },
            
        },
        series: [{
            name: 'Combined Delivery Volume',
            data: deliverys,
            color: "#016aff",
            pointPadding: 0.3 ,
            zIndex: 2
        },{
            name: 'NSE + BSE Traded Volume',
            data:  volumesList,
            color: "#e9f2ff",
            pointPadding: 0
        }]
    }

    
    return (
        <Fragment>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} /> 
        </Fragment>
    )
}

export default DailyVolumeChart