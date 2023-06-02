import React, { Fragment } from 'react'
import BearishBullishLinear from '../../../components/Momentum/BearishBullishLinear';
import { formatNumber } from '../../../utils/commonFunctions';
import { PolygonBothArrow, PolygonDownArrow, PolygonUpArrow } from '../../../utils/Constants/commonAssets';
function MomentumOscillators(props) {

    const {momentumOscillatorsData} = props;
    
    if(!momentumOscillatorsData) {
        return <></>
    }
    const [oscillatorsList, oscillatorsObj] = momentumOscillatorsData
  
    let medianIndex = (oscillatorsList.length % 2 != 0) ? (oscillatorsList.length / 2) + 1 : (oscillatorsList.length / 2); 
    const firstColumn = oscillatorsList.slice(0, medianIndex)
    const lastColumn = oscillatorsList.slice(medianIndex, oscillatorsList.length);

    const arrowIconRender = (color) => {
        if(color == 'positive') {
        return <PolygonUpArrow />
        }else if(color == "negative") {
        return <PolygonDownArrow />
        }else if(color == 'neutral') {
        return <PolygonBothArrow />
        }
        return ''
    }

    return (<Fragment>
        <p className="f-regular f-16">{oscillatorsObj?.insight}</p>
        <div className="mt-4">
        <BearishBullishLinear 
            bearishValue={oscillatorsObj?.bearish}
            bullishValue={oscillatorsObj?.bullish}
            neutralValue={0}
            bad={0}
            mediumLow={35}
            mediumHigh={60}
            high={100}
        />

        <div className="f-14 p-4">
            <p className="f-bold text-center">Bullish v/s Bearish Oscillators</p>
            <p className="f-regular text-center">(if an oscillator is in its negative range, it is considered bearish)</p>
        </div>
        {oscillatorsList && oscillatorsList.length > 0 && <div className="dvm-summary">
            <div className=" sma">
            <ul className="sma-list">
                {firstColumn && firstColumn?.map((column, index) => {
                return <li key={index} className="list-item">
                <span className="label f-14">{column?.name}</span>
                <span className={`value text-${column?.color}`}>{formatNumber(column?.value, 1)} {arrowIconRender(column?.color)}</span>
                </li>
                })}
            </ul>
            <div className="divider-verticle"></div>
            <ul className="sma-list">
                {lastColumn && lastColumn?.map((column, index) => {
                return <li key={index} className="list-item">
                <span className="label f-14">{column?.name}</span>
                <span className={`value text-${column?.color}`}>{formatNumber(column?.value, 1)} {arrowIconRender(column?.color)}</span>
                </li>
                })}
            </ul>
            </div>
            <div className="d-flex justify-content-center mt-2">
            <div className="label-indicator f-14 f-regular">
                <span className="p-1"><PolygonBothArrow /> Neutral</span>
                <span className="p-1"><PolygonUpArrow /> Bullish</span>
                <span className="p-1"><PolygonDownArrow /> Bearish</span>
            </div>
            </div>
        </div>}
        </div>
    </Fragment>)
}

export default MomentumOscillators