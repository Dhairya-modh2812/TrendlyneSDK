import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";

import Pagination from "../components/TableComponent/Pagination";
import { companyName, dateRender, dateSorting, rupeeRender, croreRender, xRender, percentRender, numRender } from "../../../_helpers/CommonFunctions";

import { Loader } from "./Loader";

export const RecentAll = React.forwardRef((props, ref) => {


  const { data = [], onChange, onPageSizeChange, totalCount, initialPageSize } = props;

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  const columns = React.useMemo(
    () => [
      {
        Header: 'COMPANY NAME',
        accessor: 'company_name',
        Cell: ({ row }) => {
          return  companyName(row.original);        
        },
      },
      {
        Header: 'Listing date',
        id:'date',
        headerClassName: 'table-right_content',
        accessor: 'listing_date',
        Cell: ({ row }) => {
          return  dateRender(row.original.listing_date)
        }, 
        sortType:(a,b) => {
          return dateSorting(a.original.listing_date, b.original.listing_date)
        },            
      },
      {
        Header: 'Issue Size',
        headerClassName: 'table-right_content',
        accessor: 'issue_size',
        Cell: ({ row }) => {
          return  croreRender(row.original.issue_size)                                                    
        }
      },
      {
        Header: 'Issue Price',
        headerClassName: 'table-right_content',
        accessor: 'issue_price',
        Cell: ({ row }) => {
          return rupeeRender(row.original.issue_price)
        }
      },
      {
        Header: 'QIB',
        headerClassName: 'table-right_content',
        accessor: 'qib',
        Cell: ({ row }) => {
          return xRender(row.original.qib)
        }
      },
      {
        Header: 'HNI',
        headerClassName: 'table-right_content',
        accessor: 'hni',
        Cell: ({ row }) => {
          return xRender(row.original.hni)
        }
      },
      {
        Header: 'retail',
        headerClassName: 'table-right_content',
        accessor: 'retail',
        Cell: ({ row }) => {
          return xRender(row.original.retail)
        }
      },
      {
        Header: 'total Subscription',
        headerClassName: 'table-right_content',
        accessor: 'total_subscription',
        Cell: ({ row }) => {
          return xRender(row.original.total_subscription)                   
        }
      },
      {
        Header: 'Listing Open (Rs)',
        headerClassName: 'table-right_content',
        accessor: 'listing_open_price',
        Cell: ({ row }) => {
          return numRender(row.original.listing_open_price) 
        }
      },
      {
        Header: 'Listing Close (Rs)',
        headerClassName: 'table-right_content',
        accessor: 'listing_close_price',     
        Cell: ({ row }) => {
          return numRender(row.original.listing_close_price)
        }
      },
      {
        Header: 'Listing Gain %',
        id: 'listinggain',
        headerClassName: 'table-right_content',
        accessor: 'listing_gainP',
        Cell: ({ row }) => {
          return percentRender(row.original.listing_gainP)
        },
        sortType: 'basic'
      },
      {
        Header: 'LTP (Rs)',
        headerClassName: 'table-right_content',
        accessor: 'current_price',      
        Cell: ({ row }) => {
          return numRender(row.original.current_price)
        }
      },
      {
        Header: 'Current Gain %',
        headerClassName: 'table-right_content',
        accessor: 'current_gainP',
        Cell: ({ row }) => {
          return percentRender(row.original.current_gainP)
        },
        sortType: 'basic'
      },
    ],
    []
  )


  const {
    getTableProps,
    getTableBodyProps,
    rows,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable({ columns, data, initialState: {
    pageSize: initialPageSize,
    sortBy: [
        {
            id: (props.filterType === 'most-successful' || props.filterType === 'least-successful')?'listinggain':'date',
            desc: props.filterType === 'most-successful' ? true : false
        }
    ]
} }, useGlobalFilter, useSortBy, usePagination);

  const { pageIndex, pageSize, globalFilter } = state;
  const [currentPage, setCurrentPage] = useState(1);

  React.useImperativeHandle(ref, () => ({
    setPage: (pageNum = 1) => {
      setCurrentPage(pageNum);
    },
  }));

  const firstPageRows = rows.slice(0, 20)

  useEffect(()=>{
    setCurrentPage(1)
  },[pageSize])

  return (
    <>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />    */}

      <div className="recent_detail ">
        <div className="panel_table custom_table data_table fixed_table table-responsive">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      style={{
                        minWidth: column.minWidth,
                        width: column.width,
                        maxWidth: column.maxWidth,
                      }}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div
                        className={`d-flex align-items-center ${column.headerClassName != undefined
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
                          style={{
                            color: column.isSorted ? "#016aff" : "inherit"
                          }}
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
                            <td
                              {...cell.getCellProps({
                                style: {
                                  minWidth: cell.column.minWidth,
                                  width: cell.column.width,
                                  maxWidth: cell.column.maxWidth,
                                  background: cell.column.isSorted ? "#f3f8ff" : "inherit"
                                },
                              })}
                            >
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
                  <td colSpan={13}>
                      <div className="text-center p-b-1">
                        {props.loading ? <Loader /> : "No data available."}
                      </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      
          <div
            className="custom_table_footer"
          >
            <Pagination
              className="pagination-bartable"
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={(pagea) => {
                setCurrentPage(pagea);
                gotoPage(pagea);
                onChange(pagea);
              }}
            />

            <div className="flex_content_mob">
              {/* {data.length > 10 && ( */}
                <div className="quantity">
                  <select
                    value={pageSize}
                    onChange={(e) => 
                    {
                      setPageSize(Number(e.target.value)),
                      onPageSizeChange(Number(e.target.value)) 
                    }
                    }
                    style={{ height: "32px" }}               
                    
                  >
                    {[10, 15, 25, 50, 100, 'All'].map((pageSize) => (
                        <option key={pageSize} value={pageSize == 'All' ? totalCount : pageSize}>
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
              {/* )} */}
              <span className="pagination-data">
                &nbsp;&nbsp; {totalCount} Results
              </span>
            </div>
          </div>
        </div>
    </>
  );
});


const DownArrow = (props) => {
  const { color } = props;
  return (
    <svg
      width="9"
      height="9"
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
      width="9"
      height="9"
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
