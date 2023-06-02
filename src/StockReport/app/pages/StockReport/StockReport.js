import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer';
import styles from './StockReport.module.scss';
import { formatNumber } from '../../utils/commonFunctions';
import DVMSummary from './components/DVMSummary';
import AnalysisRecomdation from './components/AnalysisRecomdation';
import Checklist from './components/Checklist';
import Statistics from './components/Statistics';
import Card from './components/Card';
import PriceVolumeChart from './components/PriceVolumeChart';

const StockReport = (props) => {
    const {reportData} = props;
    const {page1, stockData, financialsData} = reportData;
    
    const getTextColorClass = (value) => {
        if(value == null || value == undefined) {
            return ''
        }
        if(value < 0) {
            return 'text-danger';
        }
        if(value > 0) {
            return 'text-success'
        }
        return '';
    }
    
    return (
        <div className="container-fluid stockreport">
            <Header stockData={stockData} showSubHeader={true}/>
            <div className='content'>
                <DVMSummary stockData={stockData}/>
                <div className='row'>
                    <div className='col-md-6'>
                        <AnalysisRecomdation page1={page1}/>
                    </div>
                    <div className='col-md-6'>
                        <Checklist page1={page1}/>
                    </div>
                    <div className='col-12'>
                        <Statistics data={page1} financialsData={financialsData}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        
                        <Card title={"Price Volume Charts"}>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <p className='text-center f-20 fw-bold mb-3'>1 Year Return : <span className={getTextColorClass(stockData?.yearChangeP)}>{ stockData?.yearChangeP ? `${formatNumber(stockData?.yearChangeP, 1)}%` : '-'} </span></p>
                                    <PriceVolumeChart page1={page1} chartData={page1?.EODChartData}/>
                                </div>
                                <div className='col-md-6'>
                                    <p className='text-center f-20 fw-bold mb-3'>5 Year Return : <span className={getTextColorClass(stockData?.fiveYearChangeP)}>{ stockData?.fiveYearChangeP ?  `${formatNumber(stockData?.fiveYearChangeP, 1)}%` : '-'} </span></p>
                                    <PriceVolumeChart page1={page1} chartData={page1?.EODFiveYearsChartData}/>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div> 
            </div>
            <Footer page={1} />
        </div>
    );
}
 
export default StockReport;