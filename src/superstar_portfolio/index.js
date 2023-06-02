import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as _redux from "../_redux";
import store from "../_redux/store";
import {Provider} from "react-redux";
import axios from "axios";
import ThemeSelector from '../_themes/ThemeSelector';
import { AppEnum } from '../_themes/enum';

_redux.setupAxios(axios, store);

const element = document.getElementById('superstar-portfolio');

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>    
            <ThemeSelector app={AppEnum.SUPERSTAR_PORTFOLIO} theme={element.dataset.theme}>
                <App 
                    baseUrl={element.dataset.baseUrl} 
                    poweredby={element.dataset.showPoweredBy} 
                    externalView={element.dataset.externalView}
                    superstarIndexUrl={element.dataset.superstarIndexUrl}
                    superstarPortfolioUrl={element.dataset.superstarPortfolioUrl}
                    superstarBulkBlockDealsUrl={element.dataset.superstarBulkBlockDealsUrl}
                    superstarInsiderTradingSastUrl={element.dataset.superstarInsiderTradingSastUrl}
                    corsKey={element.dataset.key}
                    superstarGroupBulkBlockDealsUrl={element.dataset.superstarGroupBulkBlockDealsUrl}
                    superstarGroupInsiderTradingSastUrl={element.dataset.superstarGroupInsiderTradingSastUrl}
                    topNavbarToggle={element.dataset.topNavbarToggle}
                    topNavbarInsiderToggle={element.dataset.topNavbarInsiderToggle}
                    topNavbarBulkBlockDealsToggle={element.dataset.topNavbarBulkBlockDealsToggle}
                    topInvesterCurrentPage={element.dataset.topInvesterCurrentPage}
                    topInvesterCurrentCount={element.dataset.topInvesterCurrentCount}
                    viewType={element.dataset.viewType}
                />
            </ThemeSelector>
        </Provider>
    </React.StrictMode>,
    element
);
