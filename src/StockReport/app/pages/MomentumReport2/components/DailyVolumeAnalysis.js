import React, { Fragment } from 'react';
import DailyVolumeChart from './DailyVolumeChart';
import { percentageRender, getDictionaryToList } from '../../../utils/commonFunctions';

function DailyVolumeAnalysis(props) {
    const { dailyVolumeAnalysis } = props;
    
    if(!dailyVolumeAnalysis) {
        return <></>
    }
    
    const {volumes, delivery, period} = dailyVolumeAnalysis;
    
    let volumesList = getDictionaryToList(volumes);
    let deliveryList = getDictionaryToList(delivery);
    const passWeekPercent = delivery?.deliveryWeek?.percent;
    let deliverys = [];

    deliveryList?.forEach(item => {
        deliverys.push({y: item?.volume, ...item})
    })

    let tableData = [];
    period?.forEach((item, index) => {
        let obj = {label: item, value: deliveryList[index]?.percent}
        tableData.push(obj);
    })

    return (<Fragment>
        {passWeekPercent && <p className="f-regular f-16">Daily average delivery volume over the past week is {percentageRender(passWeekPercent)}</p>}
        <div className="mb-3">
            <DailyVolumeChart volumesList={volumesList} deliverys={deliverys} period={period}/>
        </div>
        {tableData && tableData.length > 0 && <div className="dvm-summary">
            <div className="row">
                <div className="col-12">
                <h6 className="f-14 f-bold mb-3">Daily Avg. Delivery Volume %</h6>
                <div className="d-flex f-regular">
                    {tableData.map((item, index) => {
                        return (<div key={item.label} className="d-flex flex-column f-14 me-5">
                        <div className="mb-2">{item.label}</div>
                        <div className="f-bold">{percentageRender(item.value)}</div>
                    </div>)
                    })}
                </div>
                </div>
            </div>
        </div>}
    </Fragment>)
}

export default DailyVolumeAnalysis