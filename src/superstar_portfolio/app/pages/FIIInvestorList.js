import React, { useState, useEffect, useContext } from "react";
import { Investors } from "../components/Investors";
import SeachedData from "../components/SeachedData";
import Pagination from "../components/TableComponent/Pagination";
import FII from "../../../_assets/images/superstar_portfolio/FII.svg";
import withSizes from 'react-sizes';
import { PageSizeSelect } from "../components/PageSizeSelect";
import superstarContext from "../context/superstar/superstarContext";

function FIIInvestorList(props) {

  let {
    currentPageSize,
    setCurrentPageSize } = useContext(superstarContext);

  const [currentPage, setCurrentPage] = useState(1);

  const { fiiInvestor, isMobile } = props;
  const [PageSize, setPageSize] = useState(currentPageSize);
  const [fiiPosts, setFiiPosts] = useState([]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let data = fiiInvestor.slice(firstPageIndex, lastPageIndex);
    setFiiPosts(data);
    setCurrentPageSize(PageSize)
  }, [fiiInvestor, currentPage, PageSize]);

  let fiiResult = fiiInvestor.map((element) => element.net_worth);
  fiiResult = fiiResult.sort((a, b) => b - a);

  return (
    <div className="FII_block section_investors">
      <div className="container">
        <div className="header">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              {/* <h5>
                <img src={FII} alt="" /> FII Investors
              </h5> */}
            </div>
            <div className="col-md-6  col-lg-8">
              <div className="right_content xs-search">
                <SeachedData
                  onPageSearch={(data) => {
                    setindIvidualPosts(data);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="individual_content">
          <div className="grid-display">
            {fiiPosts.length > 0 ? (
              fiiPosts.slice(0, PageSize).map((investor, i) => (
                <div key={i}>
                  <Investors data={investor} maxValue={fiiResult[0]} />
                </div>
              ))
            ) : (
              <div className="FilterNorecord">No records found</div>
            )}
          </div>
        </div>
        <div className="block_footer d-flex justify-content-end">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={fiiInvestor.length}
            pageSize={PageSize}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
          {fiiPosts.length > 0 && (
            <PageSizeSelect
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              isMobile={isMobile}
              pageSize={PageSize}
            >

            </PageSizeSelect>
          )}
        </div>
      </div>
    </div>
  );
}

// export default FIIInvestorList;
const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
})

export default withSizes(mapSizesToProps)(FIIInvestorList);
