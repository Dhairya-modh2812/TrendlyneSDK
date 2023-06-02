import React, {useEffect, useState} from "react";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import logo from "../../../_assets/images/portfolio_share/TL-logomark.png"

import average from "../../../_assets/images/portfolio_share/average.svg"
import highest from "../../../_assets/images/portfolio_share/highest.svg"
import multibagger from "../../../_assets/images/portfolio_share/multibagger.svg"
import lit from "../../../_assets/images/portfolio_share/lit.png"
import graph from "../../../_assets/images/portfolio_share/graph.png"

import { StockChart } from "../components/StockChart";
import { getBlobFromImageElement, copyBlobToClipboard } from 'copy-image-clipboard'


export default function PortfolioShareIndex() {
    const htmlToIma = () => {
      // var node = document.getElementById("img");
      // html2canvas(node).then(function (canvas) {
      //   document.body.appendChild(canvas);
      // });
      //var node = document.getElementById('my-node');
  
      //   htmlToImage
      //     .toPng(node)
      //     .then(function (dataUrl) {
      //       var img = new Image();
      //       img.src = dataUrl;
      //       document.body.appendChild(img);
      //     })
      //     .catch(function (error) {
      //       console.error("oops, something wents wrong!", error);
      //     });
      //

        var node = document.getElementById("img");
        htmlToImage.toBlob(node).then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          img.setAttribute('class', 'd-none');
          document.body.appendChild(img);
          img.focus();
          copyBlobToClipboard(dataUrl).then(function () {
            console.log('success');
          }).then(function () {
            console.log('Blob Copied');
          }).catch(function (e) {
            console.log('Error: ', e.message);
          });
        })
    };
    return (
      <div className="App">
        <div id="img">
          <div className="portfolio_share">
            <div className="header">
              <table>
                <tr>
                  <td>
                    <img src={logo} />
                  </td>
                  <td>
                    <h1>#monstergrowth</h1>
                  </td>
                  <td>
                    <p>Last 30 days</p>
                  </td>
                </tr>
              </table>
            </div>
            <div className="growth">
              <table>
                <tr>
                  <td>
                    <table className="sub_table">
                      <tr>
                        <img src={average} />
                        <h5>50 %</h5>
                        <p>Average Growth</p>
                      </tr>
                    </table>                                   
                  </td>
                  <td>                                        
                    <table className="sub_table">
                      <tr>
                        <img src={highest} />
                        <h5>187 %</h5>
                        <p>Highest Growth</p>
                      </tr>
                    </table> 
                  </td>
                  <td>                                       
                    <table className="sub_table">
                      <tr>
                      <img src={multibagger} />
                      <h5>1</h5>
                      <p>Multibagger</p>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <div className="section_content">
              <table>
                <tr>
                  <td>Your <img className="text_img" src={graph} /> is on <img  className="text_img" src={lit} /> today and its up by 114%. </td>
                </tr>
              </table>
            </div>
            <StockChart></StockChart>
          </div>
        </div>
        <button onClick={() => htmlToIma()}> html to img </button>
      </div>
    );
  }
