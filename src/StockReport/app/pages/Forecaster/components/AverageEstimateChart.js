import React, { Fragment } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import HighchartsMore from "highcharts/highcharts-more";
import { dateFormatter, formatNumber, percentageRender } from "../../../utils/commonFunctions";
import { areaLineEstimateChartCard } from "./chartOptionCal";

HighchartsMore(Highcharts);

function AverageEstimateChart(props) {

    let chart = areaLineEstimateChartCard({jsonData: props.ANNUAL});
    const {surprisesLabelObj, estimatedLabelObj, mergedChartOptions} = chart;
    
    return (
        <Fragment>
            <HighchartsReact
                options={mergedChartOptions}
                highcharts={Highcharts}
                constructorType={"chart"}
            />
            <div className="surprises-estimate-labels">
                {surprisesLabelObj && surprisesLabelObj.length > 0 &&<div className="surprises" style={{flex: `${surprisesLabelObj.length}`}}> <div className="surprises-label">
                    {surprisesLabelObj.map((item, index) => {
                        return <span key={index} className={`text-${item.color}`}>
                            {percentageRender(item.value, 1)}
                        </span>
                    })}    
                </div>
                <div className="text-center">Surprises</div></div>}
                {estimatedLabelObj && estimatedLabelObj.length > 0 && <div className="estimate" style={{flex: `${estimatedLabelObj.length}`}}><div className="estimate-label">
                    {estimatedLabelObj.map((item, index) => {
                        return <span key={index} className={`text-${item.color}`}>
                            {percentageRender(item.value, 1)}
                        </span>
                    })}    
                    
                </div><div className="text-center">Estimate</div></div>}
            </div>
        </Fragment>
    );
}

export default AverageEstimateChart;
