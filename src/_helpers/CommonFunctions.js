import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { slugify } from "./Functional";
import PDF from "../_assets/images/IPO/pdf.svg"
import video from "../_assets/images/IPO/video.svg"

export const NumberDecimal=(value, number=1, returnType='default')=>{
    
    let returnValue = '';
    // if it's a number then apply toFixed on it
    if (!isNaN(Number(value))) {
        returnValue = Number(value).toFixed(number)
    } else if (returnType == 'number') {
        returnValue = 0
    }
    
    return returnValue;
}

/*
    
This function is used to join all paths with single slash then add a trailing slash at the end
(trailing slash/leading slash is optional in any url segment)

e.g.

joinURL(['https://127.0.0.1:8000/', '/client-api/']) // 'https://127.0.0.1:8000/client-api/'
joinURL(['/previous-url-part/', '/client-api/']) // 'previous-url-part/client-api/'

*/

export const joinURL = (paths, addLeadingSlash) => (addLeadingSlash ? '/' : '') + paths.map((path) => path.replace(/(^\/|\/$)/g, "")).join("/") + '/';



const nf = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1 });
export const shortnumFormatter = (num) => {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + ' K'; // convert to K for number from > 1000 < 1 million 
    }else if(num >= 1000000){
        num = (num/1000000).toFixed(1);
        num = nf.format(num)
        return num + ' M'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
}

export const numberWithComaSeperate = (num, decimalpoint=1) => {
    if (num == null){
        return "-"
    }

    let nf = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimalpoint });
     return  nf.format(num); // "1,234,567,890"
}

export const groupBy = (objectArray, property)  => {
    return objectArray.reduce((acc, obj) => {
       const key = obj[property];
       if (!acc[key]) {
          acc[key] = [];
       }
       // Add object to list for given key's value
       acc[key].push(obj);
       return acc;
    }, {});
 }

 export const dateFormatter = (date, format="DD MMM `YY") => {
     return date === null || date === undefined || date === "" || !moment(date).isValid() ? '-' :moment(date).format(format)
 }

 export const dateRender = (date, format="DD MMM `YY") => {    
    return <div className="table-right_content">
        {date === null || date === undefined || date === "" || !moment(date).isValid() ? '-' :moment(date).format(format)}
    </div>
}

export const companyName = (ipo) => {
    return <Link
        to={`/detail/${ipo.ipo_id}/${slugify(ipo.company_slug_name)}/`}
        alt={ipo.company_name}
        >
          {ipo.company_name}
        </Link>
}

export const numRender = (number) => {  
    return <div className="table-right_content">
        {number === null || number === undefined || number === "" ? '-' : NumberDecimal(number)}
    </div>
}



export const xRender = (text) => {  
    return <div className="table-right_content">
        {text === null || text === undefined || text === "" ? '-' :   NumberDecimal(text) + 'x' }
    </div>
}

export const dateSorting = (a, b) => {
    let a1 = new Date(a).getTime();
    let b1 = new Date(b).getTime();
    if (a1 < b1)
      return 1;
    else if (a1 > b1)
      return -1;
    else
      return 0;
}

export const rupeeRender = (rupee) => {  
    return <div className="table-right_content">
        {rupee === null || rupee === undefined || rupee === ""  ? '-' :  '₹ ' + rupee }
    </div>
}

export const croreRender = (crore) => {
    let croreVal = null;

    /* convert number to crore Ex:90000000.0 to 9 */
    if(crore !== null && crore !== undefined && croreVal !== ""){
        croreVal = crore/10000000;
    }

    return <div className="table-right_content">
        {croreVal  === null || croreVal == undefined || croreVal === "" ? '-' :   NumberDecimal(croreVal) + ' Cr' }
    </div>
}

export const percentRender = ( percent) => {     
    return <div className={`table-right_content ${percent!= null && percent > 0 ? 'positive' : percent!= null && percent <= 0 ? 'negative'  : ''}`}>
        {percent === null || percent === undefined || percent === "" ? '-' :    NumberDecimal(percent) + '%' }
    </div>
}

export const preIpo = (pre) => {
    return <div className="table-right_content">
        {pre === null || pre === undefined || pre === "" ? '-' :   '$ ' + pre + ' million' }
    </div>
}

export const issueSize = (text) => {
    let croreVal = null;

    /* convert number to crore Ex:90000000.0 to 9 */
    if(text !== null && text !== undefined && text !== ""){
        croreVal = text/10000000;
    }

    return  croreVal === null || croreVal === undefined || croreVal === "" ? '0' : (croreVal) + ' Cr';
}
export const gainPercent = (text) => {  
    return  text === null || text === undefined || text === "" ? '-' : (text) + ' %'   
}

// time formatter return valid time in format
export const timeFormatter = (date, time="HH:mmA") => {
    return date === null || date === undefined || date === "" || !moment(date).isValid() ? '-' :moment(date).format(time)
}

// pdf render use in ipo , popular news section
export const pdfRender = (pdf) => {
    if (pdf == null || pdf == undefined || pdf == "")
        return <></>;     
    else {
        return <div className="download">  <a target="_blank" href={pdf}>
             <img src={PDF} alt="PDF"/>PDF </a> 
            </div>
    }
}

// img render use in ipo , popular news section
export const imgRender = (url, imgurl) => {
    if (imgurl == null || imgurl == undefined || imgurl == "")
        return <></>;     
    else {
        return <a href={url}>
        <img
                src={imgurl}
                alt="blog2"
                className="w-100 blog_img"
            />
        </a>
    }
}

// video render use in ipo , popular news section
export const videoRender = (embedvideourl, onClick) => {
    if (embedvideourl == null || embedvideourl == undefined || embedvideourl == "")
        return <></>;     
    else {
        return <div className="video-_block">
        <img
            onClick={() => onClick(embedvideourl)}
            src={video}
            alt="video"
        />
    </div>
    }
}

export const triggerSummaryPopup = (stockInfo, externalView) => {
	if(!stockInfo) {
		stockInfo = {};
	}

    let externalConfigs = {};

    if (externalView && window.TLSuperstar) {
        externalConfigs = window.TLSuperstar.getConfigs();
    }

	if(externalConfigs.stockCallback && typeof(externalConfigs.stockCallback) === 'function') {
        let stockObj = {
            nseCode: stockInfo.NSEcode,
            bseCode: stockInfo.BSEcode,
            isin: stockInfo.ISIN,
            stockPk: stockInfo.stock_id,
        };

		externalConfigs.stockCallback(stockObj);
		return;
	}

	let summaryConfig = {};
	if(window.TLSuperstar) {
	    summaryConfig['theme'] = window.TLSuperstar.themeMode;
	}

    if (typeof TLSummary === "object" && TLSummary !== null && stockInfo?.NSEcode) {
        TLSummary?.triggerSummaryModal?.(undefined, undefined, undefined, undefined, undefined, undefined, undefined, stockInfo?.stock_id, summaryConfig);
    }
}

export const capitalize = str => {
    if (str === undefined || str === null) return str

    return str.charAt(0).toUpperCase() + str.slice(1)
}
