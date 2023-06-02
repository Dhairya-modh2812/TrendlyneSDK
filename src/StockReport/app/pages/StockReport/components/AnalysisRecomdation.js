import React from 'react';
import Card from './Card';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { stackChart } from '../../../utils/chart/chart';
import styles from './AnalysisRecomdation.module.scss';
import { formatNumber } from '../../../utils/commonFunctions';
import EstimateProgress from './EstimateProgress';

function AnalysisRecomdation(props) {
    const {page1: {forecasterTarget}} = props;
    let { frequencyDistributionData, noOfAnalysts, priceDistributionData  } = forecasterTarget;
    
    let newFrequencyData = {};
    Object.keys(frequencyDistributionData).forEach(key => {
        if(frequencyDistributionData[key] != 0) {
            newFrequencyData[key] = frequencyDistributionData[key];
        } 
    })
    
    let gainChartOption = stackChart();
    let seriesData = [ {
        name: 'Strong Sell',
        data: [frequencyDistributionData.strongSell],
        color: "#FC5A5A"
    }, {
        name: 'Sell',
        data: [frequencyDistributionData.sell],
        color: "#FF8C8C"
    }, {
        name: 'Hold',
        data: [frequencyDistributionData.hold],
        color: "#FFC542"
    }, {
        name: 'Buy',
        data: [frequencyDistributionData.buy],
        color: "#1EC079"
    },{
        name: 'Strong Buy',
        data: [frequencyDistributionData.strongBuy],
        color: "#00A25B"
    }];
    
    gainChartOption = {
        ...gainChartOption,
        yAxis: {
            ...gainChartOption.yAxis,
            max: noOfAnalysts
        },
        plotOptions:{
            ...gainChartOption.plotOptions,
            series: {
                ...gainChartOption.plotOptions.series,
                dataLabels: {
                ...gainChartOption.plotOptions.series.dataLabels,
                style: {
                    textOutline: 'none',
                    color:'#fff',
                    fontSize: '0.9rem'
                },
                  useHTML: false,
                }
            },
        },
        series: [...seriesData]
    }
    
    return (<>
        <div className='row mb-4'>
            <div className='col'>
                <Card title={"ANALYST RECOMMENDATION"}>
                    <div className='row'>
                        <div className='col-6'>
                            <h6 className='f-14'>Consensus Recommendation </h6>
                            {forecasterTarget?.consensusRecommendation ? <h3 className={`f-24 ${forecasterTarget?.consensusRecommendation.toLowerCase()}`}>{forecasterTarget?.consensusRecommendation}</h3> : '-'}
                        </div>
                        <div className='col-6'>
                            <h6 className='f-14'>Target Price </h6>
                            {forecasterTarget?.avgTarget ? <h3 className='f-24'>{forecasterTarget?.avgTarget} <small className={`${ forecasterTarget?.upsideP >= 0 ? 'text-success' : 'text-negative'}`}>({formatNumber(forecasterTarget?.upsideP)})%</small></h3> : '-'}
                        </div>    
                    </div>
                    {noOfAnalysts && noOfAnalysts != 0  ? <div className='row'>
                        <div className='col-12 '>
                            <div className='position-relative'>
                                <HighchartsReact highcharts={Highcharts} options={gainChartOption} />
                                <div className={styles.totalAnalysis}>Total : {noOfAnalysts}</div>
                            </div>
                        </div>
                    </div> : ''}
                    {priceDistributionData && <div className='row mb-2'>
                        <div className='col-md-12'>
                            <EstimateProgress priceDistributionData={priceDistributionData}/>
                        </div>
                    </div>}
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className={`${styles.textBottom}`}>
                                The consensus recommendation is based on {noOfAnalysts} analyst recommendations. The Consensus Estimate is the aggregate analyst estimates for listed Indian companies.
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        </>
    )
}

export default AnalysisRecomdation