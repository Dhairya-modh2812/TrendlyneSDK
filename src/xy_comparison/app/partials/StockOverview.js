import React from "react";
import crown_queen from "../../../_assets/images/xy_comparison/crown_queen.svg";
import winner from "../../../_assets/images/xy_comparison/winner.svg";
import Winnerx from "../../../_assets/images/xy_comparison/winnerx.svg"
import { WinnerIcon } from "../components/WinnerIcon";
import { IconVs } from "../components/IconVs";
import  stock_compare_bull from '../../../_assets/images/xy_comparison/stock_compare_bull.svg';

export function StockOverview({ comparison, stocks, firstStock, secondStock }) {

   const { overall_results = {} } = comparison || {};

   const renderWinnerIcon = (condition) => {
      return (
         condition ? <div className="win_block">
            <WinnerIcon></WinnerIcon>
            <p>winner</p>
         </div> : null
      )
   }

   return (<>
      {stocks &&
         <>
            <div className="desktop_only xy_comparison">
               <div className="row align-items-center xy_comparison_header">
                  <div className="col-md-3">
                     <div className="card x_card left_panel">
                        { renderWinnerIcon(overall_results[firstStock] > overall_results[secondStock]) }
                        <strong>{stocks[firstStock]?.currentPrice}</strong>
                        <div className="d-flex align-items-center">
                           <span className={`rectangle ${stocks[firstStock]?.dvm.dvm_data.dColor}`} />
                           <span className={`rectangle ${stocks[firstStock]?.dvm.dvm_data.vColor}`} />
                           <span className={`rectangle ${stocks[firstStock]?.dvm.dvm_data.mColor}`} />
                           <span className="mx-2 panel_title">{stocks[firstStock]?.dvm.dvm_classification_text}</span>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6 p-0">
                     <div className="row xy_comparison_heading align-items-center">
                        <div className="col">
                           <div className="x_text_color">
                              <a href={`/equity/${firstStock}/${stocks[firstStock]?.stockCode}/`}>{stocks[firstStock]?.name}</a>
                           </div>
                        </div>
                        <div className="col-md-1 p-0 vs_block">
                           <img src={stock_compare_bull}></img>
                        </div>
                        <div className="col">
                           <div className="y_text_color">
                              <a href={`/equity/${secondStock}/${stocks[secondStock]?.stockCode}/`}>{stocks[secondStock]?.name}</a>
                           </div>
                        </div>
                     </div>

                  </div>
                  <div className="col-md-3 right_content">
                     <div className="card y_card right_panel">
                        { renderWinnerIcon(overall_results[firstStock] < overall_results[secondStock]) }
                        <strong>{stocks[secondStock]?.currentPrice}</strong>
                        <div className="d-flex align-items-center">
                           <span className={`rectangle ${stocks[secondStock]?.dvm.dvm_data.dColor}`} />
                           <span className={`rectangle ${stocks[secondStock]?.dvm.dvm_data.vColor}`} />
                           <span className={`rectangle ${stocks[secondStock]?.dvm.dvm_data.mColor}`} />
                           <span className="mx-2 panel_title">{stocks[secondStock]?.dvm.dvm_classification_text}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="mobile_only">
               <div className="d-flex align-items-center justify-content-center flex-wrap">
                  <div className="card x_card p-4 mx-2 w-100 h-250px">
                     <div className="x_text_color">
                        <a href={`/equity/${firstStock}/${stocks[firstStock]?.stockCode}/`}>{stocks[firstStock]?.name}</a>   
                     </div>
                     <div className="d-flex justify-content-between">
                        { renderWinnerIcon(overall_results[firstStock] > overall_results[secondStock]) }
                        <strong>{stocks[firstStock]?.currentPrice}</strong>
                        <div className="d-flex flex-column">
                           <span className="d-flex justify-content-end">
                              <span className={`rectangle ${stocks[firstStock]?.dvm.dvm_data.dColor}`} />
                              <span className={`rectangle ${stocks[firstStock]?.dvm.dvm_data.vColor}`} />
                              <span className={`rectangle ${stocks[firstStock]?.dvm.dvm_data.mColor}`} />
                           </span>
                           <span className="d-flex justify-content-end">
                              {stocks[firstStock]?.dvm.dvm_classification_text}
                           </span>
                        </div>
                     </div>
                  </div>
                  <div className="my-3 d-flex align-items-center justify-content-center">
                     <img src={stock_compare_bull} className="stock-bull-svg" alt="icon_bull" />
                  </div>
                  <div className="card y_card p-4 mx-2 w-100 h-250px">
                     <h2 className="y_text_color">
                        <a href={`/equity/${secondStock}/${stocks[secondStock]?.stockCode}/`}>{stocks[secondStock]?.name}</a>
                     </h2>
                     <div className="d-flex justify-content-between">
                        { renderWinnerIcon(overall_results[firstStock] < overall_results[secondStock]) }
                        <strong>{stocks[secondStock]?.currentPrice}</strong>
                        <div className="d-flex flex-column">
                           <span className="d-flex justify-content-end">
                              <span className={`rectangle ${stocks[secondStock]?.dvm.dvm_data.dColor}`} />
                              <span className={`rectangle ${stocks[secondStock]?.dvm.dvm_data.vColor}`} />
                              <span className={`rectangle ${stocks[secondStock]?.dvm.dvm_data.mColor}`} />
                           </span>
                           <span className="d-flex justify-content-end">
                              {stocks[secondStock]?.dvm.dvm_classification_text}
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </>
      }
   </>
   )
}