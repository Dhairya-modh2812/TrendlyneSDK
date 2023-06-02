import React from 'react'
import { percentageRender, formatNumber, dateFormatter } from '../../utils/commonFunctions';
function ScoreDistributionCard(props) {
    
    const {data} = props;

    return (
        <div className="dvm-summary">
            <div className="row">
                <div className="col-6">
                    <h6 className="f-14 f-semibold mb-3">Score Distribution <span>(% of time in each zone)</span></h6>
                    <div className="d-flex">
                        <div className="d-flex flex-column f-14 f-semibold me-3">
                            <div className=" text-success mb-2">Good</div>
                            <div>{percentageRender(data?.goodP)}</div>
                        </div>
                        <div className="d-flex flex-column f-14 f-semibold me-3">
                            <div className="text-warning mb-2">Medium</div>
                            <div>{percentageRender(data?.mediumP)}</div>
                        </div>
                        <div className="d-flex flex-column f-14 f-semibold me-3">
                            <div className="text-danger mb-2">Bad</div>
                            <div>{percentageRender(data?.badP)}</div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h6 className="f-14 f-semibold mb-3">Variability (Range)</h6>
                    <div className="d-flex">
                        <div className="d-flex flex-column f-14 f-semibold me-3">
                            <div className=" text-default mb-2">Maximum</div>
                            <div>{formatNumber(data?.maxData?.value, 1)} <span className="opacity-50">({dateFormatter(data?.maxData?.date, "DD MMM 'YY")})</span></div>
                        </div>
                        <div className="d-flex flex-column f-14 f-semibold me-3">
                            <div className="text-default mb-2">Minimum</div>
                            <div>{formatNumber(data?.minData?.value, 1)} <span className="opacity-50">({dateFormatter(data?.minData?.date, "DD MMM 'YY")})</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScoreDistributionCard