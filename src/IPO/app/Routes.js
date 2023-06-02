import React from "react";
import {Redirect, Route, Switch} from 'react-router-dom';
import {ErrorPage} from "./components/ErrorPage";
import {IPODetail} from "./IPODetail";
import {IPO} from "./IPO";
import { RecentIpo } from "./RecentIpo";
import { Block_Footer } from "../../CommonComponent/Block_Footer";
import { UpComing } from "./UpComing";
export function Routes(props) {
    const { poweredby, defaultRedirect } = props;
    
    return (
        <div className="page_content"> 
        <Switch>
            <Route exact path="/screener/" component={RecentIpo}/> 
            <Route exact path="/screener/:filterType/" component={RecentIpo}/> 
            <Route path="/upcoming/" component={UpComing}/> 
            <Route path="/detail/:id/:name/" component={IPODetail}/>   
            { defaultRedirect ? 
                <Route exact path="/dashboard/">
                    <Redirect to={defaultRedirect} />
                </Route> : <Route path="/dashboard/" component={IPO}/> 
            }
            <Route path="/error" component={ErrorPage} />
            <Redirect to="/error" />                 
        </Switch>
        {poweredby == "true"? <Block_Footer></Block_Footer>:<></>}
        </div>
    );
}
