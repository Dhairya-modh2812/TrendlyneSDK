import React, { useState, useEffect } from "react";
import { Investors } from "./Investors";
import Pagination from "./TableComponent/Pagination";
import withSizes from 'react-sizes';


export function Breadcrumb(props) {
  
  const selectOptions = props.isMobile?[6, 25, 50, 75, 100]:[15, 25, 50, 75, 100];

    return (
        <>         
         <div className="quantity">
              <select
                onChange={(e) => {
                  props.setPageSize(parseInt(e.target.value));
                  props.setCurrentPage(1);
                }}
              >
                {selectOptions.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
        </>
    );
}
