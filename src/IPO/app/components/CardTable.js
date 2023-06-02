import React, { useMemo, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";

export function CardTable(props) {

    const {data=[], headers=[] } =  props;

    const defaultHeaders = [
        {               
            Header: () => <div style={{ textAlign: "right" }}>Retail Individual Investor</div>,      
            accessor: 'retail_individual_investor',
            Cell: row => <div style={{ textAlign: "right" }}>{row.value == null ? '-' : row.value+'x'}</div>     
                   
        },
        {          
            Header: () => <div style={{ textAlign: "right" }}>Non - Institutional Investor</div>,    
            accessor: 'non_institutional_investor',
            Cell: row => <div style={{ textAlign: "right" }}>{row.value == null ? '-' : row.value+'x'}</div>  
        },
        {        
            Header: () => <div style={{ textAlign: "right" }}>Qualified Institutional Buyers</div>,    
            accessor: 'qualified_institutional_buyers',
            Cell: row => <div style={{ textAlign: "right" }}>{row.value == null ? '-' : row.value+'x'}</div>  
            
        },
   
    ];

    let tableHeaders = [];
    if (headers && headers.length){
		tableHeaders = headers.map((header, index) => {
			return (
				{          
					Header: () => <div style={{ textAlign: "right" }}>{header.name}</div>,
					accessor: header.accessor,
					Cell: row => <div style={{ textAlign: "right" }}>{row.value == null ? '-' : row.value+'x'}</div>  
				}
			)
		})
	} else {
		tableHeaders = defaultHeaders;
	}
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Day',
            accessor: 'day', // accessor is the "key" in the data
            Cell: ({row}) =>{     
              return(
                <div dangerouslySetInnerHTML={{ __html: row.original.day == null ? "-" : row.original.day }}>
                </div>                                
              )
            }
          },
          ...tableHeaders
        ],
        [props]
    )
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })

    return (
        <>
            <div className="panel_table custom_table fixed_table">
                <table {...getTableProps()} className="bordered">
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}                                
                            >
                                {column.render('Header')}
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                <td
                                    {...cell.getCellProps()}                                                                
                                >
                                    {cell.render('Cell')}
                                </td>
                                )
                            })}
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
            </div>  
        </>
    );
}
