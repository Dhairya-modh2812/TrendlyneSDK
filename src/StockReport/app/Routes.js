import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import { Block_Footer } from "../../CommonComponent/Block_Footer";
import StockReportWrapper from "./StockReportWrapper";
export function Routes(props) {
    const { poweredby, defaultRedirect } = props;
    
    return (
        <> 
        <Switch>
            <Route path="/:code/" component={StockReportWrapper} />
            <Redirect from="/" to="/INFY/"/>
            <Redirect to="/error" />                 
        </Switch>
        {poweredby === "true"? <Block_Footer></Block_Footer>:<></>}
        </>
    );
}
