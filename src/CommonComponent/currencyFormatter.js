import React, { useContext } from "react";
import { useSelector } from "react-redux";

export const currencyFormatter = (value, prefix = '$', isAbs = false, isStatic = true) => { 
  let stringValue = value.toString();
  // Remove last character if more than 2 decimals
  if (value.toString().split('.').length - 1 && stringValue.length - stringValue.indexOf('.') > 3) {
      stringValue = stringValue.slice(0, -1);
  }
  let valueFloat = parseFloat(stringValue.replace(/[^\d.-]/g, '')).toFixed(2);
  let valueAbs = Math.abs(valueFloat);
  // Add decimals if number is static
  if (isStatic) {
      valueAbs = valueAbs.toFixed(2);
  }
  if (isNaN(valueAbs)) return null;
  let string = prefix + valueAbs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // Add decimal dot
  let addDot = stringValue.split('.').length - 1 === 1 && stringValue.indexOf('.') === stringValue.length - 1;
  if (addDot) {
      string += '.';
  }
  if (!isAbs && valueFloat < 0) {
      string = '–' + string;
  }
  return string;
}
