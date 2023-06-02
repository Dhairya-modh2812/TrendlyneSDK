import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    stocks: null,
    price_alerts: null,
    triggered_alerts: null
};

export const PriceTargetAlertsSlices = createSlice({
    name: 'price_target_alerts',
    initialState: initialState,
    reducers: {
        stocks: (state, action) => {
            state.stocks = action.payload.stockData;
        },

        price_alerts: (state, action) => {
            state.price_alerts = action.payload.price_alerts;
        },

        triggered_alerts: (state, action) => {
            state.triggered_alerts = action.payload.triggeredPriceAlerts;
        },

        clearStocks: (state, action) => {
            state.stocks = null;
        }
    }
});

export const {clearStocks} = PriceTargetAlertsSlices.actions;
