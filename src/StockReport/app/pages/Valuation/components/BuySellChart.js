import React, { useEffect } from 'react';
import { percentageRender } from '../../../utils/commonFunctions';
function BuySellChart(props) {
    const { buySellData } = props;
    
    let { standaloneValueP, standaloneZoneP, standaloneZoneColor } = buySellData;
    
    const insightRender = () => {
        let messageText = '';
        let check = 50 - standaloneValueP;
        if(check < 0) {
            messageText = 'into PE Sell Zone'
        }else {
            messageText = 'into PE BUY Zone'
        }
        return <>
            <div className='pinpoint-text' style={{left: `calc(${standaloneValueP}% - 63px)`}}>
                <span className={`f-24 text-${standaloneZoneColor}`}>{percentageRender(standaloneZoneP)}</span>
                <div className='f-16 f-semibold'>{messageText}</div>
            </div>
        </>
    }
    return (
        <div className='buy-sell-zone'>
            <div className='text-indicator'>
                <span className='text-success'>BUY Zone</span>
                <span className='text-danger'>SELL Zone</span>
            </div>
            <div className='buy-sell-zone-chart'>
                <div className='divider'></div>
                <div className='pinpoint' style={{left: `${standaloneValueP}%`}}></div>
                {insightRender()}
                {/* <div className='pinpoint-text' style={{left: `calc(${standaloneValueP}% - 63px)`}}>
                    <span className='f-24 text-success'>{percentageRender(standaloneZoneP)}</span>
                    <div className='f-16 f-semibold'>into PE BUY Zone</div>
                </div> */}
            </div>
            <div className='chart-value'>
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
            </div>
            <div className='text-indicator'>
                <span className='f-13 text-success text-left'>Strong Upside <br/>Potential</span>
                <div className='text-center'>
                    <p>% time spent below current P/E</p>
                    <p><small>(less is better for buying)</small></p>
                </div>
                <span className='f-13 text-danger text-right'>Gains Already <br/>Realised</span>
            </div>
        </div>
    )
}

export default BuySellChart