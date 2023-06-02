import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IPOHeader } from "./components/IPOHeader";
import { PrimaryData } from "./components/PrimaryData";
import { SecondaryData } from "./components/SecondaryData";
import { CompanyInfo } from "./components/CompanyInfo";
import { InsightDetail } from "./components/InsightDetail"
import { FAQDetail } from "./components/FAQDetail";
import { CardOne } from "./components/CardOne";
import { IpoReport } from "./components/IpoReport";
import { CardTable } from "./components/CardTable";
import { Breadcrumbs } from "./components/Breadcrumbs";

import { StrengthRisk } from "./components/StrengthRisk";
import { LeadManagers } from "./components/LeadManagers";
import { SharesOffer } from "./components/SharesOffer";
import { SubscriptionRate } from "./components/SubscriptionRate";
import { Financials } from "./components/Financials";
import { ImportantDates } from "./components/ImportantDates";
import { PopularNews } from "./components/PopularNews";
import { ListingGains } from "./components/ListingGains";

import * as ipo_actions from "../../_redux/ipo/actions";

import { Redirect, useHistory, useParams } from "react-router-dom";
import { capitalize } from "../../_helpers/CommonFunctions";


export function IPODetail(props) {

    const { data } = props
    const history = useHistory();
  
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch();

    // const [ipodetail, setipoDetail] = useState();

    const [ipoDetail, setIpoDetail] = useState(null);
    
    const [issubscriptionrate, setissubscriptionrate] = useState('');

    let { id } = useParams();

    useEffect(() => {
      
        if (id) {
            dispatch(ipo_actions.getInfoIpo(id)).then((response) => {                             
                if(response.head.status === "0"){
                    setIpoDetail(response.body);  
                }   
                if(response.head.status === "2"){                     
                    window.location.href = "https://trendlyne.com/404/"
                    return 
                }         
            })
        }

    }, [id]);

    useEffect(() => {
        if (ipoDetail && Object.keys(ipoDetail).length !== 0) {
            document.title = `${ipoDetail?.company_headers?.company_name} IPO analysis and details`;
            const metaDescription = document.querySelector('meta[name=description]');
            metaDescription.content = `${ipoDetail?.company_headers?.company_name} IPO should you subscribe - strengths and risks. View minimum investment, lot size, issue price, listing date and gray market premium, issue size and DRHP`;

            setissubscriptionrate(ipoDetail?.subscription_rate.subscription_details.length === 0 ? false : true)
        }
        // setissubscriptionrate ( ipoDetail != null && Object.keys(ipoDetail?.subscription_header != null ? ipoDetail?.subscription_rate : {}).length === 0 ? false : true)

    }, [ipoDetail])

    return (
        <main className="page_content IPO_single_page">
            <section>
                <div className="container p-x-0">
                    <Breadcrumbs
                        data={ipoDetail?.company_headers}>
                    </Breadcrumbs>
                    <IPOHeader
                        data={ipoDetail?.company_headers}>
                    </IPOHeader>
                </div>
                <PrimaryData
                    data={ipoDetail?.company_headers}
                >
                </PrimaryData>
                <SecondaryData
                    data={ipoDetail?.company_ipo_overview}
                >
                </SecondaryData>
            </section>
            <section>
                <InsightDetail
                    data={ipoDetail?.insight}
                ></InsightDetail>
            </section>
            <section className="card_block_style_one subscription_block">
                <div className="container">
                    <div className="row">
                        {
                            ipoDetail?.company_events?.shorttext ? (
                                <div className="col-xs-12">
                                    <div className="ipo-alert-info">
                                        <div className="tl-alert-head">
                                            <div className="head-content">
                                                <i className="sprite-navbar sprite-tl-logo-sm tl-icon"></i>
                                                {ipoDetail?.company_events?.label ? capitalize(ipoDetail.company_events.label) : 'INSIGHT'}
                                            </div>
                                            <div className="head-line"></div>
                                            <div className="head-line"></div>
                                        </div>
                                        <div>
                                            <a href={ipoDetail.company_events.url} className="ipo-alert-info-text">
                                                {ipoDetail.company_events.shorttext}
                                            </a>
                                        </div>
                                        <div className="ipo-see-more">
                                            <a href={ipoDetail.company_events.url} className="see-more">SEE DETAILS</a>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }

                        {
                            issubscriptionrate &&
                            <SubscriptionRate
                            data={ipoDetail?.subscription_rate}
                            >
                            </SubscriptionRate>
                        }


                        <div className={`${issubscriptionrate ? 'col-md-6' : 'col-md-12'}`}>
                            <div className="row">
                                <div className={`${issubscriptionrate ? 'col-md-12' : 'col-md-6'} share-offer`} >
                                <div className="IPO_right_panel_one card_border">
                                    <SharesOffer
                                        data={ipoDetail?.shares_on_offer}
                                    ></SharesOffer>
                                </div>
                                </div>
                                <div className={`${issubscriptionrate ? 'col-md-12' : 'col-md-6'} share-offer`}>
                                    <div className="important_dates">
                                        <div className="IPO_right_panel_two card_border mt-0">
                                            <div className="panel_header">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="info_heading">
                                                            <h2>important dates</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ImportantDates
                                            data={ipoDetail?.important_dates}
                                            />

                                        </div>
                                    </div>
                                </div>
                                <div className={`${issubscriptionrate ? 'col-md-12' : 'col-md-6'} share-offer`}>
                                    <div className="listing_gains">
                                        <div className="IPO_right_panel_two card_border mt-0">
                                        <div className="panel_header">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="info_heading">
                                                            <h2>Listing Gains</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ListingGains
                                            data={ipoDetail?.listing_gains}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className={`col-md-6 m-t-1 share-offer`}>
                                    <Financials
                                            data={ipoDetail?.financials}
                                        >
                                        </Financials>
                                </div>
                    </div>
                </div>
            </section>
            <PopularNews
            data={ipoDetail?.post_analysis}
            postpagelink={ipoDetail?.post_page_link}
            ></PopularNews>
            <IpoReport
                data={ipoDetail?.research_reports}
            ></IpoReport>
            <CompanyInfo
                data={ipoDetail?.information}
            ></CompanyInfo>
            <LeadManagers
                data={ipoDetail?.lead_managers_and_registrars}
            ></LeadManagers>
            <StrengthRisk
                data={ipoDetail?.strengths_and_risks}
            ></StrengthRisk>
            <FAQDetail
                data={ipoDetail?.faqs}
            ></FAQDetail>
        </main>
    )
}
