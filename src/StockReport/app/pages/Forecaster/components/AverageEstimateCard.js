import React from 'react'
import PriceTarget from './PriceTarget';
import { isEmpty } from '../../../utils/commonFunctions';
import AverageEstimateChart from './AverageEstimateChart';
function AverageEstimateCard(props) {
    const { data } = props;

    return (<div className="card-grid-item card">
        <h6 className="title f-bold f-14">{data?.params_name}</h6>
        <div className="py-3">
            <AverageEstimateChart ANNUAL={data?.ANNUAL} QUARTER={data?.QUARTER}/>
        </div>
        {data?.INSIGHT && !isEmpty(data?.INSIGHT?.ANNUAL) && <div className="dvm-summary f-14 insights">
            {/* <ul>
                {data?.INSIGHT?.ANNUAL?.forwardInsight &&<li> <p>{data?.INSIGHT?.ANNUAL?.forwardInsight?.st}</p></li>}
                {data?.INSIGHT?.ANNUAL?.performanceInsight &&<li><p>{data?.INSIGHT?.ANNUAL?.performanceInsight?.st}</p></li>}
            </ul> */}
            {data?.INSIGHT?.ANNUAL?.forwardInsight && <div className={`indicatorBox ${data?.INSIGHT?.ANNUAL?.forwardInsight?.color?.toLowerCase()}`}>
                <p className='text f-14'>{data?.INSIGHT?.ANNUAL?.forwardInsight?.st}</p>
            </div>}

            {data?.INSIGHT?.ANNUAL?.performanceInsight && <div className={`indicatorBox ${data?.INSIGHT?.ANNUAL?.performanceInsight?.color?.toLowerCase()}`}>
                <p className='text f-14'>{data?.INSIGHT?.ANNUAL?.performanceInsight?.st}</p>
            </div>}
            
        </div>}
    </div>
    )
}

export default AverageEstimateCard