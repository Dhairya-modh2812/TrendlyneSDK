import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import {ErrorPage} from "./components/ErrorPage";
import AlphaAlertIndex from "./pages";
import { Block_Footer } from "../../CommonComponent/Block_Footer";

export function Routes(props) {
    const {poweredby} = props
    return (
        <div className="page_content"> 
        <Switch>
            <Route path="/" component={AlphaAlertIndex}/>
            <Route path="/error" component={ErrorPage}/>
            <Redirect to='/error'/>
        </Switch>
        {poweredby == "true"? <Block_Footer></Block_Footer>:<></>}
        </div>
        
    );
}
