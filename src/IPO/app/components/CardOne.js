import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BarChartComponent } from "./charts/BarChartComponent";
import { PanelHeader } from "./PanelHeader";
import { Calculate } from "./Calculate";
import { Tab } from "./Tab";
import { CardTable } from "./CardTable";
import { Financials } from "./Financials";
import { SharesOffer } from "./SharesOffer";

export function CardOne(props) {

    const {data} = props   

    return (
        <>
            <div className="card_block_style_one">
                <div className="container">                    
                    <div className="row">
                        <div className="col-md-6">
                            <div className="IPO_left_panel">
                               <PanelHeader></PanelHeader>
                                <BarChartComponent></BarChartComponent>
                                <Calculate ></Calculate >
                                <CardTable></CardTable>  
                           </div>
                        </div>
                        <div className="col-md-6">
                                <div className="IPO_right_panel">
                                    <div className="IPO_right_panel_one card_border">   
                                    an                                                                     
                                    </div>
                                    <div className="IPO_right_panel_two card_border">
                                        <Financials
                                            data={data}
                                        >
                                        </Financials>              
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>                
            </div>  
        </>
    );
}
