import React from 'react'
import Header from '../../components/Header/Header';
import {companyLogo, nauh, kallidus, panaya, infosys, edge } from '../../utils/Constants/commonAssets';
import moment from 'moment';

import styles from './index.module.scss';
import Footer from '../../components/Footer';


function Overview(props) {
    const { reportData } = props;
    const { 
            stockData, 
            BBdealsdata, 
            directorData, 
            insiderSASTdata, 
            managementData,
            companyLogo,
            aboutCompany,
            brandsOwned             
        } = reportData;

    const gridItem = [{
        image: edge,
        text: "EdgeVerve System Limited"
    }, {
        image: panaya,
        text: "EdgeVerve System Limited"
    }, {
        image: infosys,
        text: "EdgeVerve System Limited"
    }, {
        image: kallidus,
        text: "EdgeVerve System Limited"
    }, {
        image: nauh,
        text: "EdgeVerve System Limited"
    }, {
        text: "Relab Industrries"
    }, {
        text: "Recron Stretch"
    }, {
        text: "Infosys BPM"
    }, {
        text: "Retrolex"
    }, {
        text: "Reliance Gas"
    }, {
        text: "Realfix Industries"
    }, {
        text: "EcoRepel"
    }, {
        text: "Reliance Aviation"
    }, {
        text: "Relab Industrries"
    }]

    const numberIntoCurrency = (number) => {
        return Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(number);
    }
    return (
        <div className="container-fluid">
            <Header stockData={stockData} />
            <div className="content">
                <div className='card mb-4'>
                    <div className='card-body'>
                        <h6 className={styles.cardHeading}>About the Company</h6>
                        <div className={`media ${styles.media}`}>
                            {companyLogo && companyLogo != "" && <div className={styles.companyLogo}>
                                <img className='w-100' src={companyLogo} />
                            </div>}
                            <div className={`media-body ${styles.mediaBody}`}>
                                {stockData && <h5>{stockData?.stockName}</h5>}
                                <p>
                                    {aboutCompany}
                                </p>
                                <p>website: <a href="www.reliancedigital.in" target="_blank">www.reliancedigital.in</a></p>
                            </div>
                        </div>
                    </div>
                </div>
                {brandsOwned && brandsOwned.length > 0 && <div className='card mb-4'>
                    <div className='card-body'>
                        <h6 className={styles.cardHeading}>Brands owned by the company</h6>
                        <div className={`media ${styles.grid}`}>
                            {brandsOwned.map((item, index) => {
                                return <div key={index.toString()} className={styles.gridItem}>
                                    {item.brand_logo && <div className={styles.gridImage}>
                                        <img src={item.brand_logo} />
                                    </div>}
                                    <div className={`${styles.greyBox} text-center`}>
                                        <p>{item.brand_name}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                </div>}
                {(managementData.length > 0 || directorData.length > 0) && <div className='card mb-4'>
                    <div className='card-body'>
                        {managementData.length > 0 && <> 
                            <h6 className={styles.cardHeading}>Management information</h6>
                            <div className={`media ${styles.grid} ${styles.managementGrid} mb-4`}>
                                {managementData.length > 0 && managementData.splice(0, 4).map((item, index) => {
                                    return <div key={index.toString()} className={styles.gridItem}>
                                        <div className={styles.lightBlue}>
                                            <p className={styles.title}>{item.name}</p>
                                            <span className={styles.subTitle}>{item.designation}</span>
                                        </div>
                                        <div className='px-3 py-2'>
                                            <p className={styles.networth}>{numberIntoCurrency(item.salary_gross / 10000000)} Cr.</p>
                                            <span className={styles.networthText}>{item.designation}</span>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </>
                        }
                        {directorData.length > 0 && <>
                            <h6 className={styles.cardHeading}>Director Information</h6>
                            <div className={`media ${styles.grid} ${styles.managementGrid} mt-4`}>
                                {directorData.slice(0, 4).map((item, index) => {
                                    return <div key={index.toString()} className={styles.gridItem}>
                                        <div className={styles.greyBox}>
                                            <p className={styles.title}>{item.name}</p>
                                            <span className={styles.subTitle}>{item.designation}</span>
                                        </div>
                                        <div className='px-3 py-2'>
                                            <p className={styles.networth}>{numberIntoCurrency(item.salary_gross / 10000000)}Cr.</p>
                                            <span className={styles.networthText}>{item.designation}</span>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </>
                        }
                    </div>
                </div>}
            </div>
      <Footer page={13} />
        </div>
    )
}

export default Overview