import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BarChartComponent } from "./charts/BarChartComponent";
import { PanelHeader } from "./PanelHeader";
import { Calculate } from "./Calculate";
import { Tabs } from "react-bootstrap";



export function Tab(props) {

    const {data} = props

    return (
        <>
            <div className="card_block_style_one">
                <div className="card_tab">
                    <Tabs defaultActiveKey="first">
                        <Tab eventKey="first" title="Revenue">                        
                             {data?.financials}                           
                        </Tab>
                        <Tab eventKey="second" title="Total Assets">
                            <BarChartComponent></BarChartComponent>
                        </Tab>
                        <Tab eventKey="third" title="Profit">
                            <BarChartComponent></BarChartComponent>
                        </Tab>
                    </Tabs>
                </div>
            </div>  
        </>
    );
}
