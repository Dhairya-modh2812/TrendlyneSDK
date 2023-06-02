import React from "react";

function KeyCard(props) {
    const {data : {title, value, color1, colorText, lt1}} = props;
    return <div className="card key-card-item">
        <div className='card-body'>
            <div className={`card-subtitle f-14`} >{title}</div>
            <p className={`value f-24 text-${color1}`}>{value} <span className={`badge badge-${color1}`}>{colorText}</span></p>
            <div className="dvm-summary f-14">{lt1}</div>
        </div>
    </div>
}

export default KeyCard;