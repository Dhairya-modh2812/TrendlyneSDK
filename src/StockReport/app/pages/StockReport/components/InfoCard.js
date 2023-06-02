import React from 'react';
import styles from './InfoCard.module.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { sparklineChart } from '../../../utils/chart/chart';
import { formatNumber } from '../../../utils/commonFunctions';

const InfoCard = (props) => {
    const {data, sparklineData} = props;
    
    if(data?.value == null ) {
        return <></>
    }

    let colors = {
        'neutral' : "#ff9633",
        'positive' : "#00a25b",
        'negative' : "#fc5a5a"
    }
    let sparkLineOption = sparklineChart();
    let series = [];

    let showChart = false; //default is false

    sparklineData?.annualChartData?.forEach(item => {
        if(item.value) {
            showChart= true; // if chart data has a value then set true
        }
        series.push(item.value);
    })

    sparkLineOption = {
        ...sparkLineOption,
        series: [{
            data: series,
            color: colors[data?.color1]
        }]
    }

    console.log('first',sparklineData)
    
    return ( 
        <div className={`${styles.card}`}>
            <p className={`${styles.title} f-14`}>{data.title}</p>
            
            <div className={`${styles.value} f-24 text-${data.color1} mb-3`}> 
                {formatNumber(data?.value, 1)}
                {sparklineData && showChart && <HighchartsReact highcharts={Highcharts} options={sparkLineOption} /> }
            </div>
            <div className={`badge badge-default w-100 f-14`}>{data?.st1}</div>
        </div>
    );
}
 
export default InfoCard;