import React from "react";
import moment from "moment";

export const currencyFormatter = (data, minimumFractionDigits = 2) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: "INR",
      minimumFractionDigits: minimumFractionDigits
    });
    return formatter.format(data)
}

export const NumberWithSign = (number) => {
  return new Intl.NumberFormat('en-US', {
    signDisplay: 'exceptZero'
  }).format(number);
}
export const formatNumber = (number, format = 2) => {
  if (number) return (number).toFixed(format);
  return '-';
};

export const changeNumberFormat = (number, decimals, recursiveCall) => {
  const decimalPoints = decimals || 2;
  const noOfLakhs = number / 100000;
  let displayStr;
  let isPlural;

  // Rounds off digits to decimalPoints decimal places
  function roundOf(integer) {
      return +integer.toLocaleString(undefined,{
          minimumFractionDigits: decimalPoints,
          maximumFractionDigits: decimalPoints,
      });
  }

  if (noOfLakhs >= 1 && noOfLakhs <= 99) {
      const lakhs = roundOf(noOfLakhs);
      isPlural = lakhs > 1 && !recursiveCall;
      displayStr = `${lakhs} Lakh${isPlural ? 's' : ''}`;
  } else if (noOfLakhs >= 100) {
      const crores = roundOf(noOfLakhs / 100);
      const crorePrefix = crores >= 100000 ? changeNumberFormat(crores, decimals, true) : crores;
      isPlural = crores > 1 && !recursiveCall;
      displayStr = `${crorePrefix} Crore${isPlural ? 's' : ''}`;
  } else {
      displayStr = roundOf(+number);
  }

  return displayStr;
}

export const numberWithCommas = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
}
// check object is empty
export const isEmpty = (obj) => Object.keys(obj).length === 0;

export function convertToInternationalCurrencySystem (labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+12 ? (Math.abs(Number(labelValue)) / 1.0e+12).toFixed(1) + "T" : Math.abs(Number(labelValue)) >= 1.0e+9

  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1) + "B"
  // Six Zeroes for Millions 
  : Math.abs(Number(labelValue)) >= 1.0e+6

  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3

  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + "K"

  : Math.abs(Number(labelValue));

}

export const percentageRender = (per) => {
  if(per === null || per === "" || per === undefined) {
    return <>-</>
  }
  return per === 0 ? `${per}%` : `${per.toFixed(1)}%`
}

export const  dateFormatter = (date, format = "YYYY/MM/DD") => {
  if(date == null) {
    return '-'
  }
  return moment(date).isValid() ? moment(date).format(format) : "-";
}

// calculate the percentage of first number from second number
export const getPercentage = (first, second) => {
  if(second == 0) {
      return null;
  }
  let percentage = ((first - second) / Math.abs(second)) * 100;
  return percentage;
}

// check number is demical or whole number
export const checkNumber = (number, decimalPlace = 1) => {
  if(isNaN(number)) {
    return "-"
  }
  if((number % 1) != 0 ) {
    return number.toFixed(decimalPlace);
  }

  return number;
}

export const getDictionaryToList = (dictionary) => {
  let list = [];

  for(let key in dictionary) {
    // let dictionaryObj = {
    //   ...dictionary[key]
    // }

    // list.push(dictionaryObj);
    list.push(dictionary[key]);
  }

  return list;
}

// used to calculate position of progress bar values 
export const calculatePos = (low, high, num) => {
  let difference = 0;
  let value = 0;

  if (high && low) {
      difference = Math.abs(high - low);
  }

  if (num && difference) {
      value = (num - low) * 100 / difference;
  }

  return parseFloat(value.toFixed(2));

};