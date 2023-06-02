import React, { useEffect, useState, useMemo, useContext } from "react";
import { InvestorsHeader } from "../components/InvestorsHeader";
import { useDispatch } from "react-redux";
import * as superstar_portfolio from "../../../_redux/superstar_portfolio/actions";
import IndividualInvestorList from "./IndividualInvestorList";
import InstitutionalInvestorList from "./InstitutionalInvestorList";
import FIIInvestorList from "./FIIInvestorList";
import { Search } from "../components/Search";
import IndividualInvestorListCopy from "./IndividualInvestorListCopy";
import Individual from "../../../_assets/images/superstar_portfolio/individual.svg";

import { Tabs, Tab } from "react-bootstrap-tabs";
import superstarContext from "../context/superstar/superstarContext";

import Pagination from "../components/TableComponent/Pagination";

export default function TopInvestors() {

  const { externalView, superstarIndexUrl, corsKey } = useContext(superstarContext);

  useEffect(() => {
    if (!externalView) document.title = "Top Investors Portfolio"
  }, [])

  const dispatch = useDispatch();
  const [individualInvestor, setIndividualInvestor] = useState([]);
  const [institutionalInvestor, setInstitutionalInvestor] = useState([]);
  const [fiiInvestor, setFiiInvestor] = useState([]);
  const [individualAllData, setIndividualAllData] = useState([]);
  const [institutionalAllData, setInstitutionalAllData] = useState([]);
  const [fiiAllData, setFIIAllData] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const [allSearchData, setAllSearchData] = useState([]);
  useEffect(() => {
    dispatch(superstar_portfolio.getInfoInversterList({ externalView, superstarIndexUrl, corsKey })).then((response) => {
      const { tableData, tableHeaders } = response;

      let individualInvestor = tableData.individualData.map((item) => {
        let obj = {};
        item.forEach((value, index) => {
          obj = {
            ...obj,
            ...(tableHeaders[index].unique_name
              ? { [tableHeaders[index].unique_name]: value }
              : { [tableHeaders[index].name.replaceAll(" ", "_")]: value }),
          };
        });
        return obj;
      });

      let institutionalInvestor = tableData.institutionalData.map((item) => {
        let obj = {};
        item.forEach((value, index) => {
          obj = {
            ...obj,
            ...(tableHeaders[index].unique_name
              ? { [tableHeaders[index].unique_name]: value }
              : { [tableHeaders[index].name.replaceAll(" ", "_")]: value }),
          };
        });
        return obj;
      });

      let fiiInvestor = tableData.fiiData.map((item) => {
        let obj = {};
        item.forEach((value, index) => {
          obj = {
            ...obj,
            ...(tableHeaders[index].unique_name
              ? { [tableHeaders[index].unique_name]: value }
              : { [tableHeaders[index].name.replaceAll(" ", "_")]: value }),
          };
        });
        return obj;
      });

      setIndividualInvestor(individualInvestor);
      setInstitutionalInvestor(institutionalInvestor);
      setFiiInvestor(fiiInvestor);
      setIndividualAllData(individualInvestor);
      setInstitutionalAllData(institutionalInvestor);
      setFIIAllData(fiiInvestor);
    });
  }, []);

  return (
    <>
      <div className="superstar_portfolio">
        <InvestorsHeader />
        <div className="container">
          <div className="header">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                {/* <h5><img src={Individual} alt="" /> Individual Investors</h5> */}
              </div>
              <div className="col-md-6  col-lg-8">
                <Search
                  onPageSearchInd={(data) => {
                    setIndividualInvestor(data);
                  }}
                  onPageSearchIns={(data) => {
                    setInstitutionalInvestor(data);
                  }}
                  onPageSearchFii={(data) => {
                    setFiiInvestor(data);
                  }}
                  onPageSearchAll={(data) => {
                    setAllSearchData(data)
                  }}
                  dataSearchInd={individualAllData}
                  dataSearchIns={institutionalAllData}
                  dataSearchFii={fiiAllData}
                  setSearchFlag={setSearchFlag}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="investors_tab">
            <div className="container">
               {!searchFlag && <Tabs>                 
                  <Tab label="Individual Investors">                  
                    <div className="tab_content">
                    <IndividualInvestorList individualInvestor={individualInvestor} />
                    </div>
                  </Tab>
                  <Tab label="Institutional Investors">
                    <div className="tab_content">
                    <InstitutionalInvestorList institutionalInvestor={institutionalInvestor}/>
                    </div>
                  </Tab>
                  <Tab label="FII Investors">
                      <div className="tab_content">
                      <FIIInvestorList fiiInvestor={fiiInvestor} />
                    </div></Tab>
                </Tabs>}                
                {searchFlag && <IndividualInvestorListCopy individualInvestor={allSearchData} />}            
            </div>
        </div>
      </div>
    </>
  );
}
