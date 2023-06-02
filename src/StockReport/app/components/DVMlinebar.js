import React from 'react'
import { formatNumber } from '../utils/commonFunctions';
function DVMlinebar(props) {

    const {labelLeft= "Bad", labelCenter = "Medium", labelRight = "Good", value, bad = 0, mediumLow, mediumHigh, high = 100} = props;
    return (
        <div className='dvm-status'>
            <div className='dvm-text'>
                <span className='bad' style={{"--bad-min" : `${bad}%`, "--medium-min" : `${mediumLow}%`}}>{labelLeft}</span>
                <span className='medium' style={{"--medium-min" : `${mediumLow}%`, "--medium-max": `${mediumHigh}%`}}>{labelCenter}</span>
                <span className='good' style={{"--medium-max": `${mediumHigh}%`,"--good-max": `${high}%`}}>{labelRight}</span>
            </div>
            <div className='dvm-bar' style={{"--progress-width": `${value}%`}}>
                <div className='line'></div>
                <div data-content-min={0} className='bad' style={{"--bad-min" : `${bad}%`, "--medium-min" : `${mediumLow}%`}}>
                    <div className='bar bar-danger'></div>
                </div>
                <div className='line'></div>
                <div data-content-min={mediumLow} data-content-max={mediumHigh} className='medium' style={{"--medium-min" : `${mediumLow}%`, "--medium-max": `${mediumHigh}%`}}>
                    <div className='bar bar-warning'></div>
                </div>
                <div className='line'></div>
                <div data-content-max={high} className='good' style={{"--medium-max": `${mediumHigh}%`,"--good-max": `${high}%`}}>
                    
                    <div className='bar bar-success'></div>
                </div>
                <div className='line'></div>
                {value && <> 
                    <div className='progress-line'></div>
                    <span className='progress-line-value'>{formatNumber(value, 1)}</span>
                </>}
            </div>
        </div>
    )
}

export default DVMlinebar