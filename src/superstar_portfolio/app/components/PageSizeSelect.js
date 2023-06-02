import React, {  useContext } from "react";
import superstarContext from "../context/superstar/superstarContext";


export function PageSizeSelect(props) {
  
  const { pageSizeOptions = [], setCurrentPageSize } = useContext(superstarContext);

    return (
        <>         
         <div className="quantity">
              <select
                value={props.pageSize}
                onChange={(e) => {
                  props.setPageSize(parseInt(e.target.value));
                  setCurrentPageSize(parseInt(e.target.value));
                  props.setCurrentPage(1);
                }}
              >
                {pageSizeOptions.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
        </>
    );
}
