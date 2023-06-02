import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BarChartComponent } from "./charts/BarChartComponent";

export function Calculate() {

    return (
        <>
            <div className="total">
               <div className="flex_content flex align-items-center">
                    <div className="total_content">
                        <h2>8.95x</h2>
                        <p>Total</p>
                    </div>
                    <div className="series_content flex align-items-center">
                        <div className="series_block">
                            <h6>0.39x</h6>
                            <p>Retail Individual Investor</p>
                        </div>
                        <div className="series_block">
                            <h6>1.07x</h6>
                            <p>Non - Institutional Investor</p>
                        </div>
                        <div className="series_block">
                            <h6>7.49x</h6>
                            <p>Qualified Institutional Buyers</p>
                        </div>
                    </div>
               </div>
            </div>  
        </>
    );
}