import React from "react";
import "toastify-js/src/toastify.css";
import { PortfolioHeader } from "../components/PortfolioHeader";
import { SuperstarTab } from "../components/SuperstarTab";

export default function Index() {
  return (
    <>
      <superstarState>
        <PortfolioHeader />
        <SuperstarTab />
      </superstarState>
    </>
  );
}
