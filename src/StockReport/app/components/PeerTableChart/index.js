import React from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { peerTableColumnChart } from '../../utils/chart/chart';

function ComparisionChart(props) {
    // let sparkline = peerTableColumnChart();

    // if(props.series.length == 0) {
    //     return <></>
    // }

    // let spOption = {
    //     ...sparkline,
    //     series: [{
    //         data: props.series
    //     }]
    // }
    
    return (
        <>
            <HighchartsReact highcharts={Highcharts} options={props.option} />
        </>
    )
}

export default ComparisionChart