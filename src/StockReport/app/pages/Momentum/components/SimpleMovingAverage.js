import React, { Fragment } from 'react'
import BearishBullishLinear from '../../../components/Momentum/BearishBullishLinear'
import SimpleAndExponentialList from './SimpleAndExponentialList'
import { getDictionaryToList } from '../../../utils/commonFunctions';

function SimpleMovingAverage(props) {
    const { simpleMovingAverageData } = props;
    let simpleMovingData = simpleMovingAverageData;
    const { bullishTotal = null, bearishTotal = null, movingAverageTotal = null, movingAveragePointerPercent = null } = simpleMovingData || {};
    let simpleMoving = getDictionaryToList(simpleMovingData?.insights);
    
    let insights = simpleMovingAverageData?.insight;

    let medianIndex = (simpleMoving.length % 2 != 0) ? (simpleMoving.length / 2) + 1 : (simpleMoving.length  / 2) ;
    
    let firstSMA = simpleMoving.slice(0, medianIndex);
    
    let secondSMA = simpleMoving.slice(medianIndex, simpleMoving.length);

    return (<Fragment>
        {insights && <p className="f-regular f-16">{insights}</p>}
        <div className="mt-5">
            <BearishBullishLinear 
                bearishValue={bearishTotal}
                bullishValue={bullishTotal}
                bad={0}
                mediumLow={35}
                mediumHigh={60}
                high={100}
            />

            <div className="f-14 p-4">
                <p className="f-bold text-center">Bullish v/s Bearish SMAs</p>
                <p className="f-regular text-center">(if the current price is above a moving average, it is considered bullish)</p>
            </div>

            {simpleMoving && simpleMoving.length > 0 && <div className="dvm-summary sma">
                <SimpleAndExponentialList data={firstSMA}/>
                <div className="divider-verticle"></div>
                <SimpleAndExponentialList data={secondSMA}/>
            </div>}
        </div>
    </Fragment>)
}

export default SimpleMovingAverage