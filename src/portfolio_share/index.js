import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import * as _redux from "../_redux";
import store from "../_redux/store";
import {Provider} from "react-redux";
import axios from "axios";
import "./index.scss";

_redux.setupAxios(axios, store);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
