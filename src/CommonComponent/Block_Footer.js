import React, { useContext } from "react";
import { useSelector } from "react-redux";
import superstarContext from "../superstar_portfolio/app/context/superstar/superstarContext";
import { Breadcrumb } from "react-bootstrap";
import Logo from "../_assets/images/superstar_portfolio/TL-logomark.png"
import Logo2 from "../_assets/images/superstar_portfolio/TL_wordmark.png"
import './Block_Footer.scss'

export function Block_Footer(props) {

  return (
    <>
      <div className="page_footer">
          <div className="container">
            <div className="v_2">
              <p>Powered by</p>
              <a href="https://trendlyne.com/" target="_blank"><img
                      src={Logo2}
                      alt="Logo"
                    /></a>
            </div>
          </div>
      </div>
    </>
  );
}
