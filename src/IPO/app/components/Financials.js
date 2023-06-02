import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BarChartComponent } from "./charts/BarChartComponent";
import { Tab } from "./Tab";

export function Financials(props) {

    const { data } = props


    if (data == null || data == '') {
        return <></>
    }

    return (
        <>

            <>
                <div className="IPO_right_panel_two card_border mt-0">
                    <div className="panel_header">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="info_heading">
                                    <h2>Financials</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel_table custom_table financial fixed_table" dangerouslySetInnerHTML={{ __html: data }}></div>
                </div>
            </>

        </>
    );
}
