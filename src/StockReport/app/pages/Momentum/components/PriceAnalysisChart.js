import React, { Fragment } from 'react'
import Highcharts from "highcharts";
// import Highcharts from 'highcharts/highstock';
import HighchartsReact from "highcharts-react-official";
import xrange from 'highcharts/modules/xrange';
import pathfinder from 'highcharts/modules/pathfinder';
pathfinder(Highcharts);
xrange(Highcharts)
function PriceAnalysisChart(props) {

    const { data = [], currentPrice} = props;
    if(data.length == 0) {
        return <></>
    }

    let seriesData = [];
    let categories = [];
    data.forEach((item, index) => {
        categories.push(item?.name)
        seriesData.push([item?.low, item?.high])
    });

    let chartOptions = {
        chart: {
            type: 'columnrange',
            inverted: true,
            style: { paddingTop: 20 },
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
            categories: categories
        },
    
        yAxis: {
            title: {
                text: ''
            },
            style: {
                color: "#e3e3e3"
            },
            plotLines: [{
                color: '#006aff',
                dashStyle: "dash",
                label: {
                    text: `<div class="d-flex flex-column align-items-center">
                    <b style="color: #006aff;">LTP : ${currentPrice}</b><div style="width: 10px; height: 10px; border-radius:50%; background: #006aff;"></div>`,
                    rotation: 0,
                    verticalAlign: "top",
                    useHTML: true,
                    align:'center',
                    x: -1,
                },
                width: 2,
                value: currentPrice,
                zIndex: 5,
                style: {
                    border: "6px solid #006aff",
                   
                    backgroundColor: "#006aff",
                    borderRadius: "50%",
                }
            }]
        },
    
        tooltip: {
            enabled: false,
            valueSuffix: '°C'
        },
    
        plotOptions: {
            columnrange: {
                dataLabels: {
                    enabled: true,
                    format: '{y}'
                },
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
    
        legend: {
            enabled: false
        },
    
        series: [{
            name: '',
            color: "#e3e3e3",
            positiveColor: "#0f0",
            negativeColor: "#f00",
            data: seriesData
        }]    
    }

    

    //chartOptions = {"chart":{"type":"xrange","height":240},"exporting":{"enabled":false},"credits":{"enabled":false},"title":{"text":""},"legend":{"enabled":false},"xAxis":{"labels":{"enabled":false},"tickLength":0},"yAxis":{"gridLineWidth":0,"minorGridLineWidth":0,"title":{"text":""},"categories":["Financials","Ownership","Peer Comparison","Value & Momentum","Total"],"reversed":true,"labels":{"style":{"fontFamily":"Lato Semibold","fontSize":"14px","fontWeight":"600","fontStretch":"normal","fontStyle":"normal","lineHeight":"1.43","letterSpacing":"normal","textAlign":"right","color":"#666"}}},"tooltip":{"enabled":false},"plotOptions":{"series":{"animation":false,"dataLabels":{"enabled":true},"connectors":{"lineColor":"#666666","dashStyle":"dash","lineWidth":1,"type":"simpleConnect","startMarker":{"align":"right","enabled":false,"symbol":"line","verticalAlign":"bottom"},"endMarker":{"align":"left","verticalAlign":"top"}}}},"series":[{"name":"Project 1","borderColor":"transparent","pointWidth":20,"borderRadius":0,"data":[{"x":0,"x2":6,"y":0,"color":"#00A25B","id":null},{"x":6,"x2":8,"y":0,"color":"#FC5A5A","id":null},{"x":8,"x2":11,"y":1,"color":"#00A25B","id":"index0"},{"x":11,"x2":12,"y":1,"color":"#FC5A5A","id":null},{"x":12,"x2":13,"y":2,"color":"#00A25B","id":"index1"},{"x":13,"x2":15,"y":2,"color":"#FC5A5A","id":null},{"x":15,"x2":18,"y":3,"color":"#00A25B","id":"index2"},{"x":18,"x2":23,"y":3,"color":"#FC5A5A","id":null},{"x":0,"x2":13,"y":4,"color":"#00A25B","id":null},{"x":13,"x2":23,"y":4,"color":"#FC5A5A","id":"index3"},{"x":23,"x2":23,"y":4,"color":"#ffc542","id":"index3"}],"dataLabels":{"align":"center","color":"#fff","useHTML":true,"enabled":true}}]}
    return (<Fragment>
        <HighchartsReact  highcharts={Highcharts} options={chartOptions}/>
    </Fragment>
        
    )
}

export default PriceAnalysisChart