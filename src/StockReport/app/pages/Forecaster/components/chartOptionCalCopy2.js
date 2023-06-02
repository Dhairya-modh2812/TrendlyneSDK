import { formatNumber } from "../../../utils/commonFunctions";

// import { defaultChartOptions } from "./base";
const defaultChartOptions = {
    chart: { 
        backgroundColor: "none", 
        renderTo: {}, 
        height: 325, 
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
                states: { hover: { enabled: false } }
            },
            arearange: {
                lineWidth: 0,
                
                fillOpacity: 0.1,
                
                states: { hover: { enabled: false } },
                events: {},
                marker: {
                    enabled: false
                }
            },
            series: {
     
                shadow: false,
                dataLabels: {
                    enabled: true,
                  align: 'left',
                  verticalAlign: 'middle',
                  padding: 8,
                  allowOverlap: true,
                  overflow: 'allow',
                  crop: false,
                  formatter: function () {
                    let point = this.point, series = this.series;
                
                    if (series.data.length === point.index + 1) {
                        return this.y.toFixed(1);
                    } else {
                        return '';
                    }
                  }
                }
            },
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
        zIndex: 4,
        className: "current",
        marker: {
            ...marker,
        },
        enableMouseTracking: false
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
        enableMouseTracking: false
    };

    const futureObj = {
        name: "Future Avg. Estimate",
        data: [],
        type: "line",
        zIndex: 2,
        className: "estimate",
        dataLabels: {
            enabled: true
        },
        dashStyle: "longdash",
        lineWidth: 1,
        color: "#202020",
        marker: {
            ...marker,
        },
        showInLegend: false,
        enableMouseTracking: false
    };

    const rangeObj = {
        name: "High Estimate",
        data: [],
        type: "arearange",
        lineWidth: 1,
        dashStyle: 'longdash',
        lineColor: "#00a25b",
        color: "#ccecde",
        fillOpacity:1,
        linkedTo: ":previous",
        className: "range",
        zIndex: 1,
        marker: {
            enabled: true,
            fillColor: "#00a25b"
        },
        enableMouseTracking: false,
    };
    const lowRangeObj = {
        name: "Low Estimate",
        data: [],
        type: "arearange",
        lineWidth: 1,
        dashStyle: 'longdash',
        lineColor: "#fc5a5a",
        color: '#fedede',
        linkedTo: ":previous",
       
        zIndex: 1,
        fillOpacity: 1,
        marker: {
            enabled: true,
            fillColor: "#fc5a5a"
        },
        enableMouseTracking: false,
    };
    
    let lastIndex = sortedData.length - 1;
    sortedData.forEach((obj, index) => {
        const currValue = obj.AVG || obj.AVG === 0 ? parseFloat(obj.AVG) : null;
        const lowValue = obj.LOW || obj.LOW === 0 ? parseFloat(obj.LOW) : null;
        const highValue = obj.HIGH || obj.HIGH === 0 ? parseFloat(obj.HIGH) : null;
        const estimateValue = obj.AVG || obj.AVG === 0 ? parseFloat(obj.AVG) : null;

        const currDataObj = { y: currValue };
        const estimateDataObj = { y: estimateValue };

        

        if (obj.is_past) {
            currObj.data.push(currDataObj);
            if (obj.is_current) {
                estimateObj.data.push({ ...estimateDataObj, objType: 'avg' });
                futureObj.data.push({ ...estimateDataObj, objType: 'futureAvg' });
                rangeObj.data.push([obj.AVG, obj.AVG]);
                lowRangeObj.data.push([obj.AVG, obj.AVG])
            } else {
                estimateObj.data.push({ ...estimateDataObj, objType: 'avg' });
                rangeObj.data.push([null, null]);
                lowRangeObj.data.push([null, null]);
                if (index < sortedData.length) {
                    const nextObj = sortedData[index + 1] || {};
                    if (!nextObj.is_past && nextObj.estimateValue != estimateDataObj.y) {
                        futureObj.data.push({ ...estimateDataObj, objType: 'futureAvg' });
                    } else {
                        futureObj.data.push({ y: null });
                    }
                }

            }
            
        } else {
            rangeObj.data.push([estimateValue, highValue]);
            lowRangeObj.data.push([lowValue, estimateValue])
            
            currObj.data.push({ y: null });
            estimateObj.data.push({ y: null });
            futureObj.data.push({ ...estimateDataObj, type: 'future', low: lowValue, high: highValue });
            
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
    const isLowRangeObjNull = lowRangeObj.data.every(item => item == null);
  
    if (!isCurrObjNull) {
        options.series.push(currObj);
    }

    // if (!isEstimateObjNull) {
    //     options.series.push(estimateObj);
    // }

    if (!isFutureObjNull) {
        options.series.push(futureObj);
    }

    if (!isRangeObjNull) {
        options.series.push(rangeObj);
    }
    if (!isLowRangeObjNull) {
        options.series.push(lowRangeObj);
    }

    options.xAxis['categories'] = categories;
    const mergedChartOptions = $.extend(
        true,
        JSON.parse(JSON.stringify(defaultChartOptions)),
        options
    );

    return { mergedChartOptions, surprisesLabelObj, estimatedLabelObj };
}