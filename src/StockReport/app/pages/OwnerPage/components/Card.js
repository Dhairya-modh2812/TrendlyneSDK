import React from 'react';
import * as commonAssets from '../../../utils/Constants/commonAssets';

import styles from './Card.module.scss';

const Card = (props) => {
    let { data } = props;

    const getImage = () => {
        if(data.type == 'danger') {
            return <img src={commonAssets.downArrowDanger}/>
        }else if(data.type == 'warning') {
            return <img src={commonAssets.rightArrowWarning}/>
        }else if(data.type == 'success') {
            return <img src={commonAssets.rightArrowWarning}/>
        }
    }
    return (
        <div className={styles.card}>
            <div>
                <div className={`${styles.circle} ${styles[data.type]}`}>
                    {getImage()}
                </div>
            </div>
            <div className={styles.text}>{data.text}</div>
        </div>
    );
}
 
export default Card;