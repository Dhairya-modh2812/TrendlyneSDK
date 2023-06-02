import React, {useEffect, useState} from "react";
import alpha_alerts_main from "../../../_assets/images/alpha_alerts/main.png";
import down_arrow from "../../../_assets/images/alpha_alerts/down_arrow.svg";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import * as alpha_alerts from "../../../_redux/alpha_alerts/actions";
import Select from 'react-select'
import {handleToaster} from "../../../_helpers";
import {Loader} from "../components/Loader";
import {ActionLoader} from "../components/ActionLoader";

export function ManageAlphaAlert({category_screeners, active_watchlist_alert, watch_lists}) {
    let history = useHistory();
    const dispatch = useDispatch();

    const [selectedTab, setSelectedTab] = useState('price');
    const [selectedOption, setSelectedOption] = React.useState(null);
    const [selectedWatchList, setSelectedWatchList] = useState(null);
    const [selectedPK, setSelectedPK] = useState(null);
    const [selectedAlerts, setSelectedAlerts] = useState([]);
    const [temp, setTemp] = useState(false);

    let selected_count = 0;
    useEffect(() => {
        if (selectedWatchList) {
            setSelectedAlerts(active_watchlist_alert[selectedWatchList]);
            selected_count = selectedAlerts && selectedAlerts.length;
        }
    }, [selectedWatchList]);

    useEffect(() => {
        if (!temp && watch_lists && watch_lists.length > 0) {
            let first_watchlist = watch_lists.filter((option, index) => index === 0);
            if (first_watchlist) {
                setSelectedOption({value: first_watchlist[0].value, label: first_watchlist[0].label})
                setSelectedWatchList(first_watchlist[0].value);
            }
        }
    }, [watch_lists, temp]);

    const manageAlphaAlert = (screen_pk, is_delete) => {
        setSelectedPK(screen_pk);
        if (is_delete) {
            dispatch(alpha_alerts.deleteAlphaAlert(screen_pk, selectedWatchList))
                .then(response => {
                    handleToaster('Selected alert has been deleted.');
                    let selected_alerts = [...selectedAlerts];
                    selected_alerts.splice(selected_alerts.indexOf(screen_pk), 1)
                    setSelectedAlerts(selected_alerts);
                });
        } else {
            dispatch(alpha_alerts.addAlphaAlert(screen_pk, selectedWatchList))
                .then(response => {
                    handleToaster('Selected alert has been added.');
                    setSelectedAlerts(prevState => [...prevState, screen_pk]);
                });
        }
    }

    const expandCategoryScreen = (value) => {
        value = value === selectedTab ? null : value;
        setSelectedTab(value)
    }

    const handleWatchListChange = (event) => {
        setTemp(true);
        setSelectedOption(event);
        setSelectedWatchList(event.value);
        dispatch(alpha_alerts.getAlphaAlertConfigurations())
            .then(response => {
                //
            });
    }

    const showListLoading = useSelector(state => state.common.listLoading);
    const showActionsLoading = useSelector(state => state.common.actionsLoading);

    return (<>
            {showListLoading && <Loader/>}
            <div className="d-flex justify-content-center flex-column manage_alerts">
                <div className="text-center pb-0 pt-0">
                    {selected_count > 0
                        ? <>
                            <img src={alpha_alerts_main} alt="alpha alerts"/>
                            <p className="fw-bold font-size-16 mt-4">
                                MANAGE ALPHA ALERTS
                                {selected_count > 0 ? <span> ( {selected_count} ) </span> : <></>}
                            </p>
                            <span className="font-size-14">
                                Set real time alerts on all portfolio and watchlist stocks with a single click
                            </span>
                        </>
                        :
                        <>
                            <img src={alpha_alerts_main} alt="alpha alerts"/>
                            <p className="fw-bold font-size-16 mt-4">
                                CREATE ALERTS
                            </p>
                            <span className="font-size-14">
                                Be the first to know the changes in the stock price as and
                                when it happens so you can beat the curve.
                            </span>
                        </>
                    }
                </div>

                <div className="clearfix">&nbsp;</div>

                <div style={{margin: "00px"}}>
                    <Select options={watch_lists}
                            placeholder="Please select a watchlist"
                            value={selectedOption}
                            onChange={(event) => handleWatchListChange(event)}
                    />
                </div>

                {(() => {
                    if (category_screeners && category_screeners.length > 0) {
                        return category_screeners.map((category_screen, index) => (
                            <div key={index}>
                                <hr/>
                                <div style={{padding: "10px 0px"}} className="cursor-pointer">
                                    <div onClick={() => expandCategoryScreen(category_screen.module_slug)}>
                                        <div className="d-flex justify-content-between mb-2">
                                            <div className={"d-flex align-items-center"}>
                                                <img src={category_screen.mapp_imgsrc} alt=""/>
                                                <span className="fw-bold font-size-16 ml-10">
                                                    {category_screen.module_heading}
                                                </span>
                                            </div>
                                            <span className="d-flex justify-content-end">
                                                <span id={category_screen.module_slug}
                                                      className="mx-3 fw-bold font-size-16"/>
                                                <img className="down_arrow" src={down_arrow} alt=""/>
                                            </span>
                                        </div>
                                        <span className="text-muted font-size-14">{category_screen.description}</span>
                                    </div>
                                    {(() => {
                                        if (category_screen.level1_objs.length > 0) {
                                            let level_0_count = 0;
                                            return category_screen.level1_objs.map((particular, particular_index) => (
                                                <div
                                                    key={particular_index}
                                                    className={`card mt-3 ${selectedTab === category_screen.module_slug ? '' : 'd-none'} border_radius_10`}>
                                                    {(() => {
                                                        let level_1_element = document.getElementById(particular.title);
                                                        if (level_1_element) {
                                                            level_0_count += parseInt(level_1_element.innerHTML)
                                                        }
                                                        let level_0_element = document.getElementById(category_screen.module_slug);
                                                        if (level_0_element) {
                                                            level_0_element.innerHTML = level_0_count;
                                                        }
                                                    })()}
                                                    <div
                                                        className="card-header d-flex justify-content-between align-items-center">
                                                        <span className="fw-bold">{particular.title}</span>
                                                        <span id={particular.title}
                                                              className="mx-3 fw-bold font-size-16"/>
                                                    </div>
                                                    <div className="custom_card_body">
                                                        {(() => {
                                                            if (particular.level2_objs.length > 0) {
                                                                let level_1_count = 0;
                                                                return particular.level2_objs.map((secondary, index) => (
                                                                    <div key={index}>
                                                                        {(() => {
                                                                            if (secondary.length > 0) {
                                                                                return secondary.map((temp, temp_index) => (
                                                                                    <button
                                                                                        id={temp.pk}
                                                                                        key={temp_index}
                                                                                        className={`individual_rounded_button btn m-1 font-size-14 ${selectedAlerts && selectedAlerts.indexOf(temp.pk) > -1 ? 'active' : ''}`}
                                                                                        onClick={() => {
                                                                                            manageAlphaAlert(temp.pk, selectedAlerts && selectedAlerts.indexOf(temp.pk) > -1)
                                                                                        }}
                                                                                    >
                                                                                        {(() => {
                                                                                            if (selectedAlerts && selectedAlerts.indexOf(temp.pk) > -1) {
                                                                                                level_1_count++;
                                                                                            }
                                                                                            let level_1_element = document.getElementById(particular.title);
                                                                                            if (level_1_element) {
                                                                                                level_1_element.innerHTML = level_1_count;
                                                                                            }
                                                                                        })()}
                                                                                        <span>{temp.title}</span>
                                                                                        {selectedPK === temp.pk && showActionsLoading
                                                                                            ? <ActionLoader/>
                                                                                            : <></>}
                                                                                    </button>
                                                                                ))
                                                                            }
                                                                        })()}
                                                                    </div>
                                                                ))
                                                            }
                                                        })()}
                                                    </div>
                                                    <div className="card-footer">
                                                        &nbsp;
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    })()}
                                </div>
                            </div>
                        ))
                    }
                })()}

                <div className="clearfix">&nbsp;</div>
            </div>
        </>
    )
}
