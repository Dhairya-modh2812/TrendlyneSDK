import React from "react";

export function Progress(props) {
  const { processData, maxValue } = props;

  let cal_Percentage =
    (Math.log10(processData.net_worth) / Math.log10(maxValue)) * 100;

  return (
    <>
      <div className="progress superstar">
        <div
          style={{ width: `${cal_Percentage}%` }}
          className="progress-bar"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </>
  );
}
