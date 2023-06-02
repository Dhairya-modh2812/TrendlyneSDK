import React from "react";
import {useSelector} from "react-redux";
import moment from "moment";
import icon_above from "../../../_assets/images/price_target_alerts/icon_above.svg";
import icon_below from "../../../_assets/images/price_target_alerts/icon_below.svg";
import Swipe from "../../../CommonComponent/Swipe";

export function TriggeredPriceAlert() {
    const triggered_alerts = useSelector(state => state.price_target_alerts.triggered_alerts);
    const emptyFunc = () => {};
    const configs = window.TLPTAlert?.getConfigs() || {};
    const { buyCallback = emptyFunc, sellCallback = emptyFunc } = configs;

    return (<>
            <div className="container mt-4 mb-4 p-0 triggered-list-page">
                <h6 className="fw-bold">Recently Triggered Alerts</h6>
                {triggered_alerts && triggered_alerts.length > 0
                    ? <div className="mt-3">
                        {(() => {
                            return triggered_alerts.map((triggered_alert, index) => {
                                const stockInfo = {
                                    bseCode: triggered_alert.stockinfo.bseCode,
                                    nseCode: triggered_alert.stockinfo.nseCode,
                                    isin: triggered_alert.stockinfo.isin,
                                    pk: triggered_alert.stockinfo.pk,
                                }
                                return <Swipe
                                    leftActionHandler={() => buyCallback(stockInfo)}
                                    rightActionHandler={() => sellCallback(stockInfo)}
                                    key={index}>
                                    <div className="card mb-3 p-3">
                                        <span className="text-muted">
                                            {moment(triggered_alert.pricealert.last_triggered).format('D MMM \'YY, hh:mm A')}
                                        </span><br/>
                                        <span className="d-flex align-items-center">
                                            {(() => {
                                                if (triggered_alert.pricealert.alert_type === 'above') {
                                                    return <img src={icon_above} alt="icon_delete" width="15"/>
                                                } else {
                                                    return <img src={icon_below} alt="icon_delete" width="15"/>
                                                }
                                            })()}
                                            <span className="mx-2 text-primary triggered_stock_name">
                                                {triggered_alert.stockinfo.name}
                                            </span>
                                            <span className="mx-2">
                                                Price crossed {triggered_alert.pricealert.alert_type} your threshold of ₹ {triggered_alert.pricealert.price}.
                                            </span>
                                        </span>
                                    </div>
                                </Swipe>
                            })
                        })()}
                    </div>
                    : <p>No alert triggered recently.</p>}
            </div>
        </>
    )
}
