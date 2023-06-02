import React, { useContext } from "react";
import { useTable } from "react-table";

import exit_icon from "../../../../_assets/images/superstar_portfolio/entry_icon.svg";
import moment from "moment";
import ExternalStockButtons, { MobileExternalStockButtons } from "../ExternalStockButtons";
import { ExitIcon } from "./CommonSvg";
import { triggerSummaryPopup } from "../../../../_helpers/CommonFunctions";
import superstarContext from "../../context/superstar/superstarContext";

export function ExitTable(props) {
  const { exitData } = props;
  const data = exitData;

  const { externalView } = useContext(superstarContext);

  const DOTS = "...";

  const columns = React.useMemo(
    () => [
      {
        Header: () => <div style={{ textAlign: "left" }}>Stock Name</div>,
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
        Header: () => <div style={{ textAlign: "right" }}>Investor holds</div>,
        accessor: "Change_from_Previous_Qtr",

        Cell: ({ row }) => {
          return (
            <div  style={{ textAlign: "right" }}>
              {row.original.Change_from_Previous_Qtr}
            </div>
          );
        },
      },

      {
        Header: () => <div style={{ textAlign: "right" }}>QTR</div>,
        accessor: "qtrString",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "right" }}>{moment(row.original.qtrString).format("MMM, YYYY")}</div>
          );
        },
      },
      {
        Header: () => <div style={{ textAlign: "center" }}>Status</div>,
        accessor: "Holders_Name",
        Cell: ({ row }) => {
          return (
            <div
              style={{
                textAlign: "center",
              }}
            >
              <button
                style={{ textAlign: "center" }}
                className="purchasebutton negative_color"
              >
                SELL
              </button>
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
      <h2>
     <ExitIcon
      className='exit-icon'
     ></ExitIcon>{" "}
        <span>Fresh Exit in Portfolio</span>
      </h2>

      <div className="custom_table exit table-responsive fixed_table">
        {data.length > 0 ? (
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
              {rows.map((row) => {
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
        ) : (
          <div className="nodatashow">No Stocks</div>
        )}
      </div>
    </>
  );
}
