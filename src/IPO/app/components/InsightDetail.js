import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../_assets/images/IPO/TL-logomark.png"

export function InsightDetail(props) {

    let { data } = props

    return (
        <>
            {
               data && (data?.text != null || data?.url != null) ?
                    <div className="Insight_block">
                        <div className="container">
                            <div className="info_block">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="flex_content flex align-items-center">
                                            <div className={`insight_btn ${data?.color}`}>                                           
                                            INSIGHT
                                                <img
                                                    src={logo}
                                                    alt="logo"
                                                />
                                            </div>
                                           {
                                               data.text !== null &&
                                                <span>{data?.text}</span>
                                           }
                                        </div>
                                    </div>
                                    <div className="col-md-4 right_content">

                                     {
                                         data.url !== null &&
                                            <a
                                            className="text_btn"
                                            href={data?.url}
                                        >See Details</a>
                                     }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     : ''
            }
           
        </>
    );
}