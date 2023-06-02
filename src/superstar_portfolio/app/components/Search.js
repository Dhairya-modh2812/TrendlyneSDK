import React, { useState } from "react";
import iconsearch from "../../../../src/_assets/images/superstar_portfolio/Search.svg";

export function Search(props) {
  const {
    onPageSearchInd,
    onPageSearchIns,
    onPageSearchFii,
    dataSearchInd,
    dataSearchIns,
    dataSearchFii,
    setSearchFlag,
    onPageSearchAll
  } = props;
  const AllUnfilteredDataInd = dataSearchInd;

  const handelFilter = (event) => {
    const searchName = event.target.value;

    const newFilterInd = dataSearchInd.filter((value) => {
      return value.Superstar_name.toLowerCase().includes(
        searchName.toLowerCase()
      );
    }).map(value=>({...value,customCategory:"Individual"}));

    const newFilterIns = dataSearchIns.filter((value) => {
      return value.Superstar_name.toLowerCase().includes(
        searchName.toLowerCase()
      );
    }).map(value=>({...value,customCategory:"institutional"}));
    const newFilterFii = dataSearchFii.filter((value) => {
      return value.Superstar_name.toLowerCase().includes(
        searchName.toLowerCase()
      );
    }).map(value=>({...value,customCategory:"FII"}));

    if (searchName === "") {
      onPageSearchInd(dataSearchInd);
      onPageSearchIns(dataSearchIns);
      onPageSearchFii(dataSearchFii);
      setSearchFlag(false)
    } else {
      onPageSearchInd(newFilterInd);
      onPageSearchIns(newFilterIns);
      onPageSearchFii(newFilterFii);
      onPageSearchAll([...newFilterInd, ...newFilterIns, ...newFilterFii]);
      setSearchFlag(true)
    }
  };

  return (
    <>
      <div className="searchbar">
        <img src={iconsearch} alt="" />
        <input type="text" placeholder="Search" onChange={handelFilter} />
      </div>
    </>
  );
}
