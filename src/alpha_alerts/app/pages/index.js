import React, {useEffect, useState} from "react";
import {Header} from "../components/Header";
import {ManageAlphaAlert} from "./ManageAlphaAlert";
import {TriggeredAlert} from "./TriggeredAlert";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as alpha_alerts from "../../../_redux/alpha_alerts/actions";
import "toastify-js/src/toastify.css"

export default function AlphaAlertIndex() {
    const [selectedHeaderAction, setSelectedHeaderAction] = useState('manage');

    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(alpha_alerts.getAlphaAlertConfigurations())
            .then(response => {
                //
            });

        dispatch(alpha_alerts.getTriggeredAlphaAlerts())
            .then(response => {
                //
            });
    }, []);

    const {category_screeners, active_watchlist_alert, list_of_watchlist, screens, stocks, triggered_alerts} = useSelector(
        (state) => ({
            category_screeners: state.alpha_alerts.category_screeners,
            active_watchlist_alert: state.alpha_alerts.active_watchlist_alert,
            list_of_watchlist: state.alpha_alerts.list_of_watchlist,
            screens: state.alpha_alerts.screens,
            stocks: state.alpha_alerts.stocks,
            triggered_alerts: state.alpha_alerts.triggered_alerts,
        }),
    );

    let watch_lists = [];
    if (list_of_watchlist) {
        list_of_watchlist.map((response, i) => {
            watch_lists.push({value: response.pk, label: response.list_name});
        });
    }

    return (<>
            <Header
                selectedHeaderAction={selectedHeaderAction}
                setSelectedHeaderAction={setSelectedHeaderAction}/>

            <div className="container alpha_alerts">
                {(() => {
                    switch (selectedHeaderAction) {
                        case 'manage':
                            return (
                                <ManageAlphaAlert
                                    category_screeners={category_screeners}
                                    active_watchlist_alert={active_watchlist_alert}
                                    watch_lists={watch_lists}
                                />
                            );
                        case 'triggered':
                            return (
                                <TriggeredAlert
                                    screens={screens}
                                    stocks={stocks}
                                    triggered_alerts={triggered_alerts}
                                    watch_lists={watch_lists}
                                />
                            );
                    }
                })()}
            </div>
        </>
    )
}
