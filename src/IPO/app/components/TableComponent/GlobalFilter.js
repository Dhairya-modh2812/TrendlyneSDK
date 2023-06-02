import React from "react";
import iconsearch from "../../../../_assets/images/superstar_portfolio/Search.svg";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <div className="form_group_table">
        <input
          placeholder="Search"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
        <img src={iconsearch} alt="" />
      </div>
    </span>
  );
};

export default GlobalFilter;
