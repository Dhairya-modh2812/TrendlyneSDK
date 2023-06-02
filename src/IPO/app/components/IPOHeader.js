import React from "react";
import ipoFailIndicator from '../../../_assets/images/IPO/ipoFailedIndicator.svg';

export function IPOHeader(props) {
    const {data} = props

    return (
        <>
            <div className="IPO_header">
                <div className="container">
                    <div className="flex_content flex align-items-center flex-wrap gap-2">
                        {
                          data && data.company_logo  == null ? '' :
                          <div className="img_block">
                          <img
                          src={data?.company_logo}
                          alt="company"                            
                          /> 
                      </div>

                        }                   
                        <h1 className="ipo-stock-name"><a href={data?.stock_page_url} className="stock-name">{data?.company_name} IPO Analysis</a></h1>
                        {
                            data?.recentlyListed ? (
                                <a href={data?.stock_page_url} className="text-decoration-underline">See details</a>
                            ) : null
                        }
                        {
                            data?.ipo_failure_message ? (
                                <img
                                    src={ipoFailIndicator}
                                    alt={data.ipo_failure_message}
                                    title={data.ipo_failure_message}
                                    className="ipo_failure_img"
                                />
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
