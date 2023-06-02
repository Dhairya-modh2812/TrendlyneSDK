import React from "react";
import { IpoSearch } from "./IpoSearch";

export function Header() {
    return (
        <section className="ipo_dashboard">
            <div className="top_header">
                <div className="ipo_head_img ptc-hidden-mobile">
                    <img src="https://cdn-static.trendlyne.com/static/img/page-title-v2/reports-banner-v2.png"
                        alt="A person reading IPO details."
                    ></img>
                </div>
                <div className="ipo_head_description">
                    <div className="ipo-title-faq">
                        <h1>Invest in IPOs</h1>
                        <a href="https://help.trendlyne.com/support/solutions/folders/84000345512"
                            title="How can you access the IPO dashboard?"
                            alt="IPO FAQs"
                        >
                            Visit FAQs
                            <i class="fa fa-angle-right fa-lg" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div className="ipo_header_content">
                        <div className="normal_content">
                            <p>The IPO dashboard provides the latest info about Current IPO and Upcoming IPO's at BSE and NSE. Initial Public Offer (IPO) is a privately held company's first sale of stock to the public via a stock exchange. Companies use IPO funds for working capital, debt repayment, acquisitions, and for many other uses. The mainboard IPO's are listed on stock exchanges like NSE and BSE.</p>
                        </div>
                    </div>
                    <nav className="ipo_page_links">
                        <a className="ipo_nav_links" href="/ipo/screener/recently-listed/" alt="Recently Listed IPOs">Recently Listed IPOs</a>
                        <a className="ipo_nav_links" href="/ipo/screener/most-successful/" alt="Most Successful IPOs">Most Successful IPOs</a>
                        <a className="ipo_nav_links" href="/ipo/screener/least-successful/" alt="Least Successful IPOs">Least Successful IPOs</a>
                    </nav>
                </div>
                <div className="ipo_head_search">
                    <div className="search_block">
                        <IpoSearch/>
                    </div>
                </div>
            </div>
        </section>
    );
}