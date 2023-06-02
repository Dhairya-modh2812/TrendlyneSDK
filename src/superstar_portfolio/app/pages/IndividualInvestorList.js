import React, { useState, useEffect, useContext } from "react";
import { Investors } from "../components/Investors";
import Pagination from "../components/TableComponent/Pagination";
import withSizes from 'react-sizes';
import { PageSizeSelect } from "../components/PageSizeSelect";
import { useDispatch } from "react-redux";
import superstarContext from "../context/superstar/superstarContext";

function IndividualInvestorList(props) {

  let {
    currentPageSize,
    setCurrentPageSize } = useContext(superstarContext);

  const [currentPage, setCurrentPage] = useState(1);

  const { individualInvestor, isMobile } = props;
  const [PageSize, setPageSize] = useState(currentPageSize);
  const [individualPosts, setindIvidualPosts] = useState([]);

  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let data = individualInvestor.slice(firstPageIndex, lastPageIndex);
    setindIvidualPosts(data);
    setCurrentPageSize(PageSize)
  }, [individualInvestor, currentPage, PageSize]);

  let indResult = individualInvestor.map((element) => element.net_worth);
  indResult = indResult.sort((a, b) => b - a);

  return (
    <div className="individual_block section_investors">
      <div className="container">
        {/* <div className="header">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <h5></h5>
            </div>
            <div className="col-md-6  col-lg-8">
              <div className="right_content"></div>
            </div>
          </div>
        </div> */}
        <div className="individual_content">
          <div className="grid-display">
            {individualPosts.length > 0 ? (
              individualPosts.slice(0, PageSize).map((investor, i) => (
                <div key={i}>
                  <Investors data={investor} maxValue={indResult[0]} />
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
            totalCount={individualInvestor.length}
            pageSize={PageSize}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />

          {individualPosts.length > 0 && (
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

// export default IndividualInvestorList;
const mapSizesToProps = ({ width }) => ({
  isMobile: width < 600,
})
export default withSizes(mapSizesToProps)(IndividualInvestorList);
