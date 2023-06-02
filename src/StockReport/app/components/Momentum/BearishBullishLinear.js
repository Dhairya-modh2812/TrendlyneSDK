import React from 'react'

function BearishBullishLinear(props) {

    const {labelLeft= "BEARISH", labelCenter = "Neutral", labelRight = "BULLISH"} = props;
    let {bearishValue = 0, bullishValue = 0, neutralValue = 0} = props;
    bearishValue = +bearishValue;
    bullishValue = +bullishValue;
    neutralValue = +neutralValue;
    let total = bearishValue + bullishValue;

    if(neutralValue ){
        total += neutralValue;
    }
    let bearishP = (bearishValue / total) * 100;
    let bullishP = (bullishValue / total) * 100;
    let neutralP = 0;
    if(neutralValue) {
        neutralP = (neutralValue / total) * 100;;
    }
    
    return (
        <div className='dvm-status'>
            <div className='dvm-text text-uppercase'>
                {bearishValue && bearishValue != 0 ? <span className='bad f-bold' style={{width: `${bearishP}%`}}>{labelLeft}</span>: ''}
                {neutralValue && neutralValue != 0 ? <span className='medium f-bold' style={{width: `${neutralP}%`}}>{labelCenter}</span> : ''}
                {bullishValue && bullishValue != 0 ? <span className='good f-bold' style={{width: `${bullishP}%`}}>{labelRight}</span>: ''}
            </div>
            <div className='dvm-bar' style={{"--progress-width": `${bearishP}%`}}>
                {bearishValue && bearishValue != 0 ? <div className='bad' style={{width: `${bearishP}%`}}>
                    <div className='bar bar-danger'>{bearishValue} / {total}</div>
                </div>: ''}
                {neutralValue && neutralValue != 0 ? <div className='medium' style={{width: `${neutralP}%`}}>
                    <div className='bar bar-warning'>{neutralValue} / {total}</div>
                </div>: ""}
                {bullishValue && bullishValue != 0 ? <div className='good' style={{width: `${bullishP}%`}}>
                    <div className='bar bar-success'>{bullishValue} / {total}</div>
                </div> : ''}
            </div>
        </div>
    )
}

export default BearishBullishLinear;