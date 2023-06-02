import React from "react";

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { peerTableColumnChart } from "../../utils/chart/chart";

const Table = ({ id, columns, data }) => {
    let sparkline = peerTableColumnChart();
    return (
        <div className="table-responsible">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map(({key, name, id }, index) => {
                            let className = index == 0 ? 'text-left' : 'text-center'; 
                            if(index == 1) {
                                className = "text-center"
                                let col = columns.slice(index+1);
                                let spOption = {
                                    ...sparkline,
                                    chart: {
                                        ...sparkline.chart,
                                        height: 25,
                                        marginTop: 3,
                                        marginBottom: 0,
                                    },
                                    plotOptions: {
                                        ...sparkline.plotOptions,
                                        series: {
                                            ...sparkline.plotOptions.series,
                                            dataLabels: {
                                                ...sparkline.plotOptions.series.dataLabels,
                                                enabled: true,
                                                useHTML: true,
                                                formatter: function () {
                                                    return this.x + 1
                                                },
                                                style: {
                                                  fontSize: "10px",
                                                  fontWeight: 600,
                                                  fontFamily: "Lato Semibold"
                                                },
                                            },
                                        }
                                    },
                                    series: [{
                                        data: col.map((value, index) => index == 0 ? {y: 1, color: "#006aff", actual: (index + 1)} : {y: 1, actual: (index + 1)})
                                    }]
                                }
                                
                                return (
                                    <th className={className} key={key}>
                                        <div>{name}</div>
                                        <HighchartsReact highcharts={Highcharts} options={spOption} />
                                    </th>
                                )
                            }
                            return (
                                <th className={className} key={key}>
                                    <div>{name}</div>
                                    {index > 1 ? <span>({id})</span> : ''}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowData) => (
                        <tr key={rowData[id]}>
                            {rowData.map( (value, index) => {
                                // let className = index > 1  ? `${value > 80 ? 'bg-success' : value > 20 ? 'bg-success-100' : ''}`: '';
                                let className = '';
                                if(index == 1) {
                                    sparkline = {
                                        ...sparkline,
                                        series: [{
                                            data:[...value]
                                        }]
                                    }
                                    return <td width="150" className={`${className} p-0 text-center sparkline-chart`}>
                                        <HighchartsReact highcharts={Highcharts} options={sparkline} />
                                    </td>
                                }
                                return <td className={`${className} ${index == 0 ? 'text-left': 'text-center'}`}>
                                    {value}
                                </td>
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;