import React, { useState, useContext } from "react";
import { useTable } from "react-table";
import dvm_arrow_up from "../../../../_assets/images/superstar_portfolio/dvm_arrow_up.svg";
import drop_down from "../../../../_assets/images/superstar_portfolio/drop_down.svg";
import drop_up from "../../../../_assets/images/superstar_portfolio/drop_up.png";
import { useSelector } from "react-redux";
import { MobileExternalStockButtons } from "../ExternalStockButtons";
import { Increase } from "./CommonSvg";
import { triggerSummaryPopup } from "../../../../_helpers/CommonFunctions";
import superstarContext from "../../context/superstar/superstarContext";

export function IncreaseTable(props) {
  const portfolioDetail = useSelector(({ superstar_portfolio }) => {
    return superstar_portfolio.overviewDetails;
  });

  const { increaseData } = props;
  const { externalView } = useContext(superstarContext);
  const result = increaseData;

  const DOTS = "...";

  const data = result.sort(
    (a, b) => b.Change_from_Previous_Qtr - a.Change_from_Previous_Qtr
  );

  const [visible, setVisible] = useState(3);
  const [showMore, setShowMore] = useState(false);
  const [showHide, setshowHide] = useState("Show More");
  const [showMoreImg, setShowMoreImg] = useState(drop_down);

  const showMoreItems = () => {
    if (!showMore) {
      setVisible((prevValue) => prevValue + data.length);
      setShowMore(true);
      setshowHide("Show Less");
      setShowMoreImg(drop_up);
    } else {
      setVisible((prevValue) => prevValue - data.length);
      setShowMore(false);
      setshowHide("Show More");
      setShowMoreImg(drop_down);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Stock Name",
        accessor: "full_name",

        Cell: ({ row }) => {
          return (
            <div className="stock-cell-wrapper">
              <a className="heading_link" onClick={() => {triggerSummaryPopup(row.original, externalView)}}>
                {row.original.full_name.length > 22
                  ? row.original.full_name.slice(0, 22).concat(DOTS)
                  : row.original.full_name}
              </a>
              <MobileExternalStockButtons row={row.original} />
            </div>
          );
        },
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "right",
            }}
          >
            Dec-2021
          </div>
        ),
        accessor: "Holding_Percent",
        Cell: ({ row }) => {
          return (
            <div
              style={{
                textAlign: "right",
              }}
              className="aligment_right"
            >
              {row.original.Holding_Percent > 0
                ? row.original.Holding_Percent.toLocaleString(undefined, {
                    maximumFractionDigits: 1,
                  }) + "%"
                : "-"}
            </div>
          );
        },
      },

      {
        Header: () => (
          <div
            style={{
              textAlign: "right",
            }}
          >
            Change
          </div>
        ),
        accessor: "Change_from_Previous_Qtr",
        Cell: ({ row }) => {
          return (
            <div
              className="positive_color"
              style={{
                textAlign: "right",
              }}
            >
              <img className="dvm-arrow-up" src={dvm_arrow_up} alt="dvm_arrow_up" width="8" />{" "}
              &nbsp;&nbsp;
              {row.original.Change_from_Previous_Qtr.toLocaleString(undefined, {
                maximumFractionDigits: 1,
              })}{" "}
              %
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <h1>
        <Increase
         className='dvm-arrow-up'
        ></Increase>
        <span>Increase</span>
      </h1>
      <div className="custom_table increase">
        {data.length > 0 && (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.slice(0, visible).map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {data.length > 3 && (
          <a className="showMoreItems" onClick={showMoreItems}>
            {showMore ? showHide : showHide}
            <img
              className="showMoreicon"
              src={showMoreImg}
              alt="drop_down"
              width="10"
            />{" "}
          </a>
        )}
        {data.length <= 0 && <div className="nodatashow">No Stocks</div>}
      </div>
    </>
  );
}
