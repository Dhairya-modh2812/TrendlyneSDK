import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FAQListing } from "./components/FAQListing";
import { Header } from "./components/Header";
import { OpenNow } from "./components/OpenNow";
import { RecentTable } from "./components/RecentTable";
import { Analysis } from "./components/charts/Analysis";
import { UpcomingTable } from "./components/UpcomingTable";

import { IpoListing } from "./components/IpoListing";

import * as ipo_actions from "../../_redux/ipo/actions";

import { News } from "./components/News";
import TitleBannerSDK from "../../CommonComponent/TitleBannerSDK";
import { IpoSearch } from "./components/IpoSearch";

const BannerBottomNavBtns = () => {
    return (
        <nav className="ipo_page_links">
            <a
                className="ipo_nav_links"
                href="/ipo/screener/recently-listed/"
                alt="Recently Listed IPOs"
            >
                Recently Listed IPOs
            </a>
            <a
                className="ipo_nav_links"
                href="/ipo/screener/most-successful/"
                alt="Most Successful IPOs"
            >
                Most Successful IPOs
            </a>
            <a
                className="ipo_nav_links"
                href="/ipo/screener/least-successful/"
                alt="Least Successful IPOs"
            >
                Least Successful IPOs
            </a>
        </nav>
    );
};

export function IPO() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch();
    const [ipoListDetail, setipoListDetail] = useState(null);
    const ipoDescription =
        "The IPO dashboard provides the latest info about Current IPO and Upcoming IPO's at BSE and NSE. Initial Public Offer (IPO) is a privately held company's first sale of stock to the public via a stock exchange. Companies use IPO funds for working capital, debt repayment, acquisitions, and for many other uses. The mainboard IPO's are listed on stock exchanges like NSE and BSE.";

    useEffect(() => {

        dispatch(ipo_actions.getInfoIpoList()).then((response) => {
            setipoListDetail(response);
        })
    }, []);

    useEffect(() => {
        document.title = 'IPO Dashboard: Open IPOs, Latest and Recently Listed IPOs';
        const metaDescription = document.querySelector('meta[name=description]');
        metaDescription.content = `View all new and upcoming IPOs, best performers among recent IPOs, as well as the IPO Calendar for ${new Date().getFullYear()}`;
    }, []);

    return (
        <>

            <div className="page_content IPO_listing">
                <TitleBannerSDK
                    imageUrl="https://cdn-static.trendlyne.com/static/img/page-title-v2/reports-banner-v2.png"
                    imageAlt="A person reading IPO details"
                    title="Invest in IPOs"
                    description={ipoDescription}
                    faqUrl="https://help.trendlyne.com/support/solutions/folders/84000345512"
                    faqTitle="How can you access the IPO"
                    bannerRight={<IpoSearch />}
                    descriptionBottom={<BannerBottomNavBtns />}
                />
                <main className="block_content listing">
                    <div className="container-fluid">
                        <div className="row">
                            <section className="col-md-8">
                                <OpenNow
                                    data={ipoListDetail?.upcoming_open}
                                ></OpenNow>

                            </section>
                            <section className="col-md-4">
                                <div className="section_header">
                                    <h2>Gain/Loss Analysis</h2>
                                </div>
                                <div className="loss-gain">
                                    <Analysis
                                        data={ipoListDetail?.gain_loss_analysis}
                                    ></Analysis>
                                </div>
                            </section>

                        </div>
                    </div>
                </main>
                <div className="listing-table mt-4">
                    <div className="container-fluid">
                        <IpoListing 
                        data={ipoListDetail?.listing_soon}                       
                        />
                    </div>
                </div>
                <div className="section_news">
                   <div className="container-fluid">
                        <News 
                        data={ipoListDetail?.post_analysis}
                        postpagelink={ipoListDetail?.post_page_link}
                        >                                          
                        </News>                         
                                                                                       
                    </div> 
                </div>
                <div className="recently_listed">
                    <div className="container-fluid">
                        <div className="section_header">
                            <h2>Recently Listed</h2>
                            <p className="fw-normal">Recently listed IPOs and their performance</p>
                        </div>
                        <RecentTable
                            data={ipoListDetail?.recently_listed}
                        ></RecentTable>
                    </div>
                </div>               
                { <div className="upcoming_listed">
                    <div className="container-fluid">
                        <div className="section_header">
                            <h2>Draft Issues</h2>
                        </div>                     
                        <UpcomingTable
                            data={ipoListDetail?.draft_issues}
                        ></UpcomingTable>
                    </div>
                </div> }
                <FAQListing></FAQListing>
            </div>
        </>
    )
}
