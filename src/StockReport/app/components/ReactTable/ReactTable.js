import React from 'react';
import { useTable } from 'react-table'
import { Table } from 'react-bootstrap';
const ReactTable = (props) => {
    const {columns, data, getCellProps = () => ({}), getColumnProps} = props;
    const {
        getTableProps,
        getTableBodyProps,
       
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })
    return (
        <div className="table-responsive">
        <Table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                        {...column.getHeaderProps([
                            {
                              className: column.headerClassName
                            }
                          ])}
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
                            // <td
                            //     {...cell.getCellProps([
                            //     {
                            //       className: cell.column.className
                            //     },
                            //     getColumnProps(cell.column),
                                
                            //   ])}
                            
                            // >
                            //     {cell.render('Cell')}
                            // </td>
                            <td
                                {...cell.getCellProps([
                                {
                                    className: cell.column.className,
                                    
                                },
                                getColumnProps(cell.column),
                                getCellProps(cell),
                                ])}
                            >
                                {cell.render('Cell')}
                            </td>
                        )
                        })}
                    </tr>
                    )
                })}
            </tbody>
        </Table>
        </div>
    )
}
 
export default ReactTable;