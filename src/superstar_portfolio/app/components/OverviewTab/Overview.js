import React, { useEffect, useState, useContext } from "react";
import { EntryTable } from "./EntryTable";
import DonutChartComponent from "../Charts/DonutChartComponent";
import { ExitTable } from "./ExitTable";
import { IncreaseTable } from "./IncreaseTable";
import { DecreaseTable } from "./DecreaseTable";
import { Holdings } from "./Holdings";
import drop_down from "../../../../_assets/images/superstar_portfolio/drop_down.svg";
import drop_up from "../../../../_assets/images/superstar_portfolio/drop_up.png";
import { useDispatch, useSelector } from "react-redux";
import * as superstar_portfolio from "../../../../_redux/superstar_portfolio/actions";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import superstarContext from "../../context/superstar/superstarContext";
import {SuperstarSlices} from "./../../../../_redux/superstar_portfolio/slices";

export function Overview(props) {
  const dispatch = useDispatch();
  const [responsData, setResponsData] = useState(null);
  const [responsDataHoldings, setResponsDataHoldings] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [holdingPer, setHoldingPer] = useState([]);
  const [showHide, setShowHide] = useState(false);
  const [showMore, setShowMore] = useState("Show More");

  const [loading, setLoading] = useState(true);
  const [entryData, setEntryData] = useState([]);
  const [exitData, setExitData] = useState([]);
  const [decreaseData, setDecreaseData] = useState([]);
  const [increaseData, setIncreaseData] = useState([]);
  const [holdingdata, setHoldingData] = useState([]);
  const [showMoreImg, setShowMoreImg] = useState(drop_down);

  const [sectorChartData, setSectorChartData] = useState([]);

  const [headerNameData, setHeaderNameData] = useState("");
  const [uiQuarterString, setuiQuarterString] = useState("");

  const { superstarName, setSuperstarName, externalView, superstarPortfolioUrl, corsKey } = useContext(superstarContext);

  const [sectorChart, setSectorChart] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(superstar_portfolio.getOverviewList(id, { externalView, superstarPortfolioUrl, corsKey })).then((response) => {
        setResponsData(response.totalNetWorth);
        
        setHeaderNameData(response.uiQuarterString);

        setuiQuarterString(response.uiQuarterString);

        setSuperstarName(response.superstarName);

        setSectorChart(response.sectorChart);

        const { tableData, tableHeaders, extraHeaders } = response;

        const { sectorChart = [] } = response;

        setResponsDataHoldings(response.totalStockHeld);

        const getTableExtraItems = (rowInfo) => {
          const extraTableItems = {}
      
          extraHeaders.forEach(item => {
              const { unique_name, callbackKeyName } = item || {};
              if(unique_name) {
                extraTableItems[callbackKeyName] = rowInfo[unique_name]
              }
          })
      
          return extraTableItems;
        }

        //Donut ChartData code ---------------------

        let holdingchartdata = tableData?.map((item) => {
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

        let donutChartData = holdingchartdata?.map((item) => {
          return {
            name: item.full_name,
            temp: item.Holding_Percent,
          };
        });

        // Entry Data table code------------------

        const changeFromPrevQtrIndex = (response.tableHeaders || []).findIndex(item => item.name === 'Change from Previous Qtr');
        
        let entryData = response.tableData?.filter((row) => {
          return typeof row[changeFromPrevQtrIndex] === "string" && row[changeFromPrevQtrIndex] === "NEW";
        });

        entryData = entryData?.map((item) => {
          let obj = {};
          item.forEach((value, index) => {
            obj = {
              ...obj,
              qtrString: response.uiQuarterString,
              ...(tableHeaders[index].unique_name
                ? { [tableHeaders[index].unique_name]: value }
                : { [tableHeaders[index].name.replaceAll(" ", "_")]: value }),
            };
          });
          obj['extraItems'] = getTableExtraItems(obj);
          return obj;
        });

        // ExitData Data table code-----------------

        let exitData = response.tableData?.filter((row) => {
          return typeof row[changeFromPrevQtrIndex] === "string" && row[changeFromPrevQtrIndex].includes("Below");
        });

        exitData = exitData?.map((item) => {
          let obj = {};
          item.forEach((value, index) => {
            obj = {
              ...obj,
              qtrString: response.uiQuarterString,
              ...(tableHeaders[index].unique_name
                ? { [tableHeaders[index].unique_name]: value }
                : { [tableHeaders[index].name.replaceAll(" ", "_")]: value }),
            };
          });
          obj['extraItems'] = getTableExtraItems(obj);
          return obj;
        });

        // Decrease Data table code------------

        let decreaseData = response.tableData?.filter((row) => {
          return (
            typeof row[changeFromPrevQtrIndex] === "number" &&
            row[changeFromPrevQtrIndex] !== "NEW" &&
            row[changeFromPrevQtrIndex] !== "Below 1% First Time" &&
            row[changeFromPrevQtrIndex] < 0
          );
        });

        decreaseData = decreaseData?.map((item) => {
          let obj = {};
          item.forEach((value, index) => {
            obj = {
              ...obj,
              ...(tableHeaders[index].unique_name
                ? { [tableHeaders[index].unique_name]: value }
                : { [tableHeaders[index].name.replaceAll(" ", "_")]: value }),
            };
          });
          obj['extraItems'] = getTableExtraItems(obj);
          return obj;
        });

        // Increase data table  function

        let increaseData = response.tableData?.filter((row) => {
          return (
            typeof row[changeFromPrevQtrIndex] === "number" &&
            row[changeFromPrevQtrIndex] !== "NEW" &&
            row[changeFromPrevQtrIndex] !== "Below 1% First Time" &&
            row[changeFromPrevQtrIndex] > 0
          );
        });

        increaseData = increaseData?.map((item) => {
          let obj = {};
          item.forEach((value, index) => {
            obj = {
              ...obj,
              ...(tableHeaders[index].unique_name
                ? { [tableHeaders[index].unique_name]: value }
                : { [tableHeaders[index].name.replaceAll(" ", "_")]: value }),
            };
          });
          obj['extraItems'] = getTableExtraItems(obj);
          return obj;
        });

        // Holding Data table code--------------

        let holdingdata = tableData?.map((item) => {
          let obj = {};
          item.forEach((value, index) => {
            obj = {
              ...obj,
              ...(tableHeaders[index].unique_name
                ? { [tableHeaders[index].unique_name]: value }
                : { [tableHeaders[index].name.replace(/[^a-zA-Z0-9 ]/g, '').replaceAll(" ", "_")]: value }),
            };
          });
          obj['extraItems'] = getTableExtraItems(obj);
          return obj;
        });

        let sectorChartDataD = sectorChart?.map((item) => {
          let obj = {};

          item.forEach((value, index, k) => {
            obj = {
              ...obj,
              ...{ name: k[0] },
              ...{ per: k[1] },
            };
          });
          return obj;
        });

        setSectorChartData(sectorChartDataD);
        setChartData(donutChartData);
        setHoldingPer(holdingPer);
        setEntryData(entryData);
        setExitData(exitData);
        setIncreaseData(increaseData);
        setDecreaseData(decreaseData);
        setHoldingData(holdingdata);
        setLoading(false);

      });
    }
  }, [id]);

  // Chart Data Show hide function

  const onHandle = () => {
    if (showHide) {
      setShowHide(false);
      setShowMoreImg(drop_down);
      setShowMore("Show More");
    } else {
      setShowHide(true);
      setShowMoreImg(drop_up);
      setShowMore("Show Less");
    }
  };

  // Donut Data function

  let n = parseInt(responsData);

  //  chart and Quantity color array
  let color = [
    "green",
    "blue",
    "marun",
    "yellow",
    "cyan",
    "purple",
    "magenta",
    "orange",
    "aquamarine",
    "indigo",
  ];
  let chartColorClasses = [
    "fill-green",
    "fill-blue",
    "fill-marun",
    "fill-yellow",
    "fill-cyan",
    "fill-purple",
    "fill-magenta",
    "fill-orange",
    "fill-aquamarine",
    "fill-indigo",
  ];

  let y = sectorChartData.slice(1)?.map((element) => element.per);

  y = y?.sort((a, b) => b - a);

  sectorChartData.sort((a, b) => b.per - a.per);

  const sectorDataValue = sectorChartData.slice(1)?.map((item, index) => {
    return {
      ...item,
      className: chartColorClasses[index],
      y: y[index],
    };
  });

  const holdingdataValue = holdingdata?.map((item, index) => {
    if (item.Change_from_Previous_Qtr == "NEW") {
      return {
        ...item,
        temp: 9999999,
      };
    } else if (item.Change_from_Previous_Qtr > 0) {
      return {
        ...item,
        temp: item.Change_from_Previous_Qtr,
      };
    } else if (item.Change_from_Previous_Qtr == 0) {
      return {
        ...item,
        temp: 0.0,
      };
    } else if (item.Change_from_Previous_Qtr < 0) {
      return {
        ...item,
        temp: -100 - parseFloat(item.Change_from_Previous_Qtr),
      };
    } else if (item.Change_from_Previous_Qtr == "Below 1% First Time") {
      return {
        ...item,
        temp: parseFloat(item.Change_from_Previous_Qtr),
      };
    } else {
      return {
        ...item,
        temp: -350,
      };
    }
  });

  useEffect(() => {
    if(!loading) {
	setTimeout( () => {
	  if(window.TLSuperstar && window.TLSuperstar.enableSuperstarActions) {
	      window.TLSuperstar.enableSuperstarActions();
	  }
	}, 100);
    }
  }, [loading]);

  return (
    <>
      <div className="overview_content">
          <div className="section_heading">
            <h6>Sector wise breakup of holdings</h6>
          </div>
          <div className="overviewblock_content">
            <div className="row">
              <div className="col-lg-4">
                <DonutChartComponent
                  holdingPer={holdingPer}
                  responsData={responsData}
                  chartData={sectorDataValue}
                />
              </div>
              <div className="col-lg-8">
                <div className="right_content">
                  <div className="flex-content d-flex network">
                    <div className="flex_block">
                      <p>Networth</p>
                      {loading && <Spinner />}
                      {!loading && (
                        <h5 className="cr">
                          {(n / 10000000).toLocaleString(undefined, {
                            maximumFractionDigits: 1,
                          })}{" "}
                          Cr
                        </h5>
                      )}
                    </div>

                    <div className="flex_block">
                      <p>#Company holdings</p>
                      {loading && <Spinner />}
                      {!loading && (
                        <h5 className="cr">{responsDataHoldings}</h5>
                      )}
                    </div>
                  </div>

                  <div className="process flex-content d-flex flex-wrap">
                    {sectorDataValue?.slice(0, 4).map((event, index) => (
                      <div
                        key={index}
                        className="process_block d-flex align-items-center"
                      >
                        <span className={color[index]}></span>
                        <div className="process_content">
                          <h6>{event["per"]}%</h6>

                          <p className="font_mini">{event["name"]}</p>
                        </div>
                      </div>
                    ))}

                    {showHide &&
                      sectorDataValue?.length > 4 &&
                      sectorDataValue.slice(4, 10).map((event, index) => (
                        <div
                          key={index}
                          className="process_block d-flex align-items-center"
                        >
                          <span className={color[index + 4]}></span>
                          <div className="process_content">
                            <h6>{event["per"]}%</h6>
                            <p className="font_mini">{event["name"]}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  {sectorDataValue?.length > 4 && (
                    <div className="showMoreItemsChart">
                      <a className="btn_more" onClick={onHandle}>
                        {showHide ? showMore : showMore}

                        <img
                          src={showMoreImg}
                          alt="drop_down"
                          width="10"
                          height="6"
                          className="showMoreicon"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
            { entryData && entryData.length || exitData && exitData.length ?
            <div className="entry_portfolio">
              <div className="entry_table">
                <EntryTable entryData={entryData} />
              </div>

              <div className="exit_table">
                <ExitTable exitData={exitData} />
              </div>
            </div>
              : null }
              
            { increaseData && increaseData.length || decreaseData && decreaseData.length ?
          <div className="quarter_content_row">
            <h4>Change in holdings from last quarter</h4>
            <div className="last_quarter">
              <div className="increase_table">
                <IncreaseTable
                  increaseData={increaseData}
                  uiQuarterString={uiQuarterString}
                />
              </div>

              <div className="decrease_table">
                <DecreaseTable
                  decreaseData={decreaseData}
                  uiQuarterString={uiQuarterString}
                />
              </div>
            </div>
          </div>
          : null }
          <div>
            <Holdings holdingdata={holdingdataValue} />
          </div>        
      </div>
    </>
  );
}
