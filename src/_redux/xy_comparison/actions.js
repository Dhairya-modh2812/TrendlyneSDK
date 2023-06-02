import {XYComparison} from "./slices";
import {CommonSlices, callTypes} from "../common/slices";
import * as requestFromServer from "./cruds";

const {actions} = XYComparison;
const common_actions = CommonSlices.actions;

export const getComparison = (stock_1, stock_2) => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.list}));

    return requestFromServer.getComparison(stock_1, stock_2)
        .then(response => {
            dispatch(actions.comparison(response.data.body));
            dispatch(common_actions.endCall({callType: callTypes.list}));
            return response.data.body;
        });
};

export const searchStock = (keyword) => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.list}));

    return requestFromServer.searchStock(keyword)
        .then(response => {
            // redux store accesses "stockData" key, so building an object with the "stockData" key.
            const res = {
                "stockData": response.data
            }
            dispatch(actions.stocks(res));
            dispatch(common_actions.endCall({callType: callTypes.list}));
            return response.data.body;
        });
};