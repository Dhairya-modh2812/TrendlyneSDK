import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import {ErrorPage} from "./components/ErrorPage";
import PriceTargetAlertIndex from "./pages";

export function Routes(props) {
    return (
        <Switch>
            <Route path="/" component={() => <PriceTargetAlertIndex {...props}/>}/>
            <Route path="/error" component={ErrorPage}/>
            <Redirect to='/error'/>
        </Switch>
    );
}
