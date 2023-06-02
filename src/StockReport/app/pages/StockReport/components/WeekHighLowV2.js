import React from 'react'
import { calculatePos } from '../../../utils/commonFunctions';


function WeekHighLow(props) {
    const { stockData } = props;
    const weekHighLow = stockData?.['52_Week_High_Low'];

    if(!weekHighLow) {
        return <></>
    }

    let {low, open, close, high, startPrice } = weekHighLow ;
    let color = weekHighLow ? weekHighLow?.progressBarColor : '';
    // if any value is null then return empty elements
    if(low == null || startPrice == null || close == null || high == null) {
        return <></>
    }
 
    let minValue = Math.min(low, high, startPrice, close);
    let maxValue = Math.max(low, high, startPrice, close);

    //  find position 
    let currPos = calculatePos(minValue, maxValue, close);
    let estimatePos = calculatePos(minValue, maxValue, startPrice);
    let lowPos = calculatePos(minValue, maxValue, low);
    let highPos = calculatePos(minValue, maxValue, high);

    let highStyle = {};

    if(high !== maxValue) {
        highStyle.left = highPos + "%";
    }
    
    

    let currentStyle = {left: `${currPos}%`};
    let estimateStyle = {left: `${(estimatePos)}%`}
 
    return ( <>
            <div className='position-relative header-progress'>
                <div className="progress price-estimate">
                    <div className={`filler`} style={{width: `${currPos}%`}}></div>
                    <div className='low-estimate'>
                        <p className='value'>{low}</p>
                    </div>
                    <div className='current-price' style={currentStyle}>
                        <p className='value'>{close}</p>
                    </div>
                    <div className='high-estimate' style={highStyle}>
                        <p className='value'>{high}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeekHighLow