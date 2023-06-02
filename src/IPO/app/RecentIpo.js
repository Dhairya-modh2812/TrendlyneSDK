import React, { useEffect, useState } from "react";
import { RecentAll } from "./components/RecentAll";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import { Link, useParams, useHistory } from "react-router-dom";

import { Breadcrumbs } from "./components/Breadcrumbs";
import * as ipo_actions from "../../_redux/ipo/actions"
import { IpoSearch } from "./components/IpoSearch";
import { FAQListing } from "./components/FAQListing";
import TitleDescriptionJson from "./TitleDescription.json";
import TitleBannerSDK from "../../CommonComponent/TitleBannerSDK";

export function RecentIpo() {

  const pageRef = React.useRef(null);

  const [pagenumber, setPageNumber] = useState(1)

  const [pageSize, setpageSize] = useState(25)

  const [totalCount, setTotalCount] = useState(0)

  const [titleDescription, setTitleDescription] = useState({});

  const onChange = (pagenumber) => {
    setPageNumber(pagenumber) 
  }

  const pageSizeChange = (pageSize) => {
    setpageSize(pageSize)
  }

  const dispatch = useDispatch();
  const [recentAll, setrecentAll] = useState([]); 
  const [filter, setFilter] = useState({ type: '', value: '' });
  
  const [pageMost, setpageMost] = useState([]);
  const [loading, setLoading] = useState(true);

  let { filterType } = useParams();
  let history = useHistory();

  /* update state from url params.Default will be all */
  useEffect(() => {

    let ftype = "recently-listed";
    let fval = "";

    if(filterType && filterType.includes("year")){
      let fArr = filterType.split("-");
      ftype = "year";
      fval = fArr[1];
    } else if(filterType) {
      ftype = filterType;
    }

    if(ftype === filter.type && fval === filter.val){
      return;
    }

    setFilter({type:ftype, value:fval});
  }, [filterType]);


  useEffect(()=>{
    setPageNumber(1)
  },[pageSize])

  useEffect(() => {

    const firstPageIndex = (pagenumber - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    let data = recentAll.slice(firstPageIndex, lastPageIndex);
    setpageMost(data);
    
  }, [recentAll, pagenumber, pageSize]);


  useEffect(() => {
    let { title = "", description = "" } = TitleDescriptionJson[filter.type] || {};

    setrecentAll([]); // setting table data to empty array to show loader while loading.
    setLoading(true)

    if (filter.type == 'all') {
      dispatch(ipo_actions.getrecentAll())
      .then((response) => {
        setrecentAll(response.body);
        setTotalCount(response.totalCount)
        setLoading(false)
      })
      .catch((error) => setLoading(false))
    }
    else if (filter.type == 'recently-listed') {
      dispatch(ipo_actions.getRecentByfilter(filter.type))
      .then((response) => {
        setrecentAll(response.body);
        setTotalCount(response.body.length)
        setLoading(false)
      })
      .catch((error) => setLoading(false))
    }
    else if (filter.type == 'most-successful') {
      dispatch(ipo_actions.getrecentMost(pagenumber, pageSize))
      .then((response) => {
        setrecentAll(response.body);
        setTotalCount(response.body.length)
        setLoading(false)
      })
      .catch((error) => setLoading(false))
    }

    else if (filter.type == 'least-successful') {

      dispatch(ipo_actions.getrecentLeast(pagenumber, pageSize))
      .then((response) => {
        setrecentAll(response.body);
        setTotalCount(response.body.length)
        setLoading(false)
      }).catch((error) => setLoading(false))
    }

    else if (filter.type == 'year') {
      dispatch(ipo_actions.getrecentYear(pagenumber, pageSize, filter.value))
      .then((response) => {
        setrecentAll(response.body);
        setTotalCount(response.body.length)
        setLoading(false)
      }).catch((error) => setLoading(false))
      title = title.replace("__year__", filter.value);
      description = description.replace("__year__", filter.value);
    }

    updateTitleDescription({ title, description });
    setTitleDescription({ title, description });
  }, [filter]);

  useEffect(() => {
    setPageNumber(1);
    pageRef?.current?.setPage?.(1);
  }, [recentAll]);

  const updateTitleDescription = ({ title = "", description = "" }) => {
      document.title = title;
      const metaDescription = document.querySelector("meta[name=description]");
      metaDescription.content = description;
  };


  const [isActive, setActive] = useState('recently-listed');

  const toggleClass = () => {
    setActive(isActive == 'most-successful' ? 'least-successful' : 'most-successful', 'year')
  };

  /* more dropdown on select add url to router.history */
  const handleOnSelect = (type, value) => {
    history.push(`/screener/${type}-${value}/`);
  };

  const currentyear = new Date().getFullYear() - 2;
  const yearDropdown = [];

  // Building year dropdown data for react-select. From "current year" - 2 to 2019.
  for (var i = currentyear; i >= 2019; i--) {
    yearDropdown.push({ value: i, label: (i).toString() });
  };

  return (
    <>
      <div className="recent_ipo">
        <div className="ipo_recently_listed">
          <TitleBannerSDK
            breadcrumb = {{company_name:'recent IPO'}}
            imageUrl="https://cdn-static.trendlyne.com/static/img/page-title-v2/reports-banner-v2.png"
            imageAlt = "A person reading IPO details."
            title="Recently Listed IPOs"
            description={titleDescription?.description}
            faqUrl="https://help.trendlyne.com/support/solutions/articles/84000372486-how-do-you-check-for-past-ipos-"
            faqTitle="How do you check for past IPO"
            bannerRight={<IpoSearch/>}
          />
        </div>

        <div className="container-fluid">
          <div className="ipo_filter">         
              <div className="flex-content">
                <span>Filter By:</span>
                <ul>
                  <li
                    className={filter.type == 'recently-listed' ? 'active nav-link' : "nav-link"}
                    onClick={toggleClass}
                    data-toggle="tab"
                  >
                    <Link to={'/screener/recently-listed/'}>
                      <button className="filter_btn">Recently Listed IPOs</button>
                    </Link>
                  </li>
                  <li
                    className={filter.type == 'most-successful' ? 'active nav-link' : "nav-link"}
                    onClick={toggleClass}
                    data-toggle="tab"
                  >
                    <Link to={'/screener/most-successful/'}>
                      <button className="filter_btn">Most Successful IPOs</button>
                    </Link>
                  </li>
                  <li
                    className={filter.type == 'least-successful' ? 'active nav-link' : "nav-link"}
                    onClick={toggleClass}
                    data-toggle="tab"
                  >
                    <Link to={'/screener/least-successful/'}>
                      <button className="filter_btn">Least Successful IPOs</button>
                    </Link>
                  </li>
                  <li
                  className={filter.type == 'year' && filter.value == new Date().getFullYear()  ?  'active nav-link' : "nav-link"}
                  onClick={toggleClass}
                    data-toggle="tab"
                  >
                    <Link to={'/screener/year-'+new Date().getFullYear()+'/'}>
                      <button className="filter_btn"><p className="current_year">{new Date().getFullYear()}</p></button>
                    </Link>

                  </li>
                  <li
                   className={filter.type == 'year' && filter.value == new Date().getFullYear() - 1  ?  'active nav-link' : "nav-link"}
                  >
                    <Link to={'/screener/year-'+(new Date().getFullYear() - 1)+'/'}>
                      <button className="filter_btn"><p className="current_year">{new Date().getFullYear() - 1}</p></button>
                    </Link>
                  </li>
                  <li
                  >
                    <Select
                      value={yearDropdown.filter(year => year.value == filter.value)}
                      options={yearDropdown}
                      // menuIsOpen={true}  
                      isSearchable={false}                          
                      placeholder={<div className="select-place">More</div>}
                      onChange={(option) => {
                        handleOnSelect('year', option.value);
                      }}
                    />
                  </li>
                </ul>
              </div>
           
          </div>  
          <RecentAll
            ref={pageRef}
            data={pageMost}
            onChange={onChange}
            onPageSizeChange={pageSizeChange}
            totalCount={totalCount}
            initialPageSize={pageSize}
            // onYearChange={yearChange}
            filterType={filter.type}
            loading={loading}
          ></RecentAll>
          
        </div>
        <FAQListing></FAQListing>
      </div>
    </>
  )
}
