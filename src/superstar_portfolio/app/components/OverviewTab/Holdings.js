import React, { useState, useContext } from "react";
import { useTable } from "react-table";
import { useGlobalFilter, useSortBy } from "react-table";
import ExternalStockButtons, { MobileExternalStockButtons } from "../ExternalStockButtons";
import GlobalFilter from "../TableComponent/GlobalFilter";
import { triggerSummaryPopup } from "../../../../_helpers/CommonFunctions";
import superstarContext from "../../context/superstar/superstarContext";

export function Holdings(props) {
  const { holdingdata } = props;

  const { externalView } = useContext(superstarContext);

  const data = holdingdata;
  const DOTS = "...";
  let n;
  let x;

  const columns = React.useMemo(
    () => [
      {
        Header: "Stock Name",
        headerClassName: "justify-content-between",
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
        Header: "Qty Held",
        headerClassName: "justify-content-end",
        accessor: "Quantity_Held",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "right" }}>
              {row.original.Quantity_Held > 0
                ? (n = parseInt(row.original.Quantity_Held).toLocaleString())
                : "-"}
            </div>
          );
        },
      },
      {
        Header: () => <div style={{ textAlign: "right" }}>%Holding</div>,
        accessor: "Holding_Percent",
        headerClassName: "justify-content-end",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "right" }}>
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
        Header: "change from previous qtr",
        headerClassName: "justify-content-end",
        accessor: "temp",
        Cell: ({ row }) => {
          return (
            <div
              style={{ textAlign: "right" }}
              className={` ${
                row.original.Change_from_Previous_Qtr > 0 ||
                row.original.Change_from_Previous_Qtr == "NEW"
                  ? "positive_color"
                  : row.original.Change_from_Previous_Qtr < 0 ||
                    row.original.Change_from_Previous_Qtr ==
                      "Below 1% First Time"
                  ? "negative_color"
                  : ""
              }`}
            >
              {row.original["Change_from_Previous_Qtr"].toLocaleString(
                undefined,
                { maximumFractionDigits: 1 }
              )}
            </div>
          );
        },
      },
      {
        Header: "Holding Value(Crs.)",
        headerClassName: "justify-content-end",
        accessor: "Holding_Value_Rs",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "right" }}>
              {row.original["Holding_Value_Rs"] > 0
                ? (n = (
                    parseInt(row.original["Holding_Value_Rs"]) / 10000000
                  ).toLocaleString(undefined, { maximumFractionDigits: 1 }))
                : "-"}
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <>
      <div className="section_holding">
        <h2>Holdings</h2>
        {data.length > 0 ? (
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

            <div className="custom_table holding table-responsive fixed_table">
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          <div
                            className={`d-flex align-items-center ${
                              column.headerClassName != undefined
                                ? column.headerClassName
                                : ""
                            }`}
                          >
                            <span
                              className={
                                column.isSorted &&
                                (column.isSortedDesc || !column.isSortedDesc)
                                  ? "primary-icon pe-2"
                                  : "pe-2"
                              }
                            >
                              {column.render("Header")}
                            </span>

                            <span className="lh-1 d-flex flex-column table_sort">
                              {
                                <>
                                  <span
                                    className={` {
                                column.isSorted
                                  ? column.isSortedDesc
                                    ? "text-primary"
                                    : "text-secondary"
                                  : "text-secondary"
                              }`}
                                  >
                                    <UpArrow
                                      color={
                                        column.isSorted
                                          ? column.isSortedDesc
                                            ? "#cfd4dc"
                                            : "#016aff"
                                          : "#cfd4dc"
                                      }
                                    />
                                  </span>
                                  <span
                                    className={
                                      column.isSorted
                                        ? column.isSortedDesc
                                          ? "text-secondary"
                                          : "text-primary"
                                        : "text-secondary"
                                    }
                                  >
                                    <DownArrow
                                      color={
                                        column.isSorted
                                          ? column.isSortedDesc
                                            ? "#016aff"
                                            : "#cfd4dc"
                                          : "#cfd4dc"
                                      }
                                    />
                                  </span>
                                </>
                              }
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                  {rows.length > 0 ? (
                    <>
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        {" "}
                        <div className="FilterNorecord">No records found</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="nodatashow">No Stocks</div>
        )}
      </div>
    </>
  );
}

const DownArrow = (props) => {
  const { color } = props;
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.374 2.571c.253 0 .481.159.578.4a.665.665 0 0 1-.135.707l-5.375 5.56a.615.615 0 0 1-.442.19.615.615 0 0 1-.442-.19L.183 3.679a.665.665 0 0 1-.135-.706.627.627 0 0 1 .578-.4h10.748z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

const UpArrow = (props) => {
  const { color } = props;
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.374 9.429a.627.627 0 0 0 .578-.4.665.665 0 0 0-.135-.707l-5.375-5.56A.615.615 0 0 0 6 2.571a.615.615 0 0 0-.442.19L.183 8.321a.665.665 0 0 0-.135.706c.097.242.325.4.578.4h10.748z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};
