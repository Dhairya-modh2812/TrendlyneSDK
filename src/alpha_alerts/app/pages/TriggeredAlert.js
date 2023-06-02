import React, {useEffect, useState} from "react";
import timeline_dot from "../../../_assets/images/alpha_alerts/timeline_dot.svg";
import Select from "react-select";
import icon_expand from "../../../_assets/images/alpha_alerts/expand.svg";
import icon_collapse from "../../../_assets/images/alpha_alerts/collapse.svg";
import moment from "moment";

export function TriggeredAlert({screens, stocks, triggered_alerts, watch_lists}) {
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [selectedWatchList, setSelectedWatchList] = useState(null);

    useEffect(() => {
        if (watch_lists && watch_lists.length > 0) {
            let first_watchlist = watch_lists.filter((option, index) => index === 0);
            if (first_watchlist) {
                setSelectedOption({value: first_watchlist[0].value, label: first_watchlist[0].label})
                setSelectedWatchList(first_watchlist[0].value);
            }
        }
    }, [watch_lists]);

    let prepare_triggered_alerts = [];
    if (triggered_alerts && selectedWatchList && triggered_alerts[selectedWatchList]) {
        for (const [key, value] of Object.entries(triggered_alerts[selectedWatchList])) {
            prepare_triggered_alerts.push({date: new Date(key), key: key, value: value});
        }
    }
    prepare_triggered_alerts = prepare_triggered_alerts.sort((a, b) => b.date - a.date)

    return (<>
            <div className="container px-0 mt-4 mb-5">
                <Select
                    className="mb-3"
                    options={watch_lists}
                    placeholder="Please select a watchlist"
                    value={selectedOption}
                    onChange={(event) => {
                        setSelectedOption(event);
                        setSelectedWatchList(event.value)
                    }}
                />

                {prepare_triggered_alerts && Object.keys(prepare_triggered_alerts).length !== 0
                    ?
                    <>
                        <ul className="timeline">
                            {(() => {
                                return prepare_triggered_alerts.map((alert_triggered, index) => (
                                    <li key={index}>
                                        <img src={timeline_dot} alt="timeline" className="timeline_dot"/>
                                        <span className="text-primary fw-bold font-size-14">{moment(alert_triggered.key).format('D MMM \'YY, hh:mm A')}</span>
                                        {(() => {
                                            let prepare_screens = [];
                                            if (alert_triggered.value && Object.keys(alert_triggered.value).length !== 0) {
                                                for (const [key, value] of Object.entries(alert_triggered.value)) {
                                                    prepare_screens.push({key: key, value: value});
                                                }
                                            }

                                            return prepare_screens && prepare_screens.map((prepare_screen, t_index) => (
                                                <div className="card border_radius_10 mt-3" key={t_index}>
                                                    <div className="card-header bg-white border_radius_top_10">
                                                        <div className="card-text font-size-14 fw-bold d-flex justify-content-between align-items-center">
                                                            <span>{screens && screens[prepare_screen.key] && screens[prepare_screen.key].title}</span>
                                                            <span>{prepare_screen.value && prepare_screen.value.length}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`card-body bg_triggered ${selectedCard === index + '_' + t_index ? '' : 'd-flex text-nowrap overflow-auto'} `}>
                                                        {(() => {
                                                            return prepare_screen.value && prepare_screen.value.map((stock, s_index) => {
                                                                    return <button key={s_index}
                                                                                   className="individual_rounded_button btn font-size-14">
                                                                        {stocks && stocks[stock] && stocks[stock].fullname}
                                                                    </button>
                                                                }
                                                            )
                                                        })()}
                                                    </div>
                                                    <div className="card-footer bg-white border_radius_bottom_10">
                                                        {prepare_screen.value && prepare_screen.value.length > 2 &&
                                                        <div
                                                            className="d-flex justify-content-between align-items-center"
                                                            onClick={() => {
                                                                setSelectedCard(selectedCard === index + '_' + t_index ? null : index + '_' + t_index);
                                                            }}
                                                        >
                                                            {(() => {
                                                                if (selectedCard === index + '_' + t_index) {
                                                                    return <>
                                                                        <img src={icon_collapse} alt="Collapse"/>
                                                                        <span
                                                                            className="font-size-12 text-muted">Collapse</span>
                                                                    </>
                                                                } else {
                                                                    return <>
                                                                        <img src={icon_expand} alt="Expand"/>
                                                                        <span
                                                                            className="font-size-12 text-muted">Expand</span>
                                                                    </>
                                                                }
                                                            })()}
                                                        </div>}
                                                    </div>
                                                </div>
                                            ))
                                        })()}
                                    </li>
                                ))
                            })()}

                            &nbsp;&nbsp;
                        </ul>
                    </>
                    : <p className="d-flex justify-content-center">No Record Found</p>
                }
            </div>
        </>
    )
}
