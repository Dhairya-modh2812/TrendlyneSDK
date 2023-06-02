import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    headers: null,
    stocks: null,
    comparison: null,
    searched_stocks: null
};

export const XYComparison = createSlice({
    name: 'xy_comparison',
    initialState: initialState,
    reducers: {
        comparison: (state, action) => {
            if (action.payload) {
                state.headers = action.payload.headers;
                state.stocks = action.payload.stocks_overview;
                state.comparison = action.payload.comparison_data;
            }
        },

        stocks: (state, action) => {
            state.searched_stocks = action.payload.stockData;
        },

        clearSearchedStocks: (state, action) => {
            state.searched_stocks = null;
        }
    }
});

export const {clearSearchedStocks} = XYComparison.actions;
