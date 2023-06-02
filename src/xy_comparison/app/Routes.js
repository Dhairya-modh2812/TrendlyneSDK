import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import {ErrorPage} from "./components/ErrorPage";
import {HomeIndex} from "./HomeIndex";
import { Block_Footer } from "../../CommonComponent/Block_Footer";

export function Routes(props) {
    const {poweredby, defaultRedirect} = props
    return (
        <div className="page_content"> 
        <Switch>
            <Route path="/:first/:second/" component={HomeIndex}/>
            <Route path="/:first/:second/:third/" component={HomeIndex}/>
            { defaultRedirect ? 
                <Route exact path="/">
                    <Redirect to={defaultRedirect} />
                </Route> : <Route path="/" component={HomeIndex}/> 
            }
            <Route path="/error/" component={ErrorPage}/>
        </Switch>
        {poweredby == "true"? <Block_Footer></Block_Footer>:<></>}
        </div>
    );
}