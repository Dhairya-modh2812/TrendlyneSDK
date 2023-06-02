import React, { useContext } from "react";
import { useSelector } from "react-redux";
import superstarContext from "../context/superstar/superstarContext";
import { Breadcrumb } from "react-bootstrap";

export function PortfolioHeader(props) {
  const portfolioDetail = useSelector(({ superstar_portfolio }) => {
    return superstar_portfolio.overviewDetails;
  });

  const { superstarName, baseUrl, externalView, viewType } = useContext(superstarContext);

  const brokerName = window?.TLConfig?.BROKER_NAME || "";
  const title = brokerName === "ICHBIAH" ? "Superstar Portfolio" : "Top Investors Portfolio";

  let breadcrumbHref = baseUrl;

  if (externalView && viewType == 'loader') {
    breadcrumbHref = `/${baseUrl}`;
  }

  const urlHash = window.location.hash;
  if (urlHash) {
    breadcrumbHref += urlHash;
  }

  let externalConfigs = {};
  if (externalView && window.TLSuperstar) {
    externalConfigs = window.TLSuperstar.getConfigs();
  }

  const showExtraBreadcrumb = externalConfigs?.breadcrumbUrl;

  return (
    <>
      <div className="portfolio_header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <Breadcrumb>
                  {showExtraBreadcrumb && <Breadcrumb.Item href={externalConfigs?.breadcrumbUrl}>{externalConfigs?.breadcrumbTitle}</Breadcrumb.Item>}
                  <Breadcrumb.Item href={breadcrumbHref}>{title}</Breadcrumb.Item>
                  <Breadcrumb.Item active>{ superstarName }</Breadcrumb.Item>
              </Breadcrumb>
              <h3>{superstarName}</h3>
            </div>
            <div className="col-md-4">
              <div className="right_content text-right">
                <span className="date">
                  QTR {portfolioDetail && portfolioDetail.uiQuarterString}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
