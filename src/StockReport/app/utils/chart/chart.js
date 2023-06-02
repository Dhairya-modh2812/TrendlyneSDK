import { formatNumber } from "../commonFunctions";

export const gainerChart = () => {
  return {
    chart: {
      type: "column",
      height: 230,
    },
    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },

    xAxis: {
      categories: [],
      labels: {
        style: {
          fontSize: "13px",
          color: "#202020",
          fontWeight: "normal",
          lineHeight: "1.69",
          letterSpacing: "0.06px",
          fontFamily: "Lato,sans-serif",
        },
      },
    },
    yAxis: {
      title: {
        text: "Number of days traded at P/E",
      },
      labels: {
        // align: 'left',
        // x: 5,
        // y: -1,
        style: {
          fontSize: "13px",
          color: "#202020",
          fontWeight: "normal",
          lineHeight: "1.69",
          letterSpacing: "0.06px",
          fontFamily: "Lato,sans-serif",
        },
      },
    },
    series: [
      {
        data: [],
        borderRadius: 5,
      },
    ],
  };
};

export const stockChart = () => {
  return {
    chart: {
      height: 280,
    },
    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    rangeSelector: {
      enabled: false,
    },
    xAxis: [
      {
        crosshair: false,
        labels: {
          style: {
            textTransform: "uppercase",
            fontFamily: "'Lato', sans-serif",
            fontSize: 13,
            fontWeight: 400,
          },
        },
        dateTimeLabelFormats: {
          month: {
            main: "%b",
          },
        },
      },
    ],
    yAxis: [
      {
        opposite: false,
        height: "80%",
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          enabled: false,
        },
        top: "80%",
        height: "20%",

        title: {
          text: "",
        },
      },
    ],
    navigator: {
      enabled: false,
    },
    stockTools: {
      gui: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: false
    },
    scrollbar: {
      enabled: false,
    },
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    series: [
      {
        type: "spline",
        data: [],
        color: "#016AFF"
      },
      {
        type: "column",
        data: [],
        yAxis: 1,
        color: "#E5E5E5"
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
    },
  };
};

export const Chart = () => {
  return {
    chart: {
      type: "area",
      height: 280,
    },
    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: true,
    },
    title: {
      text: "",
    },
    xAxis: {
      title: {
        text: "",
      },
      labels: {
        text: "",
        enabled: false,
      },
      tickLength: 0,
      // categories: ["FY2014","FY2015","FY2016","FY2017","FY2018","FY2019"]
    },
    plotOptions: {
      area: {
        stacking: true,
        lineWidth: 0,
        shadow: false,
        marker: {
          enabled: false,
        },
        enableMouseTracking: false,
        showInLegend: false,
      },
      line: {
        zIndex: 5,
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: "line",
        name: "Actual",
        data: [1, 8, 2.5, 8],
        color: "#7f8899",
      },
      {
        type: "line",
        name: "High",
        data: [null, null, null, 8, 13, 14, 16],
        color: "#00a25b",
        dashStyle: "shortdot",
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, "#00a25b"],
            [1, "#FFFFFF"],
          ],
        },
      },
      {
        type: "line",
        name: "Low",
        data: [null, null, null, 8, 7, 6, 7],
        color: "#ff4f55",
        dashStyle: "shortdot",
      },
      {
        /* "id": "transparent", */
        name: "Mean Estimate",
        type: "line",
        data: [null, null, null, 8, 9, 10, 12],
        color: "#31a745",
        dashStyle: "shortdot",
        fillColor: {
          linearGradient: [0, 0, 0, 300],
          stops: [
            [0, "#00a25b"],
            [1, "#FFFFFF"],
          ],
        },
      },
      {
        fillColor: "#00a25b",
        data: [0, 0, 0, 0, 4, 4, 4],
        fillColor: {
          linearGradient: [0, 400, 800, 0],
          stops: [
            [0, "#00a25b"],
            [1, "#FFFFFF"],
          ],
        },
      },
      {
        fillColor: "#fc5a5a",
        data: [0, 0, 0, 0, 2, 4, 5],
        fillColor: {
          linearGradient: [0, 400, 800, 0],
          stops: [
            [0, "#fc5a5a"],
            [1, "#FFFFFF"],
          ],
        },
      },
      {
        id: "transparent",
        fillColor: "rgba(255,255,255,0)",
        data: [8, 8, 8, 8, 7, 6, 7],
      },
    ],
  };
};

export const multilineChart = () => {
  return {
    chart: {
      type: "line",
      height: 300,
    },

    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    navigator: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: "",
      },
    },

    xAxis: {
      title: {
        text: "",
      },
      accessibility: {
        description: "",
      },
      categories: [],
    },

    tooltip: {
      valueSuffix: "%",
      enabled: false,
    },

    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },

    series: [],
  };
};

