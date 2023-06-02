import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BarChartComponent } from "./charts/BarChartComponent";
import { useTable } from "react-table";
import { CardTable } from "./CardTable";


export function SubscriptionRate(props) {


    const { data } = props;


    return (
        <> {
            data && Object.keys(data?.subscription_header_data).length === 0 ? <><div className=""></div></> :

                <div className="col-md-6">

                    <div className="IPO_left_panel">
                        <div className="subscription_rate">
                            <div className='sub_rate'>
                                <div className="panel_header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="info_heading">
                                                <h2>Subscription rate</h2>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="right_content">
                                                {
                                                    data && data?.subscription_header_data?.date == null ? '-' :
                                                        <span className="date">{data?.subscription_header_data?.date}</span>

                                                }

                                            </div>
                                        </div>
                                    </div>
                                </div>                               
                                    <BarChartComponent
                                        data={data?.subscription_header_data}
                                    >
                                    </BarChartComponent>

                                    <div className="total">
                                        <div className="flex_content flex align-items-center">
                                            <div className="total_content">
                                                <span className="total-value">{data && data?.subscription_header_data?.total_subscribed == null ? '-' : `${data?.subscription_header_data?.total_subscribed} x`}&nbsp;</span>
                                                <span>Total</span>
                                            </div>
                                            <ul className="series_content flex align-items-center">
                                            { data?.subscription_header && data?.subscription_header.length ? (
                                                data?.subscription_header.map( (header, index) => (
                                                    <li className="series_block" key={index}>
                                                        <span className="text-right panel-insight">
                                                            {data?.subscription_header_data[header.accessor] ? data?.subscription_header_data[header.accessor] + 'x':"-"}&nbsp;
                                                        </span>
                                                        <span className="insight-title">{header.name}</span>
                                                    </li> )
                                                )):null
                                            }
                                            </ul>
                                        </div>
                                    </div>
                                    <CardTable
                                        data={data?.subscription_details}
                                        headers={data?.subscription_header}
                                    >
                                    </CardTable>
                               

                            </div>
                        </div>
                    </div>

                </div>
        }
        </>

    );
}
