import React, {useContext} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ErrorPage } from "./components/ErrorPage";
import Portfolio from "./pages/Portfolio";
import TopNavbar from './components/TopNavbar';
import GroupInsider from "./pages/GroupInsider";
import GroupBulkBlockDeals from './pages/GroupBulkBlockDeals';
import { Block_Footer } from "../../CommonComponent/Block_Footer";
import superstarContext from "./context/superstar/superstarContext";
import TopInvestors from "./pages/TopInvestors";

export function Routes(props) {
  const {poweredby} = props;

  let { topNavbarInsiderToggle, topNavbarBulkBlockDealsToggle } = useContext(superstarContext);
  
  return (
    <div className="page_content">           
    <TopNavbar/>
    <Switch>
      <Route exact path="/superstar/:id/:name/:page/:hash" component={Portfolio} />
      <Route exact path="/superstar/:id/:name/:page" component={Portfolio} /> 
      <Route exact path="/superstar/:id/:name" component={Portfolio} />  
      {topNavbarInsiderToggle == "true" && <Route exact path="/group-insider-trading-sast/" component={GroupInsider} /> }
      {topNavbarInsiderToggle == "true" && <Route exact path="/group-insider-trading-sast/:hash" component={GroupInsider} /> }
      {topNavbarBulkBlockDealsToggle == "true" && <Route exact path="/bulk-block-deals/" component={GroupBulkBlockDeals} /> }
      {topNavbarBulkBlockDealsToggle == "true" && <Route exact path="/bulk-block-deals/:hash" component={GroupBulkBlockDeals} /> }
      <Route exact path="/" component={TopInvestors} />
      <Route exact path="/:hash" component={TopInvestors} />
      <Route path="/error" component={ErrorPage} />
      <Redirect to="/" />
    </Switch>       
    {poweredby == "true"? <Block_Footer></Block_Footer>:<></>}
    
    </div>
  );
}
