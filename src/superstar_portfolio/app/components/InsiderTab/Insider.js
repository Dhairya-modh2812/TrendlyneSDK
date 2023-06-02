import React, { useEffect, useState, useContext } from "react";
import Pagination from "../TableComponent/Pagination";
import { useDispatch } from "react-redux";
import * as superstar_portfolio from "../../../../_redux/superstar_portfolio/actions";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import GlobalFilter from "../TableComponent/GlobalFilter";
import superstarContext from "../../context/superstar/superstarContext";
import { MobileExternalStockButtons } from "../ExternalStockButtons";
import { triggerSummaryPopup } from "../../../../_helpers/CommonFunctions";

function Insider() {
  const dispatch = useDispatch();
  const [insiderData, setInsiderData] = useState([]);

  const { superstarName, setSuperstarName, externalView, superstarInsiderTradingSastUrl, corsKey, currentPageSize, setCurrentPageSize, pageSizeOptions = [] } = useContext(superstarContext);

  let n;

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(superstar_portfolio.getInsiderList(id, { externalView, superstarInsiderTradingSastUrl, corsKey })).then((response) => {
        const { tableData, tableHeaders, extraHeaders = [] } = response;
        setSuperstarName(response.superstarData.name);

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

        //   let header_keys = tableHeaders.map((h) => h["unique_name"]);

        let insiderData = tableData.map((item) => {
          let obj = {};
          item.forEach((value, index) => {
            obj = {
              ...obj,
              [tableHeaders[index].unique_name]: value,
            };
          });
          obj['extraItems'] = getTableExtraItems(obj);
          return obj;
        });
        setInsiderData(insiderData);
      });
    }
  }, [id]);

  useEffect(() => {
    setCurrentPage(1);
    gotoPage(0);
  }, [currentPageSize]);

  const data = insiderData;

  const columns = React.useMemo(
    () => [
      {
        Header: "REPORTED TO EXCHANGE",
        accessor: "report_date",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "left" }}>
              {" "}
              {moment(row.original.report_date).format("DD MMM YYYY")}
            </div>
          );
        },
      },
      {
        Header: "STOCK NAME",
        accessor: "get_full_name",
        headerClassName: "justify-left-between",
        Cell: ({ row }) => {
          return (
            <div className="stock-cell-wrapper">
              <a className="heading_link" onClick={() => {triggerSummaryPopup(row.original, externalView)}}>
                {row.original.get_full_name.length > 22
                  ? row.original.get_full_name.slice(0, 22).concat("...")
                  : row.original.get_full_name}
              </a>
              <MobileExternalStockButtons row={row.original} />
            </div>
          );
        },
      },
      {
        Header: "HOLDER NAME",
        accessor: "actor",
        headerClassName: "justify-left-between",
      },
      {
        Header: "CLIENT CATEGORY",
        accessor: "actor_category_text",
        headerClassName: "justify-left-between",
      },
      {
        Header: "ACTION",
        accessor: "transaction_type_text",
        headerClassName: "justify-left-between",
        Cell: ({ row }) => {
          return (
            <div
              style={{ textAlign: "left" }}
              className={` ${
                row.original.transaction_type_text == "Acquisition"
                  ? "positive_color"
                  : row.original.transaction_type_text == "Disposal"
                  ? "negative_color"
                  : " "
              }`}
            >
              {row.original.transaction_type_text == "Acquisition" ||
              row.original.transaction_type_text == "Disposal" ||
              row.original.transaction_type_text == "Not Reported"
                ? row.original["transaction_type_text"]
                : "-"}
            </div>
          );
        },
      },
      {
        Header: "QUANTITY",
        accessor: "holding_change",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "right" }}>
              {row.original.holding_change > 0
                ? (n = parseInt(row.original.holding_change).toLocaleString())
                : "-"}
            </div>
          );
        },
      },
      {
        Header: "AVG PRICE",
        accessor: "average_price",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "right" }}>
              {row.original.average_price > 0
                ? (n = parseInt(row.original.average_price).toLocaleString())
                : "-"}
            </div>
          );
        },
      },
      {
        Header: "TRADED %",
        accessor: "holdingP_change",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "right" }}>
              {row.original.holdingP_change > 0
                ? row.original.holdingP_change + "%"
                : "-"}
            </div>
          );
        },
      },
      {
        Header: "POST TRANS HOLDING",
        accessor: "holding_after",
        headerClassName: "justify-right-between",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "right" }}>
              <div style={{ textAlign: "right" }}>
                {row.original.holding_after > 0
                  ? (n = parseInt(row.original.holding_after).toLocaleString())
                  : "-"}
              </div>
              <div tyle={{ textAlign: "right" }}>
                ({" "}
                {row.original.holdingP_after > 0
                  ? row.original.holdingP_after + "%"
                  : "-"}
                )
              </div>
            </div>
          );
        },
      },
      {
        Header: "REGULATION (Insider/sast)",
        accessor: "get_sast_type_display",
        headerClassName: "justify-center-between",

        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "center" }}>
              {row.original.get_sast_type_display == null
                ? "-"
                : row.original["get_sast_type_display"]}
              &nbsp; {row.original.regulation_text}
            </div>
          );
        },
      },
      {
        Header: "SECURITY TYPE",
        accessor: "security_type_text",
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: "left" }}>
              {row.original.security_type_text == null
                ? "-"
                : row.original["security_type_text"]}
            </div>
          );
        },
      },
      {
        Header: "MODE",
        accessor: "mode",
        headerClassName: "justify-left-between",
        Cell: ({ row }) => {
          return <div style={{ textAlign: "left" }}>{row.original.mode}</div>;
        },
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setPageSize,
    setGlobalFilter,
    prepareRow,
  } = useTable({ columns, data, initialState: { pageSize: currentPageSize } }, useGlobalFilter, useSortBy, usePagination);
  const { pageIndex, globalFilter } = state;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTimeout( () => {
      if(window.TLSuperstar && window.TLSuperstar.enableSuperstarActions) {
          window.TLSuperstar.enableSuperstarActions();
      }
    }, 100);
  }, [state]);

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="custom_entry_table insider fixed_table auto_table">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
            {page.length > 0 ? (
              <>
                {page.map((row) => {
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
                <td colSpan={12}>
                  <div className="FilterNorecord">No records found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {page.length > 0 && (
        <div
          className="custom_table_footer"
          style={{ display: "flex", float: "right" }}
        >
          <Pagination
            className="pagination-bartable"
            currentPage={currentPage}
            totalCount={data.length}
            pageSize={currentPageSize}
            onPageChange={(pagea) => {
              setCurrentPage(pagea);
              gotoPage(pagea - 1);
            }}
          />

          <div className="flex_content_mob">
            {data.length > 10 && (
              <div className="quantity">
                <select
                  value={currentPageSize}
                  onChange={(e) => {
                    setCurrentPageSize(Number(e.target.value));
                    setPageSize(Number(e.target.value));
                  }}
                  style={{ height: "32px" }}
                >
                {pageSizeOptions.map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;

                    gotoPage(pageNumber);
                  }}
                  style={{ width: "32px", height: "32px" }}
                />
              </div>
            )}
            <span className="pagination-data">
              &nbsp;&nbsp; {data.length} Results
            </span>
          </div>
        </div>
      )}
    </>
  );
}
export default Insider;

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
