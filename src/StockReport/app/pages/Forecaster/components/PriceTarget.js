import React, { Fragment } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import HighchartsMore from "highcharts/highcharts-more";
import { dateFormatter } from "../../../utils/commonFunctions";
import { areaLineEstimateChartCard } from "./chartOptionCal";

HighchartsMore(Highcharts);

function PriceTarget(props) {

  let chart = areaLineEstimateChartCard({jsonData: props.ANNUAL});
  
  return (
    <Fragment>
      <HighchartsReact
        options={chart.mergedChartOptions}
        highcharts={Highcharts}
        constructorType={"chart"}
      />
    </Fragment>
  );
}

export default PriceTarget;
