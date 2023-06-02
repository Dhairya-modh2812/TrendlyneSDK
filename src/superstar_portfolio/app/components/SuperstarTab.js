import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Overview } from "./OverviewTab/Overview";
import BulkBlockDeals from "./BulkBlockDealsTab/BulkBlockDeals";
import Insider from "./InsiderTab/Insider";

export function SuperstarTab(props) {
  const { history } = props;
  const params = useParams();
  const { page, id, name } = params;
  const tabNameToIndex = {
    0: "portfolio",
    1: "bulk-block-deals",
    2: "insider",
  };

  const indexToTabName = {
    portfolio: 0,
    "bulk-block-deals": 1,
    insider: 2,
  };

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

  useEffect(() => {
    if(page) {
      setSelectedTab(indexToTabName[page]);
    }else {
      setSelectedTab(indexToTabName.portfolio);
    }
  }, [page]);

  const handleChange = (event, newValue) => {
    history.push(`/Portfolio/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  const urlHash = window?.TLSuperstar?.urlHash;

  return (
    <>
      <div className="superstar_tab">
        <div className="container">
          <Nav variant="tabs" defaultActiveKey={`link-${page ? page : "portfolio"}`}>
            <Nav.Item>
              <Nav.Link
                to={`/superstar/${id}/${name}/${urlHash ? urlHash : ''}`}
                eventKey="link-portfolio"
                as={Link}
              >
                Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                to={`/superstar/${id}/${name}/bulk-block-deals/${urlHash ? urlHash : ''}`}
                eventKey="link-bulk-block-deals"
                as={Link}
              >
                Bulk/Block Deals
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                to={`/superstar/${id}/${name}/insider/${urlHash ? urlHash : ''}`}
                eventKey="link-insider"
                as={Link}
              >
                Insider/SAST
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <div className="tab_content">
            {" "}
            {selectedTab === 0 && <Overview />}
          </div>
          <div className="tab_content">
            {" "}
            {selectedTab === 1 && <BulkBlockDeals />}
          </div>
          <div className="tab_content">{selectedTab === 2 && <Insider />}</div>
        </div>
      </div>
    </>
  );
}
