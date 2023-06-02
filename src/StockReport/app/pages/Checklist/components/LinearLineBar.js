import React from 'react'

function LinearLineBar(props) {

    const {yesLabel, noLabel, neutralLabel, yes = 0, no = 0, neutral = 0, showLabel = false} = props;
    const {bearishValue, bullishValue} = props;
    let total = yes + no + neutral;

    let yesP = (yes / total) * 100;
    let noP = (no / total) * 100;
    let neutralP = (neutral / total) * 100;
    
    return (
        <div className='dvm-status momentum'>
            {showLabel && <div className='dvm-text align-item-center'>
                {yesLabel ? <span className='good f-bold'>{yes} {yesLabel}</span> : ''} 
                <span className='mx-1'>|</span>
                {neutralLabel ? <span className='medium f-bold'>{neutral}  {neutralLabel}</span> : ''}
                {noLabel ? <span className='bad f-bold'>{no} {noLabel}</span> : ''}
            </div>}
            <div className='dvm-bar'>
                
                <div className='good' style={{width: `${yesP}%`}}>
                    <div className='bar bar-success'></div>
                </div>
                <div className='medium' style={{width: `${neutralP}%`}}>
                    <div className='bar bar-warning'></div>
                </div>
                <div className='bad' style={{width: `${noP}%`}}>
                    <div className='bar bar-danger'></div>
                </div>
            </div>
        </div>
    )
}

export default LinearLineBar;