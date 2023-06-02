import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { ManagePriceAlert } from "./ManagePriceAlert";
import { TriggeredPriceAlert } from "./TriggeredPriceAlert";
import "toastify-js/src/toastify.css";
import * as price_target_alerts from "../../../_redux/price_target_alerts/actions";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import SessionExpired from "../components/SessionExpired";

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function PriceTargetAlertIndex(props) {
    const {
        searchStockUrl,
        getPriceAlertUrl,
        postPriceAlertUrl,
        deletePriceAlertUrl,
        stockInfo
    } = props;
    const dispatch = useDispatch();
    const [selectedHeaderAction, setSelectedHeaderAction] = useState("manage");
    const [selectedStocks, setSelectedStocks] = useState([]);
    const query = useQuery();
    const [showSessionExpired, setShowSessionExpired] = useState(false);

    const clientCode = query.get("clientcode");
    const brokerSession = query.get("brokersession");

    
    const focusInputBoxOnFirstLoad = (priceAlertInfo) => {
        const stock = priceAlertInfo[priceAlertInfo.length -1];
        document.getElementById(stock.id + "_desktop_ref_1").click();
        document.getElementById(stock.id + "_desktop_ref_2").click();
        document.getElementById(stock.id + "_mobile_ref_1").click();
        document.getElementById(stock.id + "_mobile_ref_2").click();
    }

    useEffect(() => {
        dispatch(
            price_target_alerts.getPriceAlerts({
                url: `${getPriceAlertUrl}`,
                headerConfig: {
                    clientCode,
                    brokersession: brokerSession,
                },
            })
        )
            .then((response) => {
                if (response.price_alerts) {
                    let priceAlertInfo = [];
                    response.price_alerts.map((price_alert, index) => {
                        priceAlertInfo.push({
                            id: price_alert.stockinfo.pk,
                            name: price_alert.stockinfo.name,
                            current_price: price_alert.stockinfo.currentprice,
                            day_high: price_alert.stockinfo.dayhigh,
                            day_low: price_alert.stockinfo.daylow,
                            below: price_alert.pricealert.below,
                            above: price_alert.pricealert.above,
                            is_from_database: true,
                            order: ++index,
                        });
                    });
                    const alreadyExistStockIndex = priceAlertInfo.findIndex(alertStock => alertStock.id === stockInfo.pk);
                    if(Object.keys(stockInfo).length && alreadyExistStockIndex <= -1) {
                        const data = {
                            id: stockInfo.pk,
                            name: stockInfo.name,
                            current_price: stockInfo.currentprice,
                            day_high: stockInfo.dayhigh,
                            day_low: stockInfo.daylow,
                            is_from_database: false,
                            order: priceAlertInfo.length + 1

                        }
                        priceAlertInfo = [...priceAlertInfo, data];
                        setSelectedStocks(priceAlertInfo);
                        if(Object.keys(stockInfo).length) {
                            focusInputBoxOnFirstLoad(priceAlertInfo);
                        }
                    } else {
                        priceAlertInfo.forEach((item,index) => {
                            if(index === alreadyExistStockIndex){
                                priceAlertInfo.splice(index, 1);
                                priceAlertInfo.push(item);
                            }
                          });
                          setSelectedStocks(priceAlertInfo);
                    }
                } else {
                    setShowSessionExpired(true);
                }
            })
            .catch((err) => {
                if (err.status === 403) {
                    setShowSessionExpired(true);
                }
            });

        dispatch(
            price_target_alerts.getTriggeredAlerts({
                url: props.triggeredBrokerPriceAlertUrl,
                headerConfig: {
                    clientCode,
                    brokersession: brokerSession,
                },
            })
        )
            .then((response) => {
                //
            })
            .catch((err) => {
                if (err.status === 403) {
                    setShowSessionExpired(true);
                }
            });
    }, []);

    return (
        <>
            {showSessionExpired && <SessionExpired />}
            <Header
                selectedHeaderAction={selectedHeaderAction}
                setSelectedHeaderAction={setSelectedHeaderAction}
            />

            <div className="container">
                {(() => {
                    switch (selectedHeaderAction) {
                        case "manage":
                            return (
                                <ManagePriceAlert
                                    selectedStocks={selectedStocks}
                                    setSelectedStocks={setSelectedStocks}
                                    clientCode={clientCode}
                                    searchStockUrl={searchStockUrl}
                                    postPriceAlertUrl={postPriceAlertUrl}
                                    deletePriceAlertUrl={deletePriceAlertUrl}
                                    setShowSessionExpired={
                                        setShowSessionExpired
                                    }
                                    brokerSession={brokerSession}
                                />
                            );
                        case "triggered":
                            return <TriggeredPriceAlert />;
                    }
                })()}
            </div>
        </>
    );
}
