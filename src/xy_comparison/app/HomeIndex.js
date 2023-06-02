import React, { useContext, useEffect, useState } from "react";

import { Accordion } from "react-bootstrap";
import crown_queen from "../../_assets/images/xy_comparison/winner.svg";
import Arrow from "../../_assets/images/xy_comparison/accordian_arrow.svg";
import Winnerx from "../../_assets/images/xy_comparison/winnerx.svg";
import { CustomAccordion } from "./components/CustomAccordion";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as xy_comparison from "../../_redux/xy_comparison/actions";
import { Footer } from "./components/Footer";
import { IndividualAccordionDetail } from "./components/IndividualAccordionDetail";
import { StockOverview } from "./partials/StockOverview";
import { HeaderButtons } from "./partials/HeaderButtons";
import { slugify } from "../../_helpers";
import { WinnerIcon } from "./components/WinnerIcon";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom"

import "toastify-js/src/toastify.css"
import XYComparisonContext from "./context/XYComparisonContext";
import  stock_compare_bull from '../../_assets/images/xy_comparison/stock_compare_bull.svg';

export function HomeIndex(props) {
    

    const params = props.match.params;

    const [selectedFirst, setSelectedFirst] = useState(null);
    const [selectedSecond, setSelectedSecond] = useState(null);

    React.useEffect(() => {
        if (params && params.first && params.second) {
            setFirstStock(parseInt(params.first));
            setSecondStock(parseInt(params.second));
            getComparison(parseInt(params.first), parseInt(params.second));
        }
    }, []);
    
    let { id } = useParams();

    let history = useHistory();
    const dispatch = useDispatch();
    const { viewType } = useContext(XYComparisonContext);

    const [selectedTab, setSelectedTab] = useState(0);

    const [ToogleHeader, setToogleHeader] = useState({
        key: '',
        isShow: false,
    });

    const [subSelectedTab, setSubSelectedTab] = useState(0);

    const [firstStock, setFirstStock] = useState(0);
    const [secondStock, setSecondStock] = useState(0);

    const getComparison = (first_stock_id, second_stock_id) => {
        dispatch(xy_comparison.getComparison(first_stock_id, second_stock_id))
            .then(response => {
                setFirstStock(first_stock_id);
                setSecondStock(second_stock_id);
                let firstOption = response.stocks_overview?.[first_stock_id] || {};
                let secondOption = response.stocks_overview?.[second_stock_id] || {};
                setSelectedFirst({label: firstOption.name, value: parseInt(first_stock_id), stockCode: firstOption.stockCode})
                setSelectedSecond({label: secondOption.name, value: parseInt(second_stock_id), stockCode: secondOption.stockCode})
                

                const { comparison_data: { overall_results: { insight } = {} } = {} } = response || {};
                if (viewType === 'trendlyne') {
                    document.title = `${firstOption.name} vs ${secondOption.name} - which is better on financials, technicals, shareholding, share price target`;
                    
                    const metaDescription = document.querySelector('meta[name=description]');
                    metaDescription.content = `${insight} Like Sales, Sales growth, Profit, Profit growth, ROE, ROCE, Dividend yield etc.`;
                }


            });
    }

    const { headers, stocks, comparison, searched_stocks } = useSelector(
        (state) => ({
            headers: state.xy_comparison?.headers,
            stocks: state.xy_comparison?.stocks,
            comparison: state.xy_comparison?.comparison,
            searched_stocks: state.xy_comparison?.searched_stocks
        }),
    );

    let prepared_headers = [];
    if (headers) {
        for (const [key, value] of Object.entries(headers)) {
            if (value) {
                for (const [key_1, value_1] of Object.entries(value)) {
                    prepared_headers.push({ key: key_1, value: value_1 });
                }
            }
        }
    }

    let stocks_mapping = [];
    if (searched_stocks) {
        searched_stocks.map((stock) => (
            stocks_mapping.push({ value: stock.k, label: stock.label, stockCode: stock.value })
        ))
    }

    const handleInputChangeStock = (keyword) => {
        if (keyword.length >= 3) {
            dispatch(xy_comparison.searchStock(keyword))
                .then(response => {
                    //
                });
        }
    };


    const changedClass = (header) => {
        const { key, isShow } = ToogleHeader;
        if (header.key === key && isShow) {
            return 'xy_collapse'
        } else {
            return 'xy_item-content'
        }
    }

    return (<main>
        <div className="pt-container page-title-bgcolor m-b-1">
            <div className="ptc-content">
                <div className="ptc-md-content">
                    <div className="hidden-sm-down">
                        <img src={stock_compare_bull} alt="bull logo" width={60}/>
                    </div>

                    <div className="ptc-flex-grow ptc-flex-col">
                        <div className="ptc-heading-container">
                            <div className="ptc-flex-grow ptc-title">
                                <h1 className="page-title-heading mb-0">
                                    Versus {selectedFirst && '- compare ' + selectedFirst.stockCode+' and '} {selectedSecond?.stockCode}
                                </h1>
                            </div>
                            <div className="ptc-visit-faq ">
                                <a href="https://help.trendlyne.com/support/solutions/folders/84000345435" target="_blank" rel="noopener noreferrer" title="Stock Comparison FAQ" className="ptc-link">
                                    <span>Visit FAQs</span>
                                    <i className="fa fa-angle-right fa-lg" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        <div className="ptc-description">
                            <h4 className="page-title-subcontent mb-0">
                                {comparison?.overall_results.insight}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="container x_versus_y">
            <StockOverview
                comparison={comparison}
                stocks={stocks}
                firstStock={firstStock}
                secondStock={secondStock}
            />        
        </div>

        <div className="header_content">
            <HeaderButtons
                comparison={comparison}
                stocks={stocks}
                prepared_headers={prepared_headers}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setSubSelectedTab={setSubSelectedTab}
                firstStock={firstStock}
                secondStock={secondStock}
            />

            <div className="container" >
                {(() => {
                    if (prepared_headers && prepared_headers.length > 0) {

                        return prepared_headers.map((header, index) => (

                            <TabDetail
                                header={header}
                                key={header.key}
                                index={index}
                                comparison={comparison}
                                prepared_headers={prepared_headers}
                                setSelectedTab={setSelectedTab}
                                subSelectedTab={subSelectedTab}
                                setSubSelectedTab={setSubSelectedTab}
                                firstStock={firstStock}
                                secondStock={secondStock}
                                stocks={stocks}
                            ></TabDetail>                        
                        ))
                    }
                })()}
            </div>
        </div>
        <Footer
            handleInputChangeStock={handleInputChangeStock}
            stocks_mapping={stocks_mapping}
            getComparison={getComparison}
            selectedFirst = {selectedFirst}
            selectedSecond = {selectedSecond}
        />
    </main>
    )
}

