import React, { useContext } from "react";
import { useTable } from "react-table";
import entry_icon from "../../../../_assets/images/superstar_portfolio/exit_icon.svg";
import moment from "moment";
import ExternalStockButtons, { MobileExternalStockButtons } from "../ExternalStockButtons";
import { EntryIcon } from "./CommonSvg";
import { triggerSummaryPopup } from "../../../../_helpers/CommonFunctions";
import superstarContext from "../../context/superstar/superstarContext";

export function EntryTable(props) {
  const { entryData } = props;
  const data = entryData;

  const externalView = useContext(superstarContext);
  let n;
  const DOTS = "...";
  const columns = React.useMemo(
    () => [
      {
        Header: () => <div>Stock Name</div>,
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
            Shares Qty
          </div>
        ),
        accessor: "Quantity_Held",
        Cell: ({ row }) => {
          return (
            <div
              style={{
                textAlign: "right",
              }}
            >
              {(n = parseInt(row.original.Quantity_Held).toLocaleString())}
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
            %Holding
          </div>
        ),
        accessor: "Holding_Percent",
        Cell: ({ row }) => {
          return (
            <div
              style={{
                textAlign: "right",
              }}
            >
              {row.original.Holding_Percent.toLocaleString(undefined, {maximumFractionDigits:1,})} %
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
             QTR
          </div>
        ),
        accessor: "qtrString",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "right" }}>
                 {moment(row.original.qtrString).format("MMM, YYYY")} </div>

            
          );
        },
      },
      {
        Header: () => (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Status
          </div>
        ),
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
                className="purchasebutton positive_color"
              >
                PURCHASE
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
        <EntryIcon
        className='entry-icon'
        ></EntryIcon>{" "}
        <span>Fresh Entry in Portfolio</span>
      </h2>

      <div className="custom_table entry table-responsive fixed_table">
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
                        <td
                          className={cell.column.className}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
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
