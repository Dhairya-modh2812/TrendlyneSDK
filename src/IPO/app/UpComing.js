import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UpcomingList } from "./components/UpcomingList";
import * as ipo_actions from "../../_redux/ipo/actions"
import { IpoSearch } from "./components/IpoSearch";
import { FAQListing } from "./components/FAQListing";
import { Breadcrumbs } from "./components/Breadcrumbs";
import TitleDescriptionJson from "./TitleDescription.json";


export function UpComing(props) {
  const { title = "", description = "" } = TitleDescriptionJson["upcoming-ipo"];

  useEffect(() => {
    window.scrollTo(0, 0)
}, [])

  const dispatch = useDispatch();
  const [upcomingIpo, setupcomingIpo] = useState([]);
  
  const [pagenumber, setPageNumber] = useState(1)

  const [pageSize, setpageSize] = useState(25)

  const [tableData, setTAbleData] = useState([])

  const [totalCount, setTotalCount] = useState(0)


  useEffect(() => {

      dispatch(ipo_actions.getUpcoming()).then((response) => {
          setupcomingIpo(response.body);
          setTotalCount(response?.body?.length)          
      })
      updateTitleDescription({ title, description });
  }, []);

  const onChange = (pagenumber) => {
    setPageNumber(pagenumber) 
  }

  const pageSizeChange = (pageSize) => {
    setpageSize(pageSize)
  }
  
  useEffect(()=>{
    setPageNumber(1)
  },[pageSize])

  useEffect(() => {

    const firstPageIndex = (pagenumber - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    let data = upcomingIpo.slice(firstPageIndex, lastPageIndex);
    // setupcomingIpo(data);
    setTAbleData(data);
    
  }, [upcomingIpo, pagenumber, pageSize]);

  const updateTitleDescription = ({ title = "", description = "" }) => {
    document.title = title;
    const metaDescription = document.querySelector("meta[name=description]");
    metaDescription.content = description;
};

  return (
    <>
      <div className="upcoming_list">
        <div className="ipo_upcoming_list">
          <Breadcrumbs data={{ company_name: 'Upcoming IPO' }}/>
          <div className="top_header">
            <div className="ipo_head_img ptc-hidden-mobile">
              <img src="https://cdn-static.trendlyne.com/static/img/page-title-v2/reports-banner-v2.png"
                alt="A person reading IPO details."
              ></img>
            </div>
            <div className="ipo_head_description">
              <h1>Upcoming Listed IPOs</h1>
              <div className="ipo_header_content">
                <p>{description}</p>
              </div>
            </div>
            <div className="ipo_head_search">
              <div className="search_block">
                <IpoSearch />
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <UpcomingList
            data={tableData}
            onPageSizeChange={pageSizeChange}
            onChange={onChange}
            initialPageSize={pageSize}
            totalCount={totalCount}
          />
        </div>
        <FAQListing></FAQListing>
      </div>
     
    </>
  );
}

