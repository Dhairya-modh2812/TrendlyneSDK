import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    category_screeners: null,
    active_watchlist_alert: null,
    list_of_watchlist: null
};

export const AlphaAlertsSlices = createSlice({
    name: 'alpha_alerts',
    initialState: initialState,
    reducers: {
        triggered: (state, action) => {
            state.screens = action.payload.screen_data;
            state.stocks = action.payload.stock_data;
            state.triggered_alerts = action.payload.triggered_data;
        },

        configurations: (state, action) => {
            state.category_screeners = action.payload.config_json.CATEGORY_SCREENERS;
            state.active_watchlist_alert = action.payload.active_watchlist_alert;
            state.list_of_watchlist = action.payload.list_of_watchlist;
        },
    }
});
