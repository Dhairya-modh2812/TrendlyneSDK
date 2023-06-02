import React, { Fragment } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import HighchartsMore from "highcharts/highcharts-more";
import { dateFormatter, formatNumber, percentageRender } from "../../../utils/commonFunctions";
import { areaLineEstimateChartCard } from "./chartOptionCalCopy2";

HighchartsMore(Highcharts);

function SharePriceChart(props) {

    let chart = areaLineEstimateChartCard({jsonData: props.ANNUAL});
    const {surprisesLabelObj, estimatedLabelObj, mergedChartOptions} = chart;

    return (
        <Fragment>
            <HighchartsReact
                options={mergedChartOptions}
                highcharts={Highcharts}
                constructorType={"chart"}
            />
        </Fragment>
    );
}

export default SharePriceChart;
