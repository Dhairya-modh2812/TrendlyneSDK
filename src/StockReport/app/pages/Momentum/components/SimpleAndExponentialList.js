import React, { useState } from 'react'

function SimpleAndExponentialList(props) {
    
    const [data, setData] = useState(props.data);
    
    if(data.length == 0) {
        return <></>
    }
    return (
        <ul className="sma-list">
            {data && data?.map((column, index) => {
            return <li key={column?.sstr} className="list-item">
                <span className="label f-14">{column?.title}</span>
                <span className={`value text-${column?.color1}`}>{column?.value}</span>
                </li>
            })}
        </ul>
    )
}

export default SimpleAndExponentialList