const TabDetail = (props) => {
    const { header, index, comparison, prepared_headers, setSelectedTab, subSelectedTab, setSubSelectedTab, firstStock, secondStock, stocks } = props;

    const [toggle, SetToggle] = useState(true);

    return (
        <section>
            <div className={toggle ? "xy_item-content" : "xy_collapse"} id={`${header.key}`}>
                <div className="xy_header"
                    onClick={() => {
                        SetToggle(!toggle)
                    }}
                >
                    <h3 className="fw-bold text-uppercase">{header.key}</h3>
                    <div className="sub_heading">
                        <span className="d-flex align-items-baseline my-2">
                            <WinnerIcon></WinnerIcon>
                            <span className="mx-2">
                                {comparison && comparison[header.key]?.tab_results.insight}
                            </span>
                        </span>
                    </div>
                    <img className="xy_arrow" src={Arrow} alt="Arrow" />
                </div>
                <IndividualAccordionDetail
                    headers={prepared_headers}
                    sub_headers={header?.value}
                    comparison={comparison}
                    selectedTab={index}
                    setSelectedTab={setSelectedTab}
                    subSelectedTab={subSelectedTab}
                    setSubSelectedTab={setSubSelectedTab}
                    firstStock={firstStock}
                    secondStock={secondStock}
                    stocks={stocks}
                />
            </div>
        </section>
    )
}