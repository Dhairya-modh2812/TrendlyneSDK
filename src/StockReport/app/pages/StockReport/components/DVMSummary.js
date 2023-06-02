import React from 'react';
import { formatNumber } from '../../../utils/commonFunctions';
import Card from './Card';
import DVMlinebar from '../../../components/DVMlinebar';
import styles from './DVMSummary.module.scss';

function DVMSummary(props) {
    const {stockData : {DVM, DVMClassificationLongText, DVMClassificationText}} = props;
    return (<>
        <div className='row mb-4'>
            <div className='col'>
                <Card title={"DVM Summary"}>
                    <div className={styles.dvmContent}>
                        <h3 className={`${styles.title} f-20`}>{DVMClassificationText}
                            <div className={`${styles.dvmSymbols}`}>
                                <div className='d-flex flex-column justify-content-center text-center'>
                                    <div className={`${styles.box} bg-${DVM?.durability?.color}`}></div>
                                    <span className={`${styles.alpha} f-12`}>D</span>
                                </div>
                                <div className='d-flex flex-column justify-content-center text-center'>
                                    <div className={`${styles.box} bg-${DVM?.valuation?.color}`}></div>
                                    <span className={`${styles.alpha} f-12`}>V</span>
                                </div>
                                <div className='d-flex flex-column justify-content-center text-center'>
                                    <div className={`${styles.box} bg-${DVM?.momentum?.color}`}></div>
                                    <span className={`${styles.alpha} f-12`}>M</span>
                                </div>
                            </div>
                        </h3>
                        <p className='f-16'>{DVMClassificationLongText}</p>
                    </div>

                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='dvm-score-card'>
                                <h3 className={`${styles.title} d-flex justify-content-between align-items-end f-20 mb-3`}>Durability Score (D) 
                                    {DVM?.durability?.st && <div className={`badge badge-outlined float-right f-14 ${`badge-outlined-${DVM?.durability?.color}`}`}> {DVM?.durability?.st}</div>}
                                </h3>
                                <DVMlinebar 
                                    value={DVM?.durability?.value}
                                    bad={0}
                                    mediumLow={35}
                                    mediumHigh={55}
                                    high={100}
                                />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='dvm-score-card'>
                                <h3 className={`${styles.title} d-flex justify-content-between align-items-end f-20 mb-3`}>Valuation Score (V)
                                    {DVM?.valuation?.st && <div className={`badge badge-outlined float-right f-14 ${`badge-outlined-${DVM?.valuation?.color}`}`}>  {DVM?.valuation?.st}</div>}
                                </h3>
                                <DVMlinebar 
                                    value={DVM?.valuation?.value}
                                    bad={0}
                                    mediumLow={30}
                                    mediumHigh={50}
                                    high={100}
                                />
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='dvm-score-card'>
                                <h3 className={`${styles.title} d-flex justify-content-between align-items-end f-20 mb-3`}>Momentum Score (M)
                                    {DVM?.momentum?.st && <div className={`badge badge-outlined float-right f-14 ${`badge-outlined-${DVM?.momentum?.color}`}`}>  {DVM?.momentum?.st}</div>}
                                </h3>
                                <DVMlinebar 
                                    value={DVM?.momentum?.value}
                                    bad={0}
                                    mediumLow={35}
                                    mediumHigh={60}
                                    high={100}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
        
        </>
    )
}

export default DVMSummary