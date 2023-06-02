import { gainerChart } from "../../../utils/chart/chart";
import moment from "moment";
import { formatNumber, isEmpty } from "../../../utils/commonFunctions";

const colors = {
    FII: "#13bdd1",
    DII: "#3e54af",
    Promoter: "#9c2ea9",
    Public: "#fec542",
    default: "#ff9633",
    "Pledges as % of promoter shares (%)": "#fe6d64",
    "Locked as % of promoter shares (%)": "#fec05c"
}
const barChartName = ['Promoter', "MF", "DII", "FII"];
const PledgeChartName = ["Pledges as % of promoter shares (%)", "Locked as % of promoter shares (%)"]

export function calculateShareholderLineChart(shareholdingData) {
   
    const { barChartData, barChartData: { chartdata } } = shareholdingData;

    let barChart = {};
    let categories = [];
    let PledgesChart = {};
    let Pledgescategories = [];
    let lockedChart = {};
    let lockedCategories = [];
    Object.keys(barChartData.chartdata).forEach(key => {
        let data = [];
        let name = '';
        let Plname = '';
        let PlData = [];
        let lockedName = '';
        let lockedData = [];
        chartdata[key].forEach((value, index) => {
            if (index != 0) {
                data.unshift(value[1]);
                name = key;

                if (!categories.includes(value[0])) {
                    categories.unshift(value[0])
                }
            }
            if (key === "Promoter") {

                if (value.length > 3) {
                    if (index == 0) {
                        Plname = value[3];
                    }
                    if (index != 0) {
                        PlData.unshift(value[3]);
                    }


                    if (!Pledgescategories.includes(value[3])) {
                        Pledgescategories.unshift(value[3])
                    }
                }
                if (value.length > 5) {
                    if (index == 0) {
                        lockedName = value[5];
                    }
                    if (index != 0) {
                        lockedData.unshift(value[5]);
                    }


                    if (!lockedCategories.includes(value[5])) {
                        lockedCategories.unshift(value[5])
                    }
                }

            }
        });

        if (barChartName.includes(name)) {
            barChart[name] = {
                name: name,
                data: data,
                color: colors[name] ? colors[name] : colors.default
            }
        }
        if (PledgeChartName.includes(Plname)) {
            PledgesChart[Plname] = {
                name: Plname,
                data: PlData,
                color: colors[Plname] ? colors[Plname] : colors.default
            }
        }
        if (PledgeChartName.includes(lockedName)) {
            PledgesChart[lockedName] = {
                name: lockedName,
                data: lockedData,
                color: colors[lockedName] ? colors[lockedName] : colors.default
            }
        }

    })

    let newSeries = [];
    let pledgeSeries = [];
    if (barChart['Promoter']) {
        newSeries = [...newSeries, barChart["Promoter"]]
    }
    if (PledgesChart["Pledges as % of promoter shares (%)"]) {
        newSeries = [...newSeries, PledgesChart["Pledges as % of promoter shares (%)"]]
    }
    if (PledgesChart["Locked as % of promoter shares (%)"]) {
        newSeries = [...newSeries, PledgesChart["Locked as % of promoter shares (%)"]]
    }
    if (barChart['FII']) {
        newSeries = [...newSeries, barChart["FII"]]
    }
    if (barChart['DII']) {
        newSeries = [...newSeries, barChart["DII"]]
    }
    
    let columnOptions = { categories: [...categories, ...Pledgescategories], series: [...newSeries, ...pledgeSeries] };
   
    return columnOptions;
}

export const mfChartCalculation = (chart_data_total_holdings) => {
    let gainChartOption = gainerChart();
    let holders = {
        name: "Net Holders",
        color: "#3e54af",
        data: []
    }
    let bought = {
        name: "Bought some / all",
        color: "#e81d61",
        data: []
    }
    let sold = {
        name: "Sold some / all",
        color: "#006aff",
        data: []
    };
    let cat = [];
    
    chart_data_total_holdings && chart_data_total_holdings.forEach(value => {
        cat.push(value.date)
        holders = {
            ...holders,
            data: [...holders.data, value?.holders != undefined ? value?.holders : null]
        }
        bought = {
            ...bought,
            data: [...bought.data, value?.buyers != undefined ? value?.buyers : null]
        }
        sold = {
            ...sold,
            data: [...sold.data, value?.sellers != undefined ? value?.sellers : null]
        }
        return
    });

    gainChartOption = {
        ...gainChartOption,
        chart: {
            ...gainChartOption.chart,
            height: 300,
            backgroundColor: 'transparent',
            type: 'line'
        },

        legend: {
            ...gainChartOption.legend,
            enabled: true,
            
            symbolHeight: 14,
            symbolWidth: 14,
            symbolRadius: 2,
            style: {
                fontFamily: "Lato SemiBold",
            },
        },
        tooltip: {
            enabled: false
        },
        xAxis: {
            ...gainChartOption.xAxis,
            gridLineWidth: 0,
            lineColor: 'transparent',
            tickColor: 'transparent',
            labels: {
                format: "{value:%b %e}"
            },
            type: "datetime",
            categories: [...cat]
        },
        yAxis: {
            ...gainChartOption.yAxis,
            gridLineDashStyle: "dash",
            visible: true,
            offset: 5,
            title: {
                text: null
            },
            
            plotLines: [{
                color: '#cfd4dc',
                width: .5,
                value: 0
            }],
            min: 0
        },
        plotOptions: {
            ...gainChartOption.plotOptions,
            series: {
                borderWidth: 0,
                borderRadius: 3,
                color: "#0369ff33",
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return formatNumber(this.y,1)
                    }
                }
            }
        },
        series: [{
            ...holders
        }, {
            ...bought
        }, {
            ...sold
        }]
    }
    return gainChartOption;
}

export const getMajorShareholders = (shareholdingData) => {
    let superStarTable = {
        title: "Superstar",
        data: []
    }
    let fiiTableData = {
        title: "FII",
        data: []
    }
    let diiTableData = {
        title: "DII",
        data: []
    }
    let promotorTableData = {
        title: "Promoters",
        data: []
    }
    let latestDate;
    if (!isEmpty(shareholdingData?.detailedHoldings)) {
        latestDate = shareholdingData?.barChartData?.latestDate;
        let latestDateStr = moment(latestDate).format('DD-MMM-YYYY').toString();
        let superStar = shareholdingData?.detailedHoldings[latestDateStr] ? [...shareholdingData?.detailedHoldings[latestDateStr]?.publicNonInstitutionalHolding] : [];
        let fiiTable = shareholdingData?.detailedHoldings[latestDateStr] ? [...shareholdingData?.detailedHoldings[latestDateStr]?.FIIHolding] : [];
        let diiTable = shareholdingData?.detailedHoldings[latestDateStr] ? [...shareholdingData?.detailedHoldings[latestDateStr]?.DIIHolding] : [];
        let promoterTable = shareholdingData?.detailedHoldings[latestDateStr] ?[...shareholdingData?.detailedHoldings[latestDateStr]?.promoterHolding] : [] ;
        superStarTable = { ...superStarTable, data: superStar };
        fiiTableData = { ...fiiTableData, data: fiiTable };
        diiTableData = { ...diiTableData, data: diiTable };
        promotorTableData = { ...promotorTableData, data: promoterTable };
    }

    return {    
        superStarTable, fiiTableData, diiTableData, promotorTableData, latestDate
    }
}