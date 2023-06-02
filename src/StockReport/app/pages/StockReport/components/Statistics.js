import React from 'react';
import Card from './Card';
import styles from './AnalysisRecomdation.module.scss';
import InfoCard from './InfoCard';
import { isEmpty } from '../../../utils/commonFunctions';

function Statistics(props) {
    const {data, financialsData} = props;
    const { insights : { financials, ratios}} = data;
    
    let valutaionMetrics  = financialsData?.annualDataDump?.valutaionMetrics;
    valutaionMetrics = valutaionMetrics ? valutaionMetrics : {}; 
    
    return (<>
        <div className='row mb-4'>
            <div className='col'>
                <Card title={"KEY STATISTICS"}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label className='f-20 f-semibold mb-2'>Ratios</label>
                            <div className={styles.insights}>
                                {ratios && !isEmpty(ratios) && Object.keys(ratios).map(key => {
                                    return <InfoCard key={key} data={ratios[key]} sparklineData={valutaionMetrics[key]}/>
                                })}
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className='f-20 f-semibold mb-2'>Financials</label>
                            <div className={styles.insights}>
                                {financials && !isEmpty(financials) && Object.keys(financials).map(key => {
                                    return <InfoCard key={key} data={financials[key]} sparklineData={valutaionMetrics[key]}/>
                                })}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        </>
    )
}

export default Statistics