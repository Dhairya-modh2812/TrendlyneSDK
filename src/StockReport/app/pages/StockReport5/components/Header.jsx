import React from 'react';
import { currencyFormatter } from '../../../utils/commonFunctions';
import * as commonAssets from '../../../utils/Constants/commonAssets';

import styles from './Header.module.scss';
const Header = (props) => {
    return ( 
        <div className={`${styles.header} header`}>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                    
                    <div className="text-white">
                        <h3 className={styles.mainHeading}>Granules India Ltd.</h3>
                        <h6 className={styles.subHeading}>Valuation Score<span className={styles.subSubHeading}> Oct ’18 - Jul ’21</span></h6>
                    </div>
                </div>
                <div className={styles.rightSide}>
                   
                    <div className={`${styles.isinNo}`}>
                        <h3>Trendlyne</h3>
                        <h3>Date: 20-MAR-2019</h3>
                    </div>
                    <img src="https://cdn-static.trendlyne.com/static/TL-logomark.png" className={styles.logo}/>
                </div>
            </div>
        </div>
    );
}
 
export default Header;