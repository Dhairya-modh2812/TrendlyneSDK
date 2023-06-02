import React, { useEffect } from "react";
import Select from "react-select";
import icon_compare_button from "../../../_assets/images/xy_comparison/icon_compare_button.svg";
import { useDispatch } from "react-redux";
import { clearSearchedStocks } from "../../../_redux/xy_comparison/slices";
import { handleToaster } from "../../../_helpers";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { slugify } from "../../../_helpers";
import { useHistory } from "react-router-dom";
import { IconVs } from "./IconVs";
import  stock_compare_bull from '../../../_assets/images/xy_comparison/stock_compare_bull.svg';

export function Footer({ handleInputChangeStock, stocks_mapping, getComparison, selectedFirst, selectedSecond }) {

    let { id } = useParams();

    const dispatch = useDispatch();

    const history = useHistory();

    const [selectedFirstOption, setSelectedFirstOption] = React.useState(null);

    const [selectedSecondOption, setSelectedSecondOption] = React.useState(null);

    const [tempFirstStock, setTempFirstStock] = React.useState(null);
    const [tempSecondStock, setTempSecondStock] = React.useState(null);

    useEffect(() => {
        if (selectedFirst) {
            setSelectedFirstOption(selectedFirst)
        }
        if (selectedSecond) {
            setSelectedSecondOption(selectedSecond)
        }
        if (selectedFirst && selectedSecond) {
            const slug = slugify(`${selectedFirst.stockCode}-vs-${selectedSecond.stockCode}/`);
            history.push(`/${selectedFirst.value}/${selectedSecond.value}/${slug}/`)
        }
    }, [selectedFirst, selectedSecond])
    const styles = (horizontalAlign) => ({
        control: (css) => ({
            ...css,
            minWidth: 115,
        }),
        menu: ({ width, ...css }) => ({
            ...css,
            width: "60vw",
            minWidth: "10%",
            [horizontalAlign]: 0
        }),
        option: ({ ...css }) => ({
            ...css,
            color: "#202020",  /* Overriding color because it is set to inherit by default */
        })
    });

    const desktopStyles = {
        option: ({ ...css }) => ({
            ...css,
            color: "#202020",  /* Overriding color because it is set to inherit by default */
            cursor: 'pointer'
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            cursor: 'pointer'
          }),
    }

    const handleCompare = () => {
        if (selectedFirstOption && selectedSecondOption) {
            const slug = slugify(`${selectedFirstOption.stockCode}-vs-${selectedSecondOption.stockCode}/`);
            getComparison(selectedFirstOption.value, selectedSecondOption.value);
            history.push(`/${selectedFirstOption.value}/${selectedSecondOption.value}/${slug}/`)
        }
    }
    const footerStyle = {
        position: selectedFirstOption ? 'sticky' : 'fixed'
    }

    return (
        <>
            <div className="footer" style={footerStyle}>
                <div className="desktop_only">
                    <div className="d-flex justify-content-center align-items-center">
                        <>
                            <Select
                                autoFocus
                                styles={desktopStyles}
                                name="first_stock"
                                className="w-25"
                                id="first_stock_search_input"
                                options={stocks_mapping}
                                value={selectedFirstOption}
                                noOptionsMessage={() => null}
                                autosize={true}
                                isClearable={true}
                                isSearchable
                                menuPlacement="top"
                                placeholder={"Please select a stock"}
                                onInputChange={handleInputChangeStock}
                                onChange={(option, triggeredAction) => {
                                    if (triggeredAction.action === 'clear') {
                                        setSelectedFirstOption(null);
                                    }
                                    else if (option?.value === tempSecondStock) {
                                        handleToaster('You can not choose the same value for comparison.', 'danger');
                                        return false;
                                    }
                                    setSelectedFirstOption(option);
                                    setTempFirstStock(option?.value);
                                    dispatch(clearSearchedStocks());

                                }}
                                components={{
                                    DropdownIndicator: () => null,
                                    IndicatorSeparator: () => null
                                }}
                            />

                        </>
                        <div className="mx-3 d-flex align-items-center justify-content-center">
                            <img src={stock_compare_bull} className="stock-bull-svg"></img>
                        </div>
                        <Select
                            name="second_stock"
                            className="w-25"
                            styles={desktopStyles}
                            id="second_stock_search_input"
                            options={stocks_mapping}
                            defaultValue={selectedFirstOption}
                            value={selectedSecondOption}
                            noOptionsMessage={() => null}
                            autosize={true}
                            isClearable={true}
                            isSearchable={true}
                            menuPlacement="top"
                            placeholder={"Please select a stock"}
                            onInputChange={handleInputChangeStock}
                            onChange={(option, triggeredAction) => {
                                if (triggeredAction.action === 'clear') {
                                    setSelectedSecondOption(null);
                                }

                                else if (option.value === tempFirstStock) {
                                    handleToaster('You can not choose the same value for comparison.', 'danger');
                                    return false;
                                }
                                setSelectedSecondOption(option);
                                setTempSecondStock(option.value);
                                dispatch(clearSearchedStocks());
                            }}
                            components={{
                                DropdownIndicator: () => null,
                                IndicatorSeparator: () => null
                            }}
                        />
                        <button
                            className="btn btn-primary compare_stock_button d-flex align-items-center"
                            onClick={() => {
                                handleCompare()
                            }}>
                            <span>COMPARE STOCKS</span>
                            <img src={icon_compare_button} alt="icon_compare_button" />
                        </button>
                    </div>
                </div>

                <div className="mobile_only">
                    <div className="d-flex justify-content-around align-items-center">
                        <Select
                            autoFocus
                            classNamePrefix="react-select-mobile"
                            styles={styles("left")}
                            name="first_stock"
                            id="first_stock_search_input"
                            options={stocks_mapping}
                            isClearable={true}
                            value={selectedFirstOption}
                            noOptionsMessage={() => null}
                            autosize={true}
                            isSearchable={true}
                            menuPlacement="top"
                            onInputChange={handleInputChangeStock}
                            onChange={(option, triggeredAction) => {
                                if (triggeredAction.action === 'clear') {
                                    setSelectedFirstOption(null);
                                }
                                else if (option?.value === tempSecondStock) {
                                    handleToaster('You can not choose the same value for comparison.', 'danger');
                                    return false;
                                }
                                setSelectedFirstOption(option);
                                setTempFirstStock(option?.value);
                                dispatch(clearSearchedStocks());
                            }}
                            components={{IndicatorsContainer: () => null}}
                        />
                        <div className="mx-2 d-flex align-items-center justify-content-center">
                            <img src={stock_compare_bull} className="stock-bull-svg" alt="icon_bull" />
                        </div>
                        <Select
                            styles={styles("right")}
                            classNamePrefix="react-select-mobile"
                            name="second_stock"
                            id="second_stock_search_input"
                            options={stocks_mapping}
                            value={selectedSecondOption}
                            noOptionsMessage={() => null}
                            autosize={true}
                            isClearable={true}
                            isSearchable={true}
                            menuPlacement="top"
                            onInputChange={handleInputChangeStock}
                            onChange={(option, triggeredAction) => {
                                if (triggeredAction.action === 'clear') {
                                    setSelectedSecondOption(null);
                                }

                                else if (option.value === tempFirstStock) {
                                    handleToaster('You can not choose the same value for comparison.', 'danger');
                                    return false;
                                }
                                setSelectedSecondOption(option);
                                setTempSecondStock(option.value);
                                dispatch(clearSearchedStocks());
                            }}
                            components={{IndicatorsContainer: () => null}}
                        />

                        <button
                            className="btn btn-primary compare_stock_button d-flex align-items-center"
                            onClick={() => {
                                handleCompare()
                            }}>
                            <img src={icon_compare_button} alt="icon_compare_button" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
