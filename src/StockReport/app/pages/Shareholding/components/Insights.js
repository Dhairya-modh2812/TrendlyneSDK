import React from 'react'

function Insights(props) {
    const { insights } = props;
    return (
        <div className='card'>
            <div className='card-body p-2'>
                <ul className='insights'>
                    {insights && insights.map((item, index) => {
                        return <li key={item.longtext} className={`text-${item.color}`}>{item.longtext}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Insights