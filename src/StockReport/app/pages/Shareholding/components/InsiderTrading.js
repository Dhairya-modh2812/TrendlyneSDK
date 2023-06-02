import React from 'react'
import ReactCustomTable from './CustomTable';
import moment from 'moment';
import { formatNumber, numberWithCommas } from '../../../utils/commonFunctions';

function InsiderTrading(props) {
    const {data} = props;
    let bulkBlockDealColumns = [{
        heading: " Reporting Date",
        key: 'reportDate',
        formatter: ({row}) => {
          return <div>{moment(row.reportDate).format("DD MMM'YY")}</div>
        }
       
    },{
        heading: "Client Name",
        key: 'clientName',
        columnClassName: 'clientName'
    },{
        heading: "Client Type",
        key: 'clientCategory',
        columnClassName: 'text-center'
    },{
        heading: 'Regulation',
        key: 'regulation',
        columnClassName: 'text-center'
    },{
        heading: "Action",
        key: 'action',
        columnClassName: 'text-center',
        formatter: ({row}) => {
            return <div className={`text-center text-${row.actionColor}`}>{row.action}</div>
        }
    },{
        heading: "Avg Price",
        key: 'avgPrice',
        columnClassName: 'text-right',
        formatter: ({row}) => {
            let avgPrice = formatNumber(row.avgPrice,1);
            return <>{isNaN(avgPrice) ? avgPrice  : numberWithCommas(avgPrice)}</>
        }
    }, {
        heading: 'Qty',
        key: 'qty',
        columnClassName: 'text-right',
        formatter: ({row}) => {
            return <>{numberWithCommas(row.qty)}</>
        }
    }, {
        heading: 'Mode',
        key: 'mode',
        columnClassName: 'mode'
    }]

    if(data && data.length == 0) {
        return <></>
    }
    return (
        <div className="row mt-4">
            <div className="col-12">
            <div className="section-label-box">
                <div className="cardLabel f-24 ml-n-25">Insider Trading / SAST</div>
            </div>
            </div>
            <div className="col-12">
            <div className="card">
                <div className="card-body">
                <ReactCustomTable data={data} columns={bulkBlockDealColumns}/>
                </div>
            </div>
            
            </div>
        </div>
  )
}

export default InsiderTrading