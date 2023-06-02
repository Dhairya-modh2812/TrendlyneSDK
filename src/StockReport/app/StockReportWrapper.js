import React, {useState, useEffect} from 'react'
import Loader from './components/Loader';
const StockReport = React.lazy(() => import('./pages/StockReport/StockReport'));
const StockReport2 = React.lazy(() => import('./pages/StockReport2/StockReport2'));
const StockReport3 = React.lazy(() => import('./pages/StockReport3/StockReport3'));
// const StockReport4 = React.lazy(() => import('./pages/StockReport4/StockReport4'));
const StockReport4 = React.lazy(() => import('./pages/StockReport4/StockReport4Copy'));
const Overview = React.lazy(() => import('./pages/Overview'));
const Valuation = React.lazy(() => import('./pages/Valuation/Valuation'));
// const ValuationReport2 = React.lazy(() => import('./pages/ValuationReport2/ValuationReport2'));
const ValuationReport2 = React.lazy(() => import('./pages/ValuationReport2/ValuationReport2Copy'));
const Momentum = React.lazy(() => import('./pages/Momentum/Momentum'));
const MomentumReport2 = React.lazy(() => import('./pages/MomentumReport2/MomentumReport2'));
const Checklist = React.lazy(() => import('./pages/Checklist/Checklist'));
const Forecaster = React.lazy(() => import('./pages/Forecaster/Forecaster'));
const Shareholding = React.lazy(() => import('./pages/Shareholding/Shareholding'));

import { downloadPdf } from './utils/sejda';
import JwtService from './utils/jwtService';
import { STOCK_REPORT } from './utils/Constants/API';
import { useParams } from 'react-router-dom';


function StockReportWrapper() {
    const params = useParams();
    const {code} = params;
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        JwtService.get(`${STOCK_REPORT}${code}/`).then(res => {
            let { body } = res;
            setReportData(body);
            setLoading(false);
        }).catch(error => {
            console.log('STOCK_REPORT', error)
        });
    }, [])

    if (loading) {
        return <Loader />
    }
    return (
        <>
            <button onClick={() => downloadPdf()} className="btn btn-primary downloadPdfButton">Download Pdf</button>
            <StockReport reportData={reportData} />
            <StockReport2 reportData={reportData} />
            <StockReport3 reportData={reportData} />
            <StockReport4 reportData={reportData} />
            <Valuation reportData={reportData}/>
            {/* <ValuationReport2 reportData={reportData}/> */}
            <Momentum reportData={reportData}/>
            <MomentumReport2 reportData={reportData}/>
            <Checklist reportData={reportData}/>
            <Forecaster reportData={reportData}/>
            <Shareholding reportData={reportData}/>
            <Overview reportData={reportData}/>
        </>
    )
}

export default StockReportWrapper