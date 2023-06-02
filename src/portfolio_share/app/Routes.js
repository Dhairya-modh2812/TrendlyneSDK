import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import {ErrorPage} from "./components/ErrorPage";
import AlphaAlertIndex from "./pages";

export function Routes() {
    return (
        <Switch>
            <Route path="/" component={AlphaAlertIndex}/>
            <Route path="/error" component={ErrorPage}/>
            <Redirect to='/error'/>
        </Switch>
    );
}
