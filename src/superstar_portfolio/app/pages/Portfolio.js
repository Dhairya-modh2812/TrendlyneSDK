import React, { useEffect, useContext } from "react";
import { SuperstarTab } from "../components/SuperstarTab";
import { PortfolioHeader } from "../components/PortfolioHeader";
import superstarContext from "../context/superstar/superstarContext";

export default function Portfolio(props) {

  const { superstarName } = useContext(superstarContext);

  useEffect(() => {
  window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (superstarName) {
        document.title = 'Superstar ' + superstarName + ' Portfolio'
    }
      }, [superstarName])

  return (
    <>
      <div className="page_content">
        <PortfolioHeader />
        <SuperstarTab />
      </div>
    </>
  );
}
