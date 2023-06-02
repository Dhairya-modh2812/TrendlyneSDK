import React from 'react'
// import ColumnChart from './ColumnChart';
// import AreaChart from './FinancialAreaChart';
import ColumnChart from '../../../components/FinancialChart/ColumnChart';
import AreaChart from '../../../components/FinancialChart/AreaChart';
import FinancialCAGR from './FinancialCAGR';
import moment from 'moment';
import { checkNumber, getPercentage, percentageRender, numberWithCommas } from '../../../utils/commonFunctions';

function FinancialCard(props) {
    const {data: {title, paramName , number, yoy, date, cagr, insight: { longtext, color} }, chartType, data} = props;
    if(data.cagr2YrVal == null && data.cagr3YrVal == null && data.cagr5YrVal == null && data?.insight?.longtext == "" && data?.insight?.color == "") {
        return <></>
    }
    let numbers = null;
    let percentage = null;
    let datestr = null;
    if(data && data?.annualChartData?.length > 2) {
        if(data.annualChartData[0].value != 0) {
            numbers = data.annualChartData[0].value;
            percentage = getPercentage(data.annualChartData[0].value, data.annualChartData[1].value);
            datestr = moment('01' + data.annualChartData[0].yearStr).format("MMM'YY")
        }
            
    }

    return (
        <div className="col-3">
            <div className='financial-card mb-3'>
                <div className='financial-card-header'>
                    <div className='title mb-2 f-bold'>{paramName}</div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            {numbers && <span className='number f-20'>{data.unit == "%" ? `${numbers.toFixed(1)}%` : numberWithCommas(numbers)}</span>}
                            {percentage && percentage != 0 ? <span className={`badge badge-outlined badge-outlined-${percentage >= 0 ? 'positive' : 'negative'} f-semibold f-12`}>{`${percentageRender(percentage)} YoY`}</span> : ''}
                        </div>
                        {datestr && <span className='date f-14'>{datestr}</span>}
                    </div>
                </div>
                <div>
                    {data.unit !== "%" ? <ColumnChart data={data.annualChartData} ttmValue={data?.ttmVal}/> :
                    <AreaChart data={data.annualChartData}/>}
                </div>
                <div className='financial-card-bottom'>
                    <div className={`indicatorBox ${color}`}>
                        <p className='text f-14'>{longtext}</p>
                    </div>
                    <FinancialCAGR cagr={cagr} data={data}/>
                </div>
            </div>
        </div>
    )
}

export default FinancialCard