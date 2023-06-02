import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BarChartComponent } from "./charts/BarChartComponent";
import { currencyFormatter } from "../../../CommonComponent/currencyFormatter";
import { shortnumFormatter } from "../../../_helpers/CommonFunctions";

export function SharesOffer(props) {

    const { data } = props

    return (
        <>
            <div className="panel_header">
                <div className="row">
                    <div className="col-md-6">
                        <div className="info_heading share-offer">
                            <h2>SHARES ON OFFER</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="total">
                <div className="flex_content flex align-items-center">
                    <div className="total_content">
                        <span className="total-value">{data && data.total_shares_offered ? shortnumFormatter(data?.total_shares_offered) : "-"}&nbsp;</span>
                        <span>Total</span>
                    </div>
                    <ul className="series_content flex align-items-center m-b-0">
                        <li className="series_block">
                            <span className="panel-insight">
                                {data && data.fresh_issue ? shortnumFormatter(data?.fresh_issue) : "0"}&nbsp;
                            </span>
                            <span className="insight-title">Fresh Issue</span>
                        </li>
                        <li className="series_block">
                            <span className="panel-insight">{data && data.offer_for_sale ? shortnumFormatter(data?.offer_for_sale) : "0"}&nbsp;</span>
                            <span className="insight-title">Offer for Sale</span>
                        </li>
                        <li className="series_block">
                            <span className="panel-insight">
                                {data && data.post_issue_promoter_holding_percent == null ? '' : `${shortnumFormatter(data?.post_issue_promoter_holding_percent)} %`}&nbsp;
                            </span>
                            <span className="insight-title">Post Issue Promoter Holding %</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