export const SplineChart = () => {
  return {
    chart: {
      type: "spline",
      height: 250,
    },
    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    navigator: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: "",
      gridLineWidth: 0,
      minorGridLineWidth: 0,
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [],
  };
};

export const pieChart = () => {
  return {
    chart: {
      width: 200,
      height: 200,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      backgroundColor: "transparent",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    legend: {
      enabled: true,
    },
    tooltip: {
      formatter: function () {
        return (
          (this.point.type === "risk"
            ? ""
            : "<span>" + this.point.y + "% </span> <span>") +
          this.point.name +
          "</span>"
        );
      },
      followPointer: false,
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#fff",
      borderRadius: 5,
      shadow: {
        color: "rgb(93, 95, 131)",
        opacity: "0.1",
      },
      style: {
        fontSize: "10px",
        color: "#525252",
        fontFamily: "CeraPro-Bold",
      },
      outside: true,
      enabled: false,
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
          formatter: function () {
            return (
              "<span>" +
              this.point.name +
              "</span> <br>" +
              (this.point.type === "risk"
                ? ""
                : "<span>" + this.point.y + "% </span>")
            );
          },
          distance: -26,
          shared: true,
          useHTML: true,
          allowOverlap: true,
          style: {
            fontSize: "10px",
            fontFamily: "CeraPro-Bold",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            width: 20,
            color: "#202020",
          },
        },
      },
    },
    series: [
      {
        minPointSize: 40,
        innerSize: "70%",
        zMin: 0,
        name: "",
        data: [],
      },
    ],
  };
};

export const stackChart = () => {
  return {
    chart: {
      type: "bar",
      height: 120,
    },
    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    tooltip: {
      enabled: false,
    },
    xAxis: {
      tickLength: 0,
      tickColor: "transparent",
      labels: {
        enabled: false,
      },
      title: {
        text: "",
      },
    },
    yAxis: {
      visible: false,
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
    },
    legend: {
      reversed: true,
      symbolHeight: 14,
      symbolWidth: 14,
      symbolRadius: 2,
      style: {
        fontFamily: "Lato SemiBold",
      },
    },
    plotOptions: {
      series: {
        stacking: "bar",
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          useHTML: true,
          formatter: function () {
            if (this.y) {
              return this.y;
            }
          },
          style: {
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "Lato Semibold",
            color: "#fff",
          },
        },
      },
    },
    series: [],
  };
};

export const XRangeChart = () => {
  return {
    chart: {
      type: "xrange",
      height: 240,
    },
    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      tickLength: 0,
    },
    yAxis: {
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      title: {
        text: "",
      },
      categories: [],
      reversed: true,
      labels: {
        style: {
          fontFamily: "Lato Semibold",
          fontSize: "14px",
          fontWeight: "600",
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: "1.43",
          letterSpacing: "normal",
          textAlign: "right",
          color: "#666",
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        animation: false,
        dataLabels: {
          enabled: true,
        },
        // Set default connection options here
        connectors: {
          lineColor: "#666666",
          dashStyle: "dash", // Dash style for line
          lineWidth: 1, // Width of line
          type: "simpleConnect",
          startMarker: {
            align: "right",
            enabled: false,
            symbol: "line",
            verticalAlign: "bottom",
          },
          endMarker: {
            align: "left",
            verticalAlign: "top",
          },
        },
      },
    },
    series: [
      {
        name: "Project 1",
        borderColor: "transparent",
        pointWidth: 20,
        borderRadius: 0,
        data: [],
        dataLabels: {
          align: "center",
          formatter: function () {
            if (this.point.x2 - this.point.x)
              return `${this.point.x2 - this.point.x}`;
          },
          color: "#fff",
          useHTML: true,
          enabled: true,
        },
      },
    ],
  };
};
// X range data series for example
// {
//     x: 0,
//     x2: 6,
//     y: 0,
//     color: "#00A25B"
// }, {
//     x: 6,
//     x2: 8,
//     y: 0,
//     color: "#FC5A5A"
// }, {
//     x: 8,
//     x2: 11,
//     y: 1,
//       color: "#00A25B"
// }, {
//     x: 11,
//     x2: 12,
//     y: 1,
//     color: "#FC5A5A"
// }, {
//     x: 12,
//     x2: 13,
//     y: 2,
//     color: "#00A25B"
// },{
//     x: 13,
//     x2: 15,
//     y: 2,
//     color: "#FC5A5A"
// },{
//     x: 15,
//     x2: 16,
//     y: 3,
//     color: "#00A25B"
// },{
//     x: 16,
//     x2: 23,
//     y: 3,
//     color: "#FC5A5A"
// },{
//     x: 0,
//     x2: 11,
//     y: 4,
//     color: "#00A25B"
// },{
//     x: 11,
//     x2: 23,
//     y: 4,
//     color: "#FC5A5A"
// }

