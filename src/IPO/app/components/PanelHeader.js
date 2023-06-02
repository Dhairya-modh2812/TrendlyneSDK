import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BarChartComponent } from "./charts/BarChartComponent";

export function PanelHeader() {

    return (
        <>
            <div className="panel_header">
                <div className="row">
                    <div className="col-md-6">
                        <div className="info_heading">
                            <h5>Subscription rate</h5>
                        </div>                        
                    </div>
                    <div className="col-md-6">
                        <div className="right_content">
                                <span className="date">08 Feb ’22 </span>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    );
}