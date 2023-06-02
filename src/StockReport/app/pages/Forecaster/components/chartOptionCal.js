import { formatNumber } from "../../../utils/commonFunctions";

// import { defaultChartOptions } from "./base";
const defaultChartOptions = {
    chart: { 
        backgroundColor: "none", 
        renderTo: {}, 
        height: 180, 
        fontFamily: "Lato"
    },
    title: { style: { display: "none" } },
    subTitle: { style: { display: "none" } },
    rangeSelector: { enabled: false },
    navigator: { enabled: false },
    scrollbar: { enabled: false },
    tooltip: {
        enabled: false
    },
    credits: { enabled: false },
    exporting: { enabled: false },
  };
export function areaLineEstimateChartCard({ jsonData = null, paramName = '' }) {

    const surprisesLabelObj = []; //used to show below x axis
    const estimatedLabelObj = []; // used to show below x axis;
    const labels = {
        style: { color: "#202020" }
    };

    const marker = {
        lineWidth: 2,
        symbol: "circle",
    };

    const options = {
        legend: {enabled: false},
       
        xAxis: {
            tickLength: 0,

            labels: {
                ...labels,
            },
        },
        yAxis: {
            opposite: false,
            
            showLastLabel: true,
            title: {
                text: null,
            },
            labels: {
                ...labels,
            },
        },
        plotOptions: {
            line: {
                color: "#006aff", 
                marker: { 
                    enabled: true, 
                    lineColor: null,
                },
                dataLabels: {
                    allowOverlap: false,
                    zIndex: 3,
                    crop: false,

                    enabled: true,
                    padding: 0,
                    verticalAlign: 'top',
                    y: 10,
                    formatter: function () {
                        const { is_past, is_current } = this.point;
                        let avg = formatNumber(this.point.AVG, 1);
                        let surprice = (!is_past && !is_current) ? formatNumber(this.point.GROWTH, 1) : formatNumber(this.point.SURPRISES, 1);
                        return `<div><div class='mb-1'>${avg}</div><div class=${surprice > 0 ? 'text-success' : surprice < 0 ? 'text-danger' : 'text-neutral'}>${surprice != "-" ? `${surprice}%` : ''}</div></div>`;
                    },

                    style: {
                        color: '#555555',
                        fontFamily: "Lato",
                        textAlign: 'left'
                    },
                    useHTML: true
                }
            },
            arearange: {
                lineWidth: 0,
                color: "#006aff",
                fillOpacity: 0.1,
                zIndex: 0,
                states: { hover: { enabled: false } },
                events: {},
                marker: {
                    enabled: false
                }
            }
        },
        series: [],
    };

    const categories = [];

    let sortedData = [];

    if (Array.isArray(jsonData) && jsonData.length > 0) {
        sortedData = jsonData.sort(
            (a, b) => new Date(a.qtr_end_date) - new Date(b.qtr_end_date)
        );
    } else {
        options.legend.enabled = false;
    }

    const currObj = {
        name: "Actual " + paramName,
        data: [],
        type: "line",
        zIndex: 2,
        className: "current",
        marker: {
            ...marker,
        },
    };

    const estimateObj = {
        name: "Avg. Estimate",
        data: [],
        type: "line",
        zIndex: 2,
        className: "estimate",
        marker: {
            ...marker,
        },
    };

    const futureObj = {
        name: "Future Avg. Estimate",
        data: [],
        type: "line",
        zIndex: 2,
        className: "estimate",
        dashStyle: "shortdot",
        marker: {
            ...marker,
        },
        showInLegend: false,
    };

    const rangeObj = {
        name: "Range",
        data: [],
        type: "arearange",
        lineWidth: 0,
        linkedTo: ":previous",
        className: "range",
        zIndex: 1,
        marker: {
            enabled: false,
        },
        enableMouseTracking: false,
    };

    sortedData.forEach((obj, index) => {
        const currValue = obj.ACTUAL || obj.ACTUAL === 0 ? parseFloat(obj.ACTUAL) : null;
        const lowValue = obj.LOW || obj.LOW === 0 ? parseFloat(obj.LOW) : null;
        const highValue = obj.HIGH || obj.HIGH === 0 ? parseFloat(obj.HIGH) : null;
        const estimateValue = obj.AVG || obj.AVG === 0 ? parseFloat(obj.AVG) : null;

        const currDataObj = { y: currValue, ...obj };
        const estimateDataObj = { y: estimateValue, ...obj };

        rangeObj.data.push([lowValue, highValue]);

        if (obj.is_past) {
            currObj.data.push(currDataObj);
            if (obj.is_current) {
                estimateObj.data.push({ ...estimateDataObj, objType: 'avg' });
                futureObj.data.push({ ...estimateDataObj, objType: 'futureAvg' });
            } else {
                estimateObj.data.push({ ...estimateDataObj, objType: 'avg' });

                if (index < sortedData.length) {
                    const nextObj = sortedData[index + 1] || {};
                    if (!nextObj.is_past && nextObj.estimateValue != estimateDataObj.y) {
                        futureObj.data.push({ ...estimateDataObj, objType: 'futureAvg' });
                    } else {
                        futureObj.data.push({ y: null, ...obj });
                    }
                }

            }
            let color = obj.SURPRISES == 0 ? 'neutral' : obj.SURPRISES > 0 ? 'positive' : 'negative';
            surprisesLabelObj.push({value: obj.SURPRISES, color: color})
        } else {
            
            currObj.data.push({ y: null, ...obj });
            estimateObj.data.push({ y: null, ...obj });
            futureObj.data.push({ ...estimateDataObj, type: 'future', low: lowValue, high: highValue, ...obj });
            let color = obj.GROWTH == 0 ? 'neutral' : obj.GROWTH > 0 ? 'positive' : 'negative';
            estimatedLabelObj.push({value: obj.GROWTH, color: color})
        }

        const dateObj = new Date(obj.qtr_end_date);

        const month = dateObj.toLocaleString("default", { month: "short" });
        const year = dateObj.getFullYear();

        // categories.push(month.substr(0, 3) + " '" + String(year).substr(2));
        categories.push(obj.periodtype);
        
    });

    const isCurrObjNull = currObj.data.every(item => item == null);
    const isEstimateObjNull = estimateObj.data.every(item => item == null);
    const isFutureObjNull = futureObj.data.every(item => item == null);
    const isRangeObjNull = rangeObj.data.every(item => item == null);
   
    if (!isCurrObjNull) {
        options.series.push(currObj);
    }

    if (!isEstimateObjNull) {
        options.series.push(estimateObj);
    }

    if (!isFutureObjNull) {
        options.series.push(futureObj);
    }

    if (!isRangeObjNull) {
        options.series.push(rangeObj);
    }

    options.xAxis['categories'] = categories;
    const mergedChartOptions = $.extend(
        true,
        JSON.parse(JSON.stringify(defaultChartOptions)),
        options
    );

    return { mergedChartOptions, surprisesLabelObj, estimatedLabelObj };
}