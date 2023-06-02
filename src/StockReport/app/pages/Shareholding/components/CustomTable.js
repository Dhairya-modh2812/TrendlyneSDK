import React from 'react'
import { Table } from 'react-bootstrap'
const ReactCustomTable = ({data, columns}) => {

    return <Table borderless={true} className="table">
        <thead>
            <tr>
              {columns.map((item, index) => <TableHeadItem key={index.toString()} item={item}/> )}
            </tr>
        </thead>
        <tbody>
            {data.map((data, index) => {
                return <TableRow key={index.toString()} item={data} columns={columns}/>
            })}
        </tbody>
    </Table>
}
  
const TableHeadItem = ({item}) => {
    let className = item.columnClassName;
    return <th className={className}>{item.heading}</th>
}
const TableRow = ({item, columns}) => {
    
    return <tr>{columns.map((columnItem, index) => {
        let columnClassName = columnItem.columnClassName;
        if(columnItem.formatter) {
            return <td className={columnClassName}>{columnItem.formatter({row: item})}</td>
        }
        if(columnItem.key.includes('.')) {
            const itemSplit = columnItem.key.split('.');
            return <td className={columnClassName}>{item[itemSplit[0]][itemSplit[1]]}</td>
        }
        return <td className={columnClassName}>{item[columnItem.key]}</td>
    })}</tr>
}

export default ReactCustomTable;