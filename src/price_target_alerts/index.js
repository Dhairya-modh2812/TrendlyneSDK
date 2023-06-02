import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import * as _redux from "../_redux";
import store from "../_redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import "./index.scss";
import { AppEnum } from "../_themes/enum";
import ThemeSelector from "../_themes/ThemeSelector";

const targetElement = document.getElementById("root");


_redux.setupAxios(axios, store, { redirect: false });


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeSelector
                app={AppEnum.PRICE_TARGET_ALERTS}
                theme={targetElement.dataset.theme}
            >
                <App
                    searchStockUrl={targetElement.dataset.searchStock}
                    getPriceAlertUrl={targetElement.dataset.getPriceAlert}
                    postPriceAlertUrl={targetElement.dataset.postPriceAlert}
                    deletePriceAlertUrl={targetElement.dataset.deletePriceAlert}
                    triggeredBrokerPriceAlertUrl={
                        targetElement.dataset.triggeredBrokerPriceAlert
                    }
                    stockInfo={targetElement.dataset.stockInfo ? JSON.parse(targetElement.dataset.stockInfo) : {}}
                />
            </ThemeSelector>
        </Provider>
    </React.StrictMode>,
    targetElement
);
