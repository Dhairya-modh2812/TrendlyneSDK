import React,{useEffect, useContext} from 'react'
import MarketBulkBlockDeals from '../components/GroupBulkBlockDealsTab/BulkBlockDeals'
import MarketInsider from '../components/GroupInsiderTab/Insider';
import superstarContext from "../context/superstar/superstarContext";
function GroupInsider() {

    const { externalView, superstarGroupInsiderTradingSastUrl } = useContext(superstarContext);

    useEffect(() => {
        if (!externalView) document.title = 'Insider Trading & Significant acquisitions';
    }, [])
    return (
        <div className="investors_header">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-12">
                        <h3> Insider Trading & Significant acquisitions</h3>
                        <div className="block_content">
                            <p>This section tracks all disclosures under SEBI (Prohibition of Insider Trading) Regulations, 2015 and disclosures under SEBI SAST (Substantial Acquisition of Shares and Takeovers) made by the relevant parties in the Indian market. These disclosures are made by corporate insiders: promoters, officers, directors, employees and large shareholders, who are buying and selling stock in their own companies.</p>
                        </div>
                    </div>
                </div>
                <MarketInsider />
            </div>
        </div>
    )
}

export default GroupInsider