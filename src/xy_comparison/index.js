import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as _redux from "../_redux";
import store from "../_redux/store";
import {Provider} from "react-redux";
import axios from "axios";
import ThemeSelector from '../_themes/ThemeSelector';
import { AppEnum } from '../_themes/enum';


const element = document.getElementById('xy-comparison');

const axiosExtraConfig = {
    viewType: element.dataset?.viewType
}

_redux.setupAxios(axios, store, axiosExtraConfig);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeSelector app={AppEnum.XY_COMPARISON} theme={element.dataset.theme}>
                <App 
                    poweredby={element.dataset.showPoweredBy}
                    baseUrl={element.dataset.baseUrl}
                    viewType={element.dataset.viewType}
                    defaultRedirect={element.dataset.defaultRedirect}
                />
            </ThemeSelector>
        </Provider>
    </React.StrictMode>,
    document.getElementById('xy-comparison')
);
