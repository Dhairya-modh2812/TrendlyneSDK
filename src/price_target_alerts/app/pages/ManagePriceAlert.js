import React from "react";
import { MobileStockCard } from "./partials/MobileStockCard";
import { DesktopStockCard } from "./partials/DesktopStockCard";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import * as price_target_alerts from "../../../_redux/price_target_alerts/actions";
import { clearStocks } from "../../../_redux/price_target_alerts/slices";
import { handleToaster } from "../../../_helpers";

export function ManagePriceAlert({
    selectedStocks,
    setSelectedStocks,
    clientCode,
    searchStockUrl,
    postPriceAlertUrl,
    deletePriceAlertUrl,
    setShowSessionExpired,
    brokerSession,
}) {
    const dispatch = useDispatch();
    const stocks = useSelector((state) => state.price_target_alerts.stocks);

    let stocks_mapping = [];
    if (stocks) {
        stocks.map((stock) =>
            stocks_mapping.push({ value: stock.k, label: stock.label })
        );
    }

    const setPriceAlert = (payload) => {
        dispatch(
            price_target_alerts.setPriceAlert(
                {
                    url: postPriceAlertUrl,
                    headerConfig: {
                        clientcode: clientCode,
                        brokersession: brokerSession,
                    },
                },
                payload
            )
        )
            .then((response) => {
                if (response.message) {
                    handleToaster("Selected alert has been updated.");

                    // update the value - is from database
                    let tempSelectedStocks = [...selectedStocks];
                    let index = tempSelectedStocks.findIndex(
                        (el) => el.id === payload.stock_pk
                    );
                    tempSelectedStocks[index] = {
                        ...tempSelectedStocks[index],
                        is_from_database: true,
                    };
                    setSelectedStocks(tempSelectedStocks);
                } else {
                    setShowSessionExpired(true);
                }
            })
            .catch((err) => {
                if (err.status === 403) {
                    setShowSessionExpired(true);
                }
            });
    };

    const deletePriceAlert = (stock_pk, is_from_database = false) => {
        setSelectedStocks(
            selectedStocks &&
                selectedStocks.filter(
                    (filter_stock) => filter_stock.id !== stock_pk
                )
        );

        if (is_from_database) {
            dispatch(
                price_target_alerts.deletePriceAlert(
                    {
                        url: deletePriceAlertUrl,
                        headerConfig: {
                            clientCode,
                            brokersession: brokerSession,
                        },
                    },
                    {
                        stock_pk: stock_pk,
                    }
                )
            )
                .then((response) => {
                    handleToaster("Selected alert has been deleted.");
                })
                .catch((err) => {
                    if (err.status === 403) {
                        setShowSessionExpired(true);
                    }
                });
        }
    };

    const handleInputChangeStock = (keyword) => {
        if (keyword.length >= 3) {
            dispatch(
                price_target_alerts.searchStock(
                    {
                        url: searchStockUrl,
                        headerConfig: {},
                    },
                    keyword
                )
            ).then((response) => {});
        }
    };

    const manageSwitchButton = (stock_id, checked, device_type, number) => {
        let main_div_element = document.getElementById(
            stock_id + "_" + device_type + "_" + number
        );
        let switch_element = document.getElementById(
            stock_id + "_" + device_type + "_is_checked_" + number
        );
        let input_element = document.getElementById(
            stock_id + "_" + device_type + "_ref_" + number
        );
        const percentageContainer = main_div_element.querySelector(".percentage-options");
        if (checked) {
            switch_element.classList.remove("d-none");
            input_element.classList.add("border-end-0");
            main_div_element.classList.remove("disabled");
            percentageContainer.classList.remove("d-none");
        } else {
            switch_element.classList.add("d-none");
            input_element.classList.remove("border-end-0");
            main_div_element.classList.add("disabled");
            percentageContainer.classList.add("d-none");

            setPriceAlert({
                active: false,
                alertType: number === 1 ? "below" : "above",
                stock_pk: stock_id,
                targetPrice: input_element.valueOf().value,
            });
        }
    };

    return (
        <>
            <div className="row text-center mt-5 mb-5 alert-list-page">
                <div className="col-xl-6 offset-xl-3 col-md-6 offset-md-3 col-sm-12">
                    <h1>Manage Alerts</h1>
                    <p>Add stocks for which you want to set the price alerts</p>
                    <div className="mt-5">
                        <Select
                            name="stock_name"
                            className="text-start"
                            classNamePrefix="pta-stock-select"
                            id="stock_search_input"
                            autoFocus
                            options={stocks_mapping}
                            value={() => null}
                            noOptionsMessage={() => null}
                            autosize={true}
                            isClearable={true}
                            isSearchable={true}
                            placeholder={"Search and add Index/Stock"}
                            onInputChange={handleInputChangeStock}
                            onChange={(selectedOption) => {
                                let check_selected_existence =
                                    selectedStocks &&
                                    selectedStocks.filter(
                                        (selected) =>
                                            selected.id === selectedOption.value
                                    );
                                if (check_selected_existence.length >= 1) {
                                    const stocksExceptSelected = selectedStocks.filter(item => item.id !== selectedOption.value);
                                    setSelectedStocks([...stocksExceptSelected, ...check_selected_existence])
                                    return true;
                                }

                                if (selectedStocks.length === 100) {
                                    handleToaster(
                                        "You can not set alerts for more than 100 stocks.",
                                        "danger"
                                    );
                                    dispatch(clearStocks());
                                    return false;
                                }

                                let filtered_stock =
                                    stocks &&
                                    stocks.filter(
                                        (filter_stock) =>
                                            filter_stock.k ===
                                            selectedOption.value
                                    );
                                if (filtered_stock.length > 0) {
                                    let temp = {
                                        id: filtered_stock[0].k,
                                        name: filtered_stock[0].label,
                                        current_price:
                                            filtered_stock[0].currentPrice,
                                        day_high: filtered_stock[0].day_high,
                                        day_low: filtered_stock[0].day_low,
                                        is_from_database: false,
                                        order: selectedStocks.length + 1,
                                    };
                                    setSelectedStocks([
                                        ...selectedStocks,
                                        temp,
                                    ]);
                                }

                                dispatch(clearStocks());
                            }}
                        />
                        <p className="text-muted mt-3 font-size-14">
                            <strong>
                                {selectedStocks
                                    ? 100 - selectedStocks.length
                                    : 100}{" "}
                            </strong>
                            of 100 Target Alerts Remaining
                        </p>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-column-reverse">
                {(() => {
                    if (selectedStocks) {
                        return selectedStocks.map((stock, index) => (
                            <div key={index} className="mb-5">
                                <DesktopStockCard
                                    stock={stock}
                                    key={stock.name}
                                    setPriceAlert={setPriceAlert}
                                    deletePriceAlert={deletePriceAlert}
                                    manageSwitchButton={manageSwitchButton}
                                />

                                <MobileStockCard
                                    stock={stock}
                                    key={stock.id}
                                    setPriceAlert={setPriceAlert}
                                    deletePriceAlert={deletePriceAlert}
                                    manageSwitchButton={manageSwitchButton}
                                />
                            </div>
                        ));
                    }
                })()}
            </div>
        </>
    );
}
