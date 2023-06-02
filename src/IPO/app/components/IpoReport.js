import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BarChartComponent } from "./charts/BarChartComponent";
import { Link } from "react-router-dom";
import PDF from "../../../_assets/images/IPO/pdf.svg"
import Arrow from "../../../_assets/images/IPO/btn_arrow.svg"
import moment from "moment";
import { dateRender, dateFormatter } from "../../../_helpers/CommonFunctions";

export function IpoReport(props) {

    const { data } = props

    if (data && data.length == 0){
        return <></>
    }

    return (
        <section>        
       
               
               <div className="IPO_report">
                <div className="container">
                    <div className="info_block">
                        <div className="info_heading"><h2>IPO Reports</h2></div>
                        <div className="block_content">
                            <div className="row">
                                {data?.map((item, index) => {
                                    return (                                       
                                        <div className="col-md-4"  key={index}>

                                            <div className="report_block">
                                                <div className="row">
                                                    <div className="col-md-8">
                                                        
                                                    {item[13] == null ?
                                                        ""
                                                        :
                                                        <label className="buy">{item[13]}
                                                        
                                                        </label>
                                                        }
                                                       

                                                    </div>
                                                    <div className="col-md-4">
                                                        {/* <div className="download">
                                                                <a href="{item[22]}">
                                                                    <img src={PDF} alt="Arrow" />PDFfgf
                                                                </a>
                                                            </div> */}
                                                        <div className="download">
                                                            <a target="_blank" className="btn_report" href={item[22]}>
                                                                <img src={PDF} alt="Arrow" />PDF
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p >
                                                    {item[15]} 

                                                    {item[16] == null ?
                                                        ""
                                                        :
                                                        <span className="bold">
                                                            | Target: {item[16]}
                                                        </span>
                                                }                                                                                                              

                                                        {item[19] == null ?
                                                        ""
                                                        :
                                                        <span className="bold">
                                                            | Target: {item[19]}
                                                        </span>
                                                    }
                                                </p>
                                                <span className="date">
                                                    {dateFormatter(item[14], 'DD MMM YYYY')}
                                                </span>
                                            </div>

                                        </div>                                       
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                </div>
                </div>
          
            
        </section>
    );
}