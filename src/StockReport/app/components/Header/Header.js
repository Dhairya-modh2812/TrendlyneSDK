import React from 'react';
import { changeNumberFormat, currencyFormatter, formatNumber, percentageRender } from '../../utils/commonFunctions';
import * as commonAssets from '../../utils/Constants/commonAssets';
import moment from 'moment';
import styles from './Header.module.scss';
import { convertToInternationalCurrencySystem } from '../../utils/commonFunctions';
import WeekHighLow from '../../pages/StockReport/components/WeekHighLowV2';

const Header = (props) => {
    const {stockData, showSubHeader = false} = props;
    
    const weekHighLow = stockData?.['52_Week_High_Low'];
    
    let currentPriceColor = stockData?.dayChange > 0 ? 'positive' : stockData?.dayChange < 0  ? 'negative' : '';
    let priceIndicator = stockData?.dayChange > 0 ? commonAssets.iconUpGreen : stockData?.dayChange < 0  ? commonAssets.iconDownArrow : null;

    return ( 
        <div className={`${styles.header} header`}>
            <div className="d-md-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <div className="text-white">
                        <h3 className={styles.mainHeading}>{stockData?.stockName}</h3>
                        <h6 className={styles.subHeading}>{stockData?.industryName}</h6>
                        <h6 className={styles.subHeading}>{stockData?.sectorName}</h6>
                    </div>
                </div>
                <div className='d-flex align-items-end'>
                    <div className={`${styles.isinNo}`}>
                        <h3 className='text-white'>Trendlyne Stock Report</h3>
                        <h3 className='text-white'>{moment(stockData?.updated).format('MMM DD, YYYY hh:mm A')}</h3>
                    </div>
                    <img src="https://cdn-static.trendlyne.com/static/TL-logomark.png" className={styles.logo}/>
                </div>
            </div>
            {showSubHeader && <><div className={styles.divider}></div>
            <div className="row align-items-baseline mb-3">
                <div className="col-md-8">
                    <div className='row align-items-baseline'>
                        <div className='col-7'>
                            <span className={`${styles.text} ${currentPriceColor}`}>
                                {priceIndicator && <img src={priceIndicator} className="me-2"/> }
                                {currencyFormatter(stockData?.currentPrice, 0)}
                            </span>
                            <span className="text-secondary"><span className={`${currentPriceColor}`}>({percentageRender(stockData?.dayChangeP)} )</span> {stockData?.ExchangeForPrice} | {moment(stockData?.updated).format('MMM DD, YYYY hh:mm A')}</span>
                        </div>
                        <div className='col-5'>
                            <div className='d-flex align-items-center'>
                                <span className={`${styles.textSubHeading} me-3`}>{weekHighLow?.title}</span>
                                <div style={{width: "100%"}}>
                                    <WeekHighLow stockData={stockData}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='d-flex justify-content-between'>
                        <div>
                            <span className={styles.textSubHeading}>Market Cap: </span>
                            <span className='text-white'>{convertToInternationalCurrencySystem(stockData?.marketCap * 10000000)}</span>
                        </div>
                        <div>
                            <span className={styles.textSubHeading}>Avg Daily Volume: </span>
                            <span className='text-white'>{convertToInternationalCurrencySystem(stockData?.volumeDay)}</span>
                        </div>
                    </div>
                </div>
            </div></>}
        </div>
    );
}
 
export default Header;