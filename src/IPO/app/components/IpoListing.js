import React from "react";
import { useTable, useSortBy } from "react-table";
import {companyName, dateRender, dateSorting, rupeeRender, croreRender, xRender } from "../../../_helpers/CommonFunctions";

import { Loader } from "./Loader";

export function IpoListing(props) {

  const { data = [] } = props;

    if (data.length == 0) {
      return <></>
  }

  const columns = React.useMemo(
    () => [
      {
        Header: () => <a style={{ textAlign: "left" }}>COMPANY NAME</a>,
        accessor: 'company_name',
        Cell: ({ row }) => {
          return companyName(row.original);
        }       
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
          return  xRender(row.original.qib)                            
        }
      },
      {
        Header: 'HNI',
        headerClassName: 'table-right_content',
        accessor: 'hni',
        Cell: ({ row }) => {
          return  xRender(row.original.hni)   
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
        Header: 'Total Subscription',
        headerClassName: 'table-right_content',
        accessor: 'total_subscription',
        Cell: ({ row }) => {
          return xRender(row.original.total_subscription)       
        }
      },
      {
        Header: 'Issue OPEN DATE',
        headerClassName: 'table-right_content',
        accessor: 'open_date',
        Cell: ({ row }) => {
          return  dateRender(row.original.open_date)                
        },      
        sortType:(a,b) => {
          return dateSorting(a.original.open_date, b.original.open_date)
        }
      },
   
      {
        Header: 'ISSUE CLOSE DATE',
        headerClassName: 'table-right_content',
        accessor: 'close_date',
        Cell: ({ row }) => {
          return dateRender(row.original.close_date)                 
        }, 
        sortType:(a,b) => {
          return dateSorting(a.original.close_date, b.original.close_date)
        }             
      },
      {
        Header: 'Allotment Date',
        headerClassName: 'table-right_content',
        accessor: 'allotment_date',
        Cell: ({ row }) => {
          return dateRender(row.original.allotment_date)                
        },  
        sortType:(a,b) => {
          return dateSorting(a.original.allotment_date, b.original.allotment_date)
        }            
      },
      {
        Header: 'Refund Date',
        headerClassName: 'table-right_content',
        accessor: 'refund_date',
        Cell: ({ row }) => {
          return dateRender(row.original.refund_date)                
        }, 
        sortType:(a,b) => {
          return dateSorting(a.original.refund_date, b.original.refund_date)
        }             
      },
      {
        Header: 'Demat Account CREDIT Date',
        headerClassName: 'table-right_content',
        accessor: 'demat_credit_date',
        Cell: ({ row }) => {
          return  dateRender(row.original.demat_credit_date)                 
        },  
        sortType:(a,b) => {
          return dateSorting(a.original.demat_credit_date, b.original.demat_credit_date)
        }             
      },
      {
        Header: 'LISTING DATE',
        headerClassName: 'table-right_content',
        accessor: 'listing_date',
        Cell: ({ row }) => {
          return dateRender(row.original.listing_date)                   
        },   
        sortType:(a,b) => {
          return dateSorting(a.original.listing_date, b.original.listing_date)
        }          
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  // const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <div className="section_header">
        <h2>IPOs Listing soon</h2>
      </div>
      <div className="listing_detail">
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
                        <span style={{
                            color: column.isSorted ? "#016aff" : "inherit"
                          }}>
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
                <Loader />
              </div>
          )}
        </div>

        {/* <Link
          className="view-btn"
          to="/recentipo/"
        >
          View All
          <img
            src={All}
          />
        </Link> */}
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
