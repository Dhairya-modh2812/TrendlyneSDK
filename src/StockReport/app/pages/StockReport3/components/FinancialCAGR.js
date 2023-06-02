import React from 'react'

const convertCAGRIntoObject = (data) => {
    const {cagr2YrVal,  cagr3YrVal , cagr5YrVal} = data;
    if(cagr2YrVal == null && cagr3YrVal == null && cagr5YrVal == null) {
        return {cagr: null};
    }
    return {
        cagr : {
            "2Y": cagr2YrVal,
            "3Y": cagr3YrVal,
            "5Y": cagr5YrVal
        }
    }
}
function FinancialCAGR(props) {
    const { data } = props;
    let {cagr} = convertCAGRIntoObject(data);

    if(!cagr) {
        return <></>
    }
    let max;

    if(cagr) {
        let arr = Object.values(cagr).map(value => Math.abs(value));
        max = Math.max(...arr);
    }

    const findWidthPer = (value) => {
        return (Math.abs(value) / max) * 100;
    }

    const renderLine = (key) => {
        let widthPer = Math.abs(cagr[key]) == max ? "100%" : findWidthPer(cagr[key]).toFixed(1) + "%";
        let lineColorClass = cagr[key] >= 0 ? 'positive' : 'negative';
        
        return <div key={key} className='d-flex align-items-center'>
            <span className='text'>{key}</span>
            <div className="progress line">
                <div className={`progress-bar line ${lineColorClass}`} role="progressbar" style={{width: widthPer}} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            {/* <span className={`line ${lineColorClass}`} style={{width: widthPer}}></span> */}
            <span className='per'>{cagr[key]}%</span>
        </div>
    }

    let keysArr = Object.keys(cagr);
    return (
        <div className='cagr-box'>
            <div className='f-14 f-bold'>CAGR</div>
            <div className='cagr-content'>
                {keysArr.map(key => {
                    return renderLine(key);
                })}
            </div>
        </div>
    )
}

export default FinancialCAGR