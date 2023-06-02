import React from 'react';
import Card from './Card';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { XRangeChart } from '../../../utils/chart/chart';
import styles from './AnalysisRecomdation.module.scss';
import { formatNumber } from '../../../utils/commonFunctions';
import xrange from 'highcharts/modules/xrange';
import pathfinder from 'highcharts/modules/pathfinder';
pathfinder(Highcharts);
xrange(Highcharts)

function Checklist(props) {
    const {page1 : {checklistData}} = props;
    const {categoryPassData , passP, totalFail, totalPass } = checklistData;
    let gainChartOption = XRangeChart();
    const categoriesObj = [{label:'Financials', key: 'financialsData'}, {label: 'Ownership', key: "ownershipData"}, {label: 'Peer Comparison', key: "peerComparisonData"}, {label: 'Value & Momentum', key: 'valueAndMomentumData'}];
    let chartSeriesValues = []
    
    const categories = [];
    let startRange = 0;
    let prevYesNo = 0;
    let totalNeutral = 0;
    let connectId = 'index';
    let prevConnectId = 'index';
    let connect;
    categoriesObj.map((obj, index) => {
        
        let {Yes, No, Neutral} = categoryPassData[obj.key];
        categories.push(obj.label);

        connect = {
            to: 'index' + index, // Which point to connect to
        }
        if(categoriesObj.length - 1 == index) {
            connect = {
                ...connect,
                startMarker: {
                    align: "right",
                    enabled: false,
                    symbol: "line",
                    verticalAlign: "bottom"
                },
                endMarker: {
                    align: "right",
                    verticalAlign: "top"
                }
            }
        }
        chartSeriesValues =  [
            ...chartSeriesValues,
            ...[
                Yes ? {x: prevYesNo , x2: prevYesNo + Yes, y: index, color: "#00A25B", connect: Neutral == 0 && No == 0 ? {...connect} : {}, id: index != 0 && Yes != 0 ? connectId : null} : null, 
                No ? {x: index == 0 ? Yes : prevYesNo + Yes , x2: (prevYesNo + Yes + No), y: index, color: "#FC5A5A", connect:  Neutral == 0 ? {...connect} : {}, id: index != 0 && Yes == 0 && No != 0 ? connectId : null} : null,
                Neutral ? {x: index == 0 ? (Yes + No) : (prevYesNo + Yes + No) , x2: (prevYesNo + Yes + No + Neutral), y: index, color: "#ffc542", connect: {...connect}, id: index != 0 ?  connectId : null} : null
            ]
        ]
        
        startRange = startRange + Yes + No + Neutral;
        prevYesNo = prevYesNo + Yes + No + Neutral;
        totalNeutral = totalNeutral + Neutral;
        prevConnectId = connectId;
        connectId = 'index'+index
       
       
    });


    categories.push("Total");
    chartSeriesValues = chartSeriesValues.filter(value => value != null)
    
    connect = {
        to: connectId, // Which point to connect to
    }
    
    gainChartOption = {
        ...gainChartOption,
        yAxis: {
            ...gainChartOption.yAxis,
            categories: [...categories],
            labels: {
                ...gainChartOption.yAxis.labels,
                formatter: function() {
                    // check last label and update styles of last label text on y axis
                    if(this.isLast) {
                      return `<span style='font-size: 16px; font-weight: 700; font-family: Lato,sans-serif; color: #202020'>${this.value}</span>`
                    }
                    return this.value;
                }
            }
        },
        series: [{
            ...gainChartOption.series[0],
            data: [
                ...chartSeriesValues,
                ...[{
                    x: 0,
                    x2: totalPass,
                    y: 4,
                    color: "#00A25B",
                    id: totalFail != 0 || totalNeutral != 0 ? null : connectId
                },{
                    x: totalPass,
                    x2: totalPass + totalFail,
                    y: 4,
                    color: "#FC5A5A",
                    id: totalNeutral != 0 ? null : connectId
                },{
                    x: totalPass + totalFail,
                    x2: totalPass + totalFail + totalNeutral,
                    y: 4,
                    color: "#ffc542",
                    id: connectId
                    
                }]
            ]
        }]
    }

    return (<>
        <div className='row mb-4'>
            <div className='col'>
                <Card title={"Trendlyne Checklist"}>
                    <div className='row'>
                        <div className='col-6'>
                            <h4 className='f-36 text-success fw-bold'>{formatNumber(passP, 1)}% <span className='f-20 font-weight-normal'>Passed in checklist</span></h4>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <HighchartsReact highcharts={Highcharts} options={gainChartOption} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className={`${styles.textBottom}`}>
                                The Trendlyne Checklist checks if the company meets the key criteria for financial health and consistent growth.
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        </>
    )
}

export default Checklist