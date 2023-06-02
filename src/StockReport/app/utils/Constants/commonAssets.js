import React from 'react';
// import iconStockBlue from '../../assets/images/icon-stock-report-blue.svg';
import iconStockBlue from '../../../../_assets/images/stockreport/icon-stock-report-blue.svg';
import iconStockGreen from '../../../../_assets/images/stockreport/icon-stock-report-green.svg';
import iconStockRed from '../../../../_assets/images/stockreport/icon-stock-report-red.svg';
import iconStockYellow from '../../../../_assets/images/stockreport/icon-stock-report-yellow.svg';
import iconDownArrow from '../../../../_assets/images/stockreport/down-arrow-up.svg';
import combinedImage from '../../../../_assets/images/stockreport/combined-shape.svg';
import combinedIndicator from '../../../../_assets/images/stockreport/combine-indicator.svg';
import downArrowDanger from '../../../../_assets/images/stockreport/down-arrow-danger.svg';
import rightArrowWarning from '../../../../_assets/images/stockreport/right-arrow-warning.svg';
import positiveChart from '../../../../_assets/images/stockreport/positive-chart.svg';
import negativeChart from '../../../../_assets/images/stockreport/negative-chart.svg';
import neutralChart from '../../../../_assets/images/stockreport/neutral-chart.svg';
import iconUpGreen from '../../../../_assets/images/stockreport/icon-arrow-up-green.svg';
import companyLogo from '../../../../_assets/images/stockreport/company-logo.png';
import kallidus from '../../../../_assets/images/stockreport/kallidus.png';
import infosys from '../../../../_assets/images/stockreport/infosys.png';
import nauh from '../../../../_assets/images/stockreport/nauh.png';
import panaya from '../../../../_assets/images/stockreport/panaya.png';
import edge from '../../../../_assets/images/stockreport/edge.png';
import ruler from '../../../../_assets/images/stockreport/ruler.png';
// import positive from '../../../../_assets/images/stockreport/positive.svg';
// import negative from '../../../../_assets/images/stockreport/negative.svg';
// import neutral from '../../../../_assets/images/stockreport/neutral.svg';
// export const getKeyStatistics = (name) => {
//     if (name == "positive")
//         return positive;
//     if (name == "neutral")
//         return neutral;
//     if (name == "negative")
//         return negative;
// };

export {
    iconDownArrow, iconStockBlue, iconStockGreen, iconStockRed, iconStockYellow, combinedImage, combinedIndicator, downArrowDanger,
    rightArrowWarning, positiveChart, negativeChart, neutralChart, iconUpGreen, companyLogo, kallidus, panaya, infosys,nauh,edge, ruler,
    DownArrow, UpArrow, BothSideArrow, PolygonUpArrow, PolygonDownArrow, PolygonBothArrow
};

export const getTrendInsightArrow = (value) => {
    let obj = {
        neutral: <BothSideArrow />,
        positive: <UpArrow />,
        negative: <DownArrow />
    }
    return obj[value];
}

const  DownArrow = () => {
    return (<svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.124 11.71 1 8.7l.668-.63 1.99 1.919V1h.93v8.988L6.58 8.07l.668.63-3.123 3.01z" fill="#fc5a5a" stroke="#fc5a5a" strokeWidth=".533"/>
    </svg>)
}

const  UpArrow = () => {
    return (<svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.124 1 1 4.01l.668.63 1.99-1.918v8.988h.93V2.722L6.58 4.64l.668-.63L4.124 1z" fill="#00a25b" stroke="#00a25b" strokeWidth=".533"/>
    </svg>)
}

const BothSideArrow = () => {
    return (<svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m1 4.122 3.01 3.124.63-.668-1.918-1.99h8.988v-.93H2.722L4.64 1.666 4.01.999 1 4.122z" fill="#ff9633" stroke="#ff9633" strokeWidth=".533"/>
        <path d="M13.71 4.124 10.7 1l-.63.668 1.918 1.99H3v.93h8.988L10.07 6.58l.63.668 3.01-3.123z" fill="#ff9633" stroke="#ff9633" strokeWidth=".533"/>
    </svg>)
}

const PolygonUpArrow = () => {
    return (<svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m4.5 0 3.897 6.75H.603L4.5 0z" fill="#00A25B"/>
    </svg>)
}
const PolygonDownArrow = () => {
    return (<svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 7 8.397.25H.603L4.5 7z" fill="#FC5A5A"/>
    </svg>)
}

const PolygonBothArrow = () => {
    return (<svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 4.5 6.75.603v7.794L0 4.5zM15.001 4.5 8.251.603v7.794l6.75-3.897z" fill="#FF9633"/>
    </svg>)
}