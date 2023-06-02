import React from 'react'
import { calculatePos } from '../../../utils/commonFunctions';

function EstimateProgress(props) {
    const { priceDistributionData } = props;

    let {lowEstimate, currentEstimate, averageEstimate, highEstimate } = priceDistributionData ;
    
    // if any value is null then return empty elements
    if(lowEstimate == null || currentEstimate == null || averageEstimate == null || highEstimate == null) {
        return <></>
    }
 
    let minValue = Math.min(lowEstimate, highEstimate, currentEstimate, averageEstimate);
    let maxValue = Math.max(lowEstimate, highEstimate, currentEstimate, averageEstimate);

    //  find position 
    let currPos = calculatePos(minValue, maxValue, currentEstimate);
    let estimatePos = calculatePos(minValue, maxValue, averageEstimate);
    let lowPos = calculatePos(minValue, maxValue, lowEstimate);
    let highPos = calculatePos(minValue, maxValue, highEstimate);

    // find position and width for the progress filled line bar
    let fillerPos = currPos < estimatePos ? +currPos : +estimatePos;
    let fillerWidth = Math.abs(estimatePos - currPos);

    let highStyle = { width: (100) + "%" };

    if(highEstimate !== maxValue) {
        highStyle.left = highPos + "%";
    }

    if(currPos > estimatePos) {
        currPos -= .5;
        estimatePos += .20;
    }else {
        currPos += .20;
        estimatePos -= .45;
    }

    return ( <>
            <div className='position-relative'>
                <div className="progress price-estimate">
                    <div className={`filler ${(currPos < estimatePos ? 'positive' : 'negative')}`} style={{left: `${fillerPos}%`, width: `${fillerWidth + 2}%`}}></div>
                    <div className='marker-1 d-flex' style={{left: `${currPos}%`}}></div>
                    <div className='marker-2 d-flex' style={{left: `${( estimatePos)}%`}}></div>
                    <div className='low-estimate' style={{left: `${lowPos}%`}}>
                        <p>Low Estimate</p>
                        <p className='value'>{lowEstimate}</p>
                        <div className='triangle'></div>
                    </div>
                    <div className='current-price' style={{left: `${currPos}%`}}>
                        <p>Current Price</p>
                        <p className='value'>{currentEstimate}</p>
                        <div className='triangle'></div>
                    </div>
                    <div className='avg-estimate' style={{left: `${(estimatePos)}%`}}>
                        <p>Average Estimate</p>
                        <p className='value'>{averageEstimate}</p>
                        <div className='triangle'></div>
                    </div>
                    <div className='high-estimate' style={highStyle}>
                        <p>High Estimate</p>
                        <p className='value'>{highEstimate}</p>
                        <div className='triangle'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EstimateProgress