export const StepChart = () => {
  return {
    chart: {
      height: 275,
      marginRight: 70,
    },
    rangeSelector: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    exporting: { enabled: false },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false
    },
    navigator: {
      enabled: false,
    },
    title: {
      text: "",
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // do display the year
          year: '%Y'
      },
      title: {
          text: ''
      },
      /*tickInterval: 1*/
      tickPixelInterval: 50
    },
    yAxis: {
      title: {
        text: ''
      },
      min: 0,
      opposite: false
    },
    series: [
      {
        color: "#006aff",
        data: [],
        step: true,
      },
    ],
    tooltip: {
      enabled: false,
    },
  };
};

export const PeerChart = () => {
  return {
    chart: {
      type: "bar",
      height: 300,
    },
    title: {
      text: "",
    },

    xAxis: {
      categories: [],
      title: {
        text: null,
      },
      labels: {
        style: {
          fontSize: "14px",
          fontFamily: "Lato,sans-serif",
        },
      },
    },
    yAxis: {
      visible: true,
      gridLineDashStyle: "dash",
      title: {
        text: "",
      },
      labels: {
        enabled: true,
      },
    },
    tooltip: {
      enabled: false,
    },

    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        stacking: "bar",
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          useHTML: true,
          align: "left",
          x: 20,
          formatter: function () {
            if (this.y) {
              return formatNumber(this.y, 1);
            }
          },
          style: {
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "Lato Semibold",
            color: "#202020",
          },
        },
        states: {
          hover: {
              enabled: false
          }
        }
      },
    },
    series: [
      {
        color: "#E3E3E3",
        maxPointWidth: 32,
        pointWidth: 32,
        data: [],
      },
    ],
  };
};

export const FinancialChart = () => {
  return {
    chart: {
      type: "column",
      height: 175,
      backgroundColor: "transparent",
      padding: 0
    },
    title: {
      text: "",
    },
    tooltip: {
      enabled: false,
    },

    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: [],
      labels: {
        enabled: true,
        useHTML: true,
        style: {
          fontSize: "11px",
          lineHeight: "1.69",
          letterSpacing: "0.07px",
          textAlign: "center",
          color: "#202020",
          fontFamily: "Lato,sans-serif",
        },
      },
      gridLineWidth: 0,
      lineColor: "transparent",
      tickColor: "transparent",
    },
    yAxis: {
      visible: true,
      title: {
        text: null,
      },
      gridLineWidth: 0,
      plotLines: [
        {
          color: "#cac5c5",
          width: 0.5,
          value: 0,
        },
      ],
      labels: {
        enabled: true,
        style: {
          fontFamily: "Lato,sans-serif",
        }
      },
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        color: "#e6f0ff",
        negativeColor: "#fc5a5a33",
        positiveColor: "#016aff",
        maxPointWidth: 20,
        pointWidth: 20,
        states: {
          hover: {
              enabled: false
          }
        }
      },
    },
    series: [
      {
        data: [],
        borderRadius: 3,
        dataLabels: [{
          enabled: true,
          format: '{point.y:.1f}',
          style: {
            color: "#000000"
          }
        }]
      },
    ],
  };
};

export const peerTableColumnChart = () => {
  return {
    chart: {
      height: 50,
      width: 120,
      type: "column",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "datetime",
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: [],
      visible: false,
      tickPositions: null,
    },
    yAxis: {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false,
      },
      title: {
        text: null,
      },
      style: {
        fontSize: 11
      },
      tickPositions: [0],
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      series: {
        color: "#e6f0ff",
        animation: false,
        lineWidth: 1,
        shadow: false,
        states: {
          hover: {
              enabled: false
          }
        },
        marker: {
          radius: 1,
          states: {
            hover: {
              radius: 2,
            },
          },
        },
        fillOpacity: 0.25,
      },
      column: {
        pointWidth: 8,
        pointPadding: 0,
      },
    },
    drilldown: {
      animation: {
        duration: 0,
      },
    },
    series: [],
  };
};

export const sparklineChart = () => {
  return {
    chart: {
      borderColor: "#fff",
      type: 'line',
      margin: [0],
      width: 45,
      height: 20,
      spacingRight: 5,
      spacingLeft: 5
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    xAxis: {
      visible: false
    },
    yAxis: {
      visible: false
    },
    legend: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      series: {
        animation: false,
        lineWidth: 1,
        shadow: false,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        marker: {
          enabled: false,
          radius: 1,
          states: {
            hover: {
              radius: 2,
              enabled: false
            }
          }
        },
        fillOpacity: 0.25
      }
    },
    series: []
  };
}
