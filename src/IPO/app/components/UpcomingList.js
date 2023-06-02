import React, { useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import view from "../../../_assets/images/IPO/view.svg"
import { companyName, croreRender, preIpo } from "../../../_helpers/CommonFunctions";
import Pagination from "./TableComponent/Pagination";
import { Loader } from '../components/Loader';

export function UpcomingList(props) {

   const { data=[], onChange, onPageSizeChange, totalCount, initialPageSize} = props;
  

  const IpoDoc = (rhp, drhp) => {
    if ((rhp == null || rhp == '') && (drhp == null || drhp == '')) {
            return <>-</>;
        }
    else if(rhp !== null && rhp != "") {
        return <>{<img src={view} alt="view" /> } {<a className="table_doc_link" target="_blank" href={rhp}>RHP DOC   
        </a>}</>;
    }
    else {
        return <>{<img src={view} alt="view" /> } {<a className="table_doc_link" target="_blank" href={drhp}>DRHP DOC   
        </a>}</>
    }
}

  const columns = React.useMemo(
    () => [
      {
        Header: () => <a style={{ textAlign: "left" }}>Company name</a>,
        accessor: 'company_name', // accessor is the "key" in the data
        Cell: ({ row }) => {
          return companyName(row.original);
        },
      },
      {
        Header: 'Pre IPO Placement',
        headerClassName: 'table-right_content',
        accessor: 'pre_ipo_placement',

        Cell: ({ row }) => {
          return preIpo(row.original.pre_ipo_placement_in_cr)                   
        },
      },
      {
        Header: 'BID Date',
        headerClassName: 'table-right_content',
        accessor: 'bid_open_date',
        Cell: ({ row }) => {
          return (
            <div className="table-right_content">
              {row.original.bid_open_date} - {row.original.bid_close_date}
            </div>
          );
        },
      },
      {
        Header: 'ISSUE SIZE',
        headerClassName: 'table-right_content',
        accessor: 'issue_size',
        Cell: ({ row }) => {
          return croreRender(row.original.issue_size) 
        },
      },
      {
        Header: 'Price Range',
        headerClassName: 'table-right_content',
        accessor: 'price_range_min',
        Cell: ({ row }) => {
          return (
            <div className="table-right_content">
              {(row.original.price_range_min == null ? "" : '₹ ' + row.original.price_range_min)} - {(row.original.price_range_max == null ? "" : '₹ ' + row.original.price_range_max)}
            </div>
          );
        },
      },
      {
        Header: 'DRHp filing date',
        headerClassName: 'table-right_content',
        accessor: 'drhp_filing_date',
        Cell: ({ row }) => {
          return (
            <div className="right_content">

              {
                row.original.drhp_filing_date == null ? "-" :

                  <>{row.original.drhp_filing_date}</>
              }

              {
                row.original.drhp_doc_url == null ? "" :

                  <a className="btn_view" target="_blank" href={row.original.drhp_doc_url}>   <img
                    src={view}
                    alt="view"
                  /> <span> View Doc</span>
                  </a>
              }
            </div>
          );
        },
      },
      {
        Header: 'IPO Doc',
        accessor: 'ipo_rhp_document',
        Cell: ({ row }) => {
          return (
            <div className="view_doc">
              <span>{IpoDoc(row.original.ipo_rhp_document, row.original.ipo_drhp_document)}</span>

            </div>
          );
        },
      },
    ],
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    setPageSize,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable({ columns, data, initialState: { pageSize: initialPageSize } }, useGlobalFilter, useSortBy, usePagination);

  const { pageIndex, pageSize, globalFilter } = state;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    setCurrentPage(1)
  },[pageSize])

  return (
    <>
        <div className="panel_table custom_table data_table fixed_table">
        {data.length > 0 ? (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    // Add the sorting props to control sorting. For this example
                    // we can add them into the header props
                    <th className={column.headerClassName} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <span style={{color: column.isSorted ? "#016aff" : "inherit"}}>
                        {column.render('Header')}
                      </span>
                      {/* Add a sort direction indicator */}
                      <span className=" d-flex flex-column table_sort sorting_arrow ">
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
                                      ? "#CFD4DC"
                                      : "#016AFF"
                                    : "#CFD4DC"
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
                                      ? "#016AFF"
                                      : "#CFD4DC"
                                    : "#CFD4DC"
                                }
                              />
                            </span>
                          </>
                        }
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {// Loop over the table rows
                rows.map(row => {
                  // Prepare the row for display
                  prepareRow(row)
                  return (
                    // Apply the row props
                    <tr {...row.getRowProps()}>
                      {// Loop over the rows cells
                        row.cells.map(cell => {
                          // Apply the cell props
                          return (
                            <td {...cell.getCellProps()}
                              style={{
                                background: cell.column.isSorted ? "#f3f8ff" : "inherit"
                              }}
                            >
                              {// Render the cell contents
                                cell.render('Cell')}
                            </td>
                          )
                        })}
                    </tr>
                  )
                })}
            </tbody>
          </table>
        ) : (
          <div className="text-center p-b-1">
            <Loader/>
          </div>
        )}
        {/* data.length > 3 && (
          <a className="showMoreItems" onClick={showMoreItems}>
            {showMore ? showHide : showHide}
            <img
              src={showMoreImg}
              className="showMoreicon"
              alt="drop_down"
              width="10"
            />
          </a>
        ) */}
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
                  {[10, 15, 25, 50, 100,"All"].map((pageSize) => (
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
    </>
  );
}
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
