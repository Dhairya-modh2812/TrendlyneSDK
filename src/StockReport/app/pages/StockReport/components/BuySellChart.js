import React, { useEffect, useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { gainerChart } from '../../../utils/chart/chart';
import { isEmpty } from '../../../utils/commonFunctions';
import * as commonAssets from '../../../utils/Constants/commonAssets';
import styles from './BuySellChart.module.scss';

function BuySellChart(props) {
    let { buySellData } = props;
    // const [gainChart, setGainChart] = useState(null);
    let chartData = buySellData?.consolidatedChartData || buySellData?.standaloneChartData || [];
    const buySellPercentage = buySellData?.consolidatedValueP || buySellData?.standaloneValueP;
    const title = buySellData?.title || '';
    let gainChartOption = gainerChart();
    
    let data = [];
    let categories = [];
    let seriesName = '';
    
    if (!isEmpty(buySellData) && chartData.length > 1) {
        
        
        chartData && chartData?.forEach((element, index) => {
            if (index == 0) {
                seriesName = element[1]
            }
            if (index != 0) {
                data.push(element[1]);
                categories.push(element[0])
            }

        });
        gainChartOption = {
            ...gainChartOption,
            xAxis: {
                ...gainChartOption.xAxis,
                categories: [...categories]
            },
            plotOptions: {
                ...gainChartOption.plotOptions,
                series: {
                    borderWidth: 0,
                    color: {
                        linearGradient: [0, 490, 500, 490, 0],
                        stops: [
                            [0, '#00a25b'],
                            [0.5, '#4c96ff'],
                            [1, '#fc5a5a']
                        ]
                    }
                }
            },
            series: [{
                ...gainChartOption.series[0],
                name: seriesName,
                data: [...data]
            }]
        }
    }

    

    const afterChartRendered = (chart) => {
        let elem = document.getElementById('buySellChart');
        let innerElem = $(elem).find('.highcharts-series-group')[0];
        let outerElem = $(elem).find('.stacked-bar-chart')[0];
        if (typeof innerElem === undefined || typeof outerElem === undefined) return;

        // calculating inner and outer boundaries of chart.
        let innerRect = innerElem.getBoundingClientRect();
        let outerRect = outerElem.getBoundingClientRect();

        // calculation left position and width of div containing ruler and indicatior. 
        let leftPos = innerRect.x - outerRect.x;
        let width = innerRect.width;

        // after aligning the container div appending the ruler image.
        let imgDiv = $(elem).find('.pe-ruler')[0];
        $(imgDiv).css('width', width);
        $(imgDiv).css('left', leftPos);
    }
    if (isEmpty(buySellData) || chartData.length <= 1) {
        return <></>
    }

    return (
        <div id="buySellChart">
            <HighchartsReact highcharts={Highcharts} options={gainChartOption} callback={afterChartRendered} containerProps={{ className: "stacked-bar-chart" }} />
            {buySellPercentage && <div className='position-relative' data-content={`${buySellPercentage} ${title}`} style={{ "--data-left": `${buySellPercentage}%` }}>
                <div className={`${styles.ruler} position-relative pe-ruler`}>
                    <img src={commonAssets.ruler} className={`${styles.rulerImage} img-fluid w-100`} />
                    <div className={`${styles.line} position-absolute line`} style={{ left: `${buySellPercentage}%`, "--data-left": `${buySellPercentage}%` }}>
                        <img src={commonAssets.combinedIndicator} className={styles.chartIndicator} />
                        <p className={styles.text}><b>{buySellPercentage}%</b> {title}</p>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default BuySellChart