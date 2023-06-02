import React from "react";
import RHP from "../../../_assets/images/IPO/RHP.svg";
import { Link } from "react-router-dom";
import { slugify } from "../../../_helpers/Functional";
import { currencyFormatter } from "../../../CommonComponent/currencyFormatter";

import { shortnumFormatter, numberWithComaSeperate } from "../../../_helpers/CommonFunctions";

export function SecondaryData(props) {

    const { data } = props;


    const issuePriceValues = (min, max, issuePrice) => {
        // display price range min and max values, if both are present else display issue price value
        if ((min && max) && !(min == max) ){
            return <><span className="ipo-secondary-value">{'₹' + min} - {'₹' + max}&nbsp;</span><span className="text-color font_small ipo-secondary-text">Price Range</span></>;
        }else if(issuePrice){
            return <><span className="ipo-secondary-value">{'₹' + issuePrice}&nbsp;</span><span className="text-color font_small ipo-secondary-text">Issue Price</span></>
        }else if((min && max) && (min == max) ) {
            return <><span className="ipo-secondary-value">{'₹' + max}&nbsp;</span><span className="text-color font_small ipo-secondary-text">Issue Price</span></>
        }else {
              return <><span className="ipo-secondary-value">-&nbsp;</span><span className="text-color font_small ipo-secondary-text">Issue Price</span></>;
       }
    }
    const issueSizeValues = (min, max, issueSize) => {
        // display issue size min and max values, if both are present else display issue size value
        if ((min && max) && !(min == max) ){
            return <>{min && '₹' + shortnumFormatter(min)} - {max && '₹' + shortnumFormatter(max)}</>;            
        }else if(issueSize) {
            return <>{'₹' + shortnumFormatter(issueSize)}</>
        }else if((min && max) && (min == max) ) {
            return <>{'₹' + shortnumFormatter(max)}</>
        }else{
            return <>-</>;
        }
    }
    const IpoDoc = (rhp, drhp) => {
        if ((rhp == null || rhp == '') && (drhp == null || drhp == '')) {
            return <>-</>;
        }
        else if (rhp !== null && rhp != "") {
            return <>{<img
                className="data_icon"
                src={RHP}
                alt="RHP"
            />} {<a className="doc_link" target="_blank" href={rhp}>RHP DOC
            </a>} </>;
        }
        else {
            return <>{<img
                className="data_icon"
                src={RHP}
                alt="RHP"
            />} {<a className="doc_link" target="_blank" href={drhp}>DRHP DOC
            </a>}</>
        }
    }


    return (
        <>
            <div className="IPO_Secondary_data">
                <div className="container">
                    <ul className="row m-b-0">
                        <li className="col">
                            <span className="ipo-secondary-value">{data && data.min_investment ? currencyFormatter(data?.min_investment, '₹', true, false) : "-"}&nbsp;</span>
                            <span className="text-color font_small ipo-secondary-text">Minimum Investment</span>
                        </li>
                        <li className="col">
                            <span className="ipo-secondary-value">{data && data.lot_size == null ? '-' : data?.lot_size}&nbsp;</span>
                            <span className="text-color font_small ipo-secondary-text">Lot Size</span>
                        </li>
                        <li className="col">
                            <span className="ipo-secondary-value">{data && data.no_of_shares ? shortnumFormatter(data?.no_of_shares) : "-"}&nbsp;</span>
                            <span className="text-color font_small ipo-secondary-text">Number of Shares</span>
                        </li>
                        <li className="col">
                            {issuePriceValues(data?.price_range_min, data?.price_range_max, data?.issue_price)}
                        </li>
                        <li className="col">
                            <span className="ipo-secondary-value">
                                {data && data.post_issue_promoter_holding_percent ?
                                    `${currencyFormatter(data?.post_issue_promoter_holding_percent, '', true, false)} %` : "-"
                                }&nbsp;
                            </span>
                            <span className="text-color font_small ipo-secondary-text">Post Issue Promoter Holding %</span>
                        </li>
                        <li className="col">
                            <span className="ipo-secondary-value">
                                {data?.issue_size_min == 0 && data?.issue_size_max == 0 && data?.issue_size == null ? <>-</> :
                                    issueSizeValues(data?.issue_size_min, data?.issue_size_max, data?.issue_size) 
                                }&nbsp;
                            </span>
                            <span className="text-color font_small ipo-secondary-text">Issue Size</span>
                        </li>
                        <li className="col">
                            <span className="ipo-secondary-value">
                                {IpoDoc(data && data.ipo_rhp_document, data && data.ipo_drhp_document)}&nbsp;
                            </span>
                            <span className="text-color font_small ipo-secondary-text">IPO Document</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}


