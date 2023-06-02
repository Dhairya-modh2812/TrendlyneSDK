import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { issueSize, gainPercent } from "../../../../_helpers/CommonFunctions";

export function Analysis(props) {

    let { data } = props

    const [seriesData, setSeriesData] = useState([]);

    const [xCategory, setxCategory] = useState([]);

    const [yCategory, setyCategory] = useState([]);

    useEffect(() => {
        if (data) {
            data = data.filter(item => item.total_subscription != null);

            data = data.sort((a, b) => {
                return a.total_subscription - b.total_subscription
            })
            let category = []
            let categoryy = []
            let positiveSeries = [];
            let negativeSeries = [];

            data?.forEach((item) => {
                if (item.total_subscription !== null) {
                    category.push(item.total_subscription)
                }

                if (item.current_gainP !== null) {
                    categoryy.push(item.current_gainP)
                }
                if (item.current_gainP >= 0) {
                    positiveSeries.push({ ...item, name: item.company_name, y: item.current_gainP });
                    negativeSeries.push(null);
                } else if (item.current_gainP < 0) {
                    negativeSeries.push({ ...item, name: item.company_name, y: item.current_gainP });
                    positiveSeries.push(null);
                }
            })
            // categoryy =categoryy.sort((a, b) => a - b);
            let newseries = [{
                color: "#10bc52",
                data: [...positiveSeries]
            }, {
                data: [...negativeSeries],
                color: "#fc5a5a",
            }]
            setSeriesData(newseries)
            setxCategory(category)
            setyCategory(categoryy)
        }
    }, [data])

    const options = {
        chart: {
            type: 'bar',
            style: {
                fontFamily: "Lato, sans-serif",
                zIndex: 1
            }
        },
        title: {
            text: null
        },
        legend: {
            visible: false,
            enabled: false
        },
        xAxis: {
            categories: xCategory,
            reversed: false,
            title: {
                text: "OVERSUBSCRIBED",
                // align: 'bottom',
                style: {
                    color: '#7d7f85',
                    fontWeight: 600,
                    fontFamily: "Lato, sans-serif",
                    opacity: 0.9,
                    letterSpacing: 0.19
                }
            }

        },
        yAxis: {

            // categories: yCategory,
            lineWidth: 1,
            visible: true,
            // max: yCategory[yCategory.length - 1],
            // min: yCategory[0],
            // max: yCategory.length - 1,
            labels: {
                formatter: function () {
                    return this.value + "%";
                }
            },
            title: {
                text: "CURRENT GAIN PERCENT",
                // align: 'left',
                padding: '30',

                style: {
                    color: '#7d7f85',
                    fontWeight: 600,
                    fontFamily: "Lato, sans-serif",
                    opacity: 0.9,
                    letterSpacing: 0.19,
                    align: 'left',
                    zIndex: 1
                }
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            crosshairs: true,
            enabled: true,
            borderColor: 'none',
            zIndex: 9,
            boxShadow: '2px 2px 2px 0 rgba(236, 241, 252, 0.4)',
            useHTML: true,
            style: {
                color: '#1a1c3a',
                lineHeight: .7,
                fontSize: "10px",
                fontFamily: '"Lato", sans-serif',
                zIndex: "9"
            },
            formatter: function () {
                return `<div style="z-index: 99999" className: "graph-red">
                        <h4><b>${this.point.name}</b></h4><br/>
                        <p style="color:#1a1c3a; font-size:13px; line-height:15px; font-family: 'Lato', sans-serif; font-weight:600">issue size: ${issueSize(this.point.issue_size)}</p></br>
                        <p style="color:#1a1c3a; font-size:13px; line-height:15px; font-family: 'Lato', sans-serif; font-weight:600">Listing Gain : <span style="color: ${this.point.listing_gainP > 0 ? '#10bc52' : '#fc5a5a'}">${gainPercent(this.point.listing_gainP)}</span></p><br/>
                        <p style="color:#1a1c3a; font-size:13px; line-height:15px; font-family: 'Lato', sans-serif; font-weight:600">Current Gain: <span style="color: ${this.point.current_gainP > 0 ? '#10bc52' : '#fc5a5a'}">${gainPercent(this.point.current_gainP)}</span></p></br>
                        <p style="color:#1a1c3a; font-size:13px; line-height:15px; font-family: 'Lato', sans-serif; font-weight:600">Total subscription: ${this.point.total_subscription}x</p>
                    </div>`
            },

            outside: false
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                type: 'bar',
                padding: 25,
                pointWidth: 25,
                color: '#10BC52',
                borderRadius: 4,
                negativeColor: '#FC5A5A',
                dataLabels: {
                    enabled: true,
                    inside: true,
                    align: 'left',
                    fontSize: '8px',
                    color: '#FFFFFF',

                    useHTML: true,
                    animate: true,
                    shared: true,
                    format: '{point.name}',
                    overflow: "none"
                }
            }
        },

        series: seriesData
    }
    if (data == undefined) {
        return <></>
    }
    return (
        <>
            <div className="card_block_style_one gain-loss-chart">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </>
    );
}
