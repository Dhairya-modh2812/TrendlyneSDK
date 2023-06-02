import React from "react";
import icon_day_low from "../../../../_assets/images/price_target_alerts/icon_day_low.svg";
import icon_day_high from "../../../../_assets/images/price_target_alerts/icon_day_high.svg";
import IconDeleteIcon from '../../components/svgComponent/DeleteIcon.js';
import RightCheckbox from "../../components/svgComponent/RightCheckbox";
import { handleToaster } from "../../../../_helpers";

const defaultPricePercentage = [5, 10, 15, 20];

export function MobileStockCard({
    stock,
    setPriceAlert,
    deletePriceAlert,
    manageSwitchButton,
}) {
    const setStockPriceLowInputValue = (stock) => {
        if (stock.below) {
            return stock.below?.price;
        } else {
            const calculatedPrice =
                stock.current_price - (stock.current_price * 5) / 100;
            const formattedPrice = Math.ceil(calculatedPrice * 20) / 20;
            return formattedPrice.toFixed(2);
        }
    };

    const setStockPriceHigInputValue = (stock) => {
        if (stock.above) {
            return stock.above?.price;
        } else {
            const calculatedPrice =
                stock.current_price + (stock.current_price * 5) / 100;
            const formattedPrice = Math.ceil(calculatedPrice * 20) / 20;
            return formattedPrice.toFixed(2);
        }
    };

    const setStockPriceInputPercentageValue = (
        stock,
        percentage,
        ref,
        mode
    ) => {
        let calculatedPrice = 0;
        if (mode === "decrement") {
            calculatedPrice =
                stock.current_price - (stock.current_price * percentage) / 100;
        } else {
            calculatedPrice =
                stock.current_price + (stock.current_price * percentage) / 100;
        }
        const priceFormatted = Math.ceil(calculatedPrice * 20) / 20;
        document.getElementById(stock.id + ref).value =
            priceFormatted.toFixed(2);
    };

    return (
        <>
            <div className="mobile_only">
                <div className="card p-3 border_radius_10">
                    <div className="d-flex justify-content-between align-items-start mb-4">
                        <div>
                            <h6 className="fw-bold">{stock.name}</h6>
                            <span className="text-muted">
                                Last Price: &nbsp;
                            </span>
                            <span className="fw-bold">
                                {stock.current_price}
                            </span>
                        </div>
                        <span className="del-icon cursor-pointer"
                            style={{
                                width: "30px",
                                    position: "absolute",
                                    right: "-10px",
                                    top: "-10px",
                            }}
                            onClick={() => deletePriceAlert(stock.id, stock.is_from_database)}
                        >
                            <IconDeleteIcon />
                        </span>
                    </div>

                    <div className="row">
                        <div
                            className={`w-100 ${
                                stock && stock.below && stock.below.active
                                    ? ""
                                    : "disabled"
                            }`}
                            id={stock.id + "_mobile_1"}
                        >
                            <div>
                                <span className="font-size-14 fw-bold">
                                    Price Falls Below
                                </span>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={stock.id + "_mobile_id_1"}
                                        defaultChecked={stock.below?.active}
                                        onClick={(e) => {
                                            document
                                                .getElementById(
                                                    stock.id + "_mobile_ref_1"
                                                )
                                                .focus();
                                            manageSwitchButton(
                                                stock.id,
                                                e.target.checked,
                                                "mobile",
                                                1
                                            );
                                        }}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={stock.id + "_mobile_id_1"}
                                    >
                                        {" "}
                                    </label>
                                </div>
                            </div>
                            <div className="input-group mt-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id={stock.id + "_mobile_ref_1"}
                                    max={stock?.day_low}
                                    step="0.05"
                                    defaultValue={setStockPriceLowInputValue(
                                        stock
                                    )}
                                    onClick={(e) => {
                                        document.getElementById(
                                            stock.id + "_mobile_id_1"
                                        ).checked = true;
                                        manageSwitchButton(
                                            stock.id,
                                            true,
                                            "mobile",
                                            1
                                        );
                                    }}
                                />
                                <div
                                    className="input-group-append border-start-0 d-none"
                                    id={stock.id + "_mobile_is_checked_1"}
                                >
                                    <span className="input-group-text bg-white">
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                let target_value = parseFloat(
                                                    document.getElementById(
                                                        stock.id +
                                                        "_mobile_ref_1"
                                                    ).value
                                                );
                                                if (
                                                    target_value >
                                                    stock?.current_price
                                                ) {
                                                    handleToaster(
                                                        "You can not enter a value greater than last price.",
                                                        "danger"
                                                    );
                                                    return false;
                                                }
                                                setPriceAlert({
                                                    stock_pk: stock.id,
                                                    alertType: "below",
                                                    targetPrice: target_value,
                                                    active: document.getElementById(
                                                        stock.id +
                                                        "_mobile_id_1"
                                                    ).checked,
                                                });
                                            }}
                                        >
                                            <RightCheckbox />
                                        </span>

                                    </span>
                                </div>
                            </div>
                            <div className="percentage-options mt-2 text-center d-none">
                                {defaultPricePercentage.map((per) => (
                                    <button
                                        key={per}
                                        type="button"
                                        className="btn btn-outline-primary rounded-pill me-2 py-1 shadow-none"
                                        onClick={() =>
                                            setStockPriceInputPercentageValue(
                                                stock,
                                                per,
                                                "_mobile_ref_1",
                                                "decrement"
                                            )
                                        }
                                    >
                                        <span>{'-' +per + "%"}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div
                            className={`w-100 mt-3 ${
                                stock && stock.above && stock.above.active
                                    ? ""
                                    : "disabled"
                            }`}
                            id={stock.id + "_mobile_2"}
                        >
                            <div>
                                <span className="font-size-14 fw-bold">
                                    Price Rises Above
                                </span>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={stock.id + "_mobile_id_2"}
                                        defaultChecked={stock.above?.active}
                                        onClick={(e) => {
                                            document
                                                .getElementById(
                                                    stock.id + "_mobile_ref_2"
                                                )
                                                .focus();
                                            manageSwitchButton(
                                                stock.id,
                                                e.target.checked,
                                                "mobile",
                                                2
                                            );
                                        }}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={stock.id + "_mobile_id_2"}
                                    >
                                        {" "}
                                    </label>
                                </div>
                            </div>
                            <div className="input-group mt-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id={stock.id + "_mobile_ref_2"}
                                    min={stock?.day_high}
                                    step="0.05"
                                    defaultValue={setStockPriceHigInputValue(
                                        stock
                                    )}
                                    onClick={(e) => {
                                        document.getElementById(
                                            stock.id + "_mobile_id_2"
                                        ).checked = true;
                                        manageSwitchButton(
                                            stock.id,
                                            true,
                                            "mobile",
                                            2
                                        );
                                    }}
                                />
                                <div
                                    className="input-group-append border-start-0 d-none"
                                    id={stock.id + "_mobile_is_checked_2"}
                                >
                                    <span className="input-group-text bg-white">
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => {
                                                let target_value = parseFloat(
                                                    document.getElementById(
                                                        stock.id +
                                                        "_mobile_ref_2"
                                                    ).value
                                                );
                                                if (
                                                    target_value <
                                                    stock?.current_price
                                                ) {
                                                    handleToaster(
                                                        "You can not enter a value lesser than last price.",
                                                        "danger"
                                                    );
                                                    return false;
                                                }
                                                setPriceAlert({
                                                    stock_pk: stock.id,
                                                    alertType: "above",
                                                    targetPrice: target_value,
                                                    active: document.getElementById(
                                                        stock.id +
                                                        "_mobile_id_2"
                                                    ).checked,
                                                });
                                            }}
                                        >
                                            <RightCheckbox />
                                        </span>

                                    </span>
                                </div>
                            </div>
                            <div className="percentage-options mt-2 text-center d-none">
                                {defaultPricePercentage.map((per) => (
                                    <button
                                        key={per}
                                        type="button"
                                        className="btn btn-outline-primary rounded-pill me-2 py-1 shadow-none"
                                        onClick={() =>
                                            setStockPriceInputPercentageValue(
                                                stock,
                                                per,
                                                "_mobile_ref_2",
                                                "increment"
                                            )
                                        }
                                    >
                                        <span>{per + "%"}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
