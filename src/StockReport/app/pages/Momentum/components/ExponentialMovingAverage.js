import React, { Fragment } from 'react'
import BearishBullishLinear from '../../../components/Momentum/BearishBullishLinear'
import SimpleAndExponentialList from './SimpleAndExponentialList'
import { getDictionaryToList, isEmpty } from '../../../utils/commonFunctions';

function ExponentialMovingAverage(props) {
    const { exponentialMovingAverageData = null } = props;
    
    if(exponentialMovingAverageData == null || isEmpty(exponentialMovingAverageData)) {
        return <></>
    }
    const { bullishTotal, bearishTotal, movingAverageTotal, movingAveragePointerPercent } = exponentialMovingAverageData;
    let exponentialMovingData = exponentialMovingAverageData;
    let exponentialMoving = getDictionaryToList(exponentialMovingData?.insights);
    
    let medianIndex = (exponentialMoving.length % 2 != 0)? (exponentialMoving.length / 2) + 1 : exponentialMoving.length / 2;
    let firstEMA = exponentialMoving.slice(0, medianIndex);
    
    let secondEMA = exponentialMoving.slice(medianIndex, exponentialMoving.length);
    let insight = exponentialMovingAverageData?.insight;
    return (<Fragment>
        {insight && <p className="f-regular f-16">{insight}</p>}
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

            {exponentialMoving && exponentialMoving.length > 0 && <div className="dvm-summary sma">
                <SimpleAndExponentialList data={firstEMA}/>
                <div className="divider-verticle"></div>
                <SimpleAndExponentialList data={secondEMA}/>
            </div>}
        </div>
    </Fragment>)
}

export default ExponentialMovingAverage