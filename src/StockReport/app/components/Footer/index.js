import React from 'react'
import styles from './Footer.module.scss';

const Footer = ({ page }) => {
    return (
        <div className={styles.footer}>
            <p className={styles.textSubHeading}>Copyright © Giskard Datatech Pvt Ltd</p>
            <p className={styles.textSubHeading}>Page <span>{page}</span> of 13</p>
            <p className={styles.textSubHeading}>All rights reserved</p>
        </div>
    )
}

export default Footer