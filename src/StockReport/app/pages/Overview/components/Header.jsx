import React from 'react';
import { currencyFormatter } from '../../../utils/commonFunctions';
import * as commonAssets from '../../../utils/Constants/commonAssets';
import moment from 'moment';
import styles from './Header.module.scss';
const Header = (props) => {
    const {stockData} = props;
    return ( 
        <div className={`${styles.header} header`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    <div className="text-white">
                        <h3 className={styles.mainHeading}>{stockData.stockName}</h3>
                        <h6 className={styles.subHeading}>Shareholding <span className={styles.subSubHeading}> Q3FY22 (June - September quarter)</span></h6>
                    </div>
                </div>
                <div className={`${styles.isinNo}`}>
                    <div>
                        <h3>ISIN: {stockData.ISIN}</h3>
                        <h3>Date: {moment(stockData.updated).format('DD-MMM-YYYY')}</h3>
                    </div>
                    <img src="https://cdn-static.trendlyne.com/static/TL-logomark.png" className={styles.logo}/>
                </div>
            </div>
        </div>
    );
}
 
export default Header;