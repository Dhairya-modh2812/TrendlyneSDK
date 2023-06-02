import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { joinURL } from "../../../_helpers/CommonFunctions";
import XYComparisonContext from "../context/XYComparisonContext";

export function HeaderButtons({comparison, stocks, prepared_headers, selectedTab, setSelectedTab, setSubSelectedTab, firstStock, secondStock}) {
    const history = new  useHistory();
    const { baseUrl } = useContext(XYComparisonContext);
    const pathname = baseUrl ? joinURL([baseUrl, history.location.pathname], true) : history.location.pathname;

    return (<>
        {stocks &&
            <>
                <ul className="nav nav-tabs navbar-expand header_buttons">
                    {(() => {
                        if (prepared_headers && prepared_headers.length > 0) {
                            return prepared_headers.map((header, index) => (
                                <li key={index}
                                    className="nav-item cursor-pointer"
                                    onClick={() => {
                                        setSelectedTab(index);
                                        setSubSelectedTab(0);
                                    }}>
                                    <a href={`${pathname}#${header.key}`}
                                            className={`nav-link text-uppercase fw-bold ${selectedTab === index ? 'active' : ''}`}>
                                            {header.key}

                                        <span className="pl_count">
                                            <span className="x_round">
                                                {comparison[header.key]?.tab_results[firstStock] || 0}
                                            </span>
                                            <span className="y_round">
                                                {comparison[header.key]?.tab_results[secondStock] || 0}
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            ))
                        }
                    })()}
                </ul>
            </>
        }
    </>
    )
}
