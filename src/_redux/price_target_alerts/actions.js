import {PriceTargetAlertsSlices} from "./slices";
import {CommonSlices, callTypes} from "../common/slices";
import * as requestFromServer from "./cruds";

const {actions} = PriceTargetAlertsSlices;
const common_actions = CommonSlices.actions;

export const searchStock = (extraConfig, keyword) => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.list}));

    return requestFromServer.searchStock(extraConfig, keyword)
        .then(response => {
            dispatch(actions.stocks(response.data.body));
            dispatch(common_actions.endCall({callType: callTypes.list}));
            return response.data.body;
        });
};

export const getPriceAlerts = (extraConfig) => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.list}));

    return requestFromServer.getPriceAlerts(extraConfig)
        .then(response => {
            dispatch(actions.price_alerts(response.data.body));
            dispatch(common_actions.endCall({callType: callTypes.list}));
            return response.data.body;
        });
};

export const setPriceAlert = (extraConfig, payload) => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.list}));

    return requestFromServer.setPriceAlert(extraConfig, payload)
        .then(response => {
            dispatch(common_actions.endCall({callType: callTypes.list}));
            return response.data.body;
        });
};

export const deletePriceAlert = (extraConfig,payload) => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.list}));

    return requestFromServer.deletePriceAlert(extraConfig,payload)
        .then(response => {
            dispatch(common_actions.endCall({callType: callTypes.list}));
            return response.data.body;
        });
};

export const getTriggeredAlerts = (extraConfig) => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.list}));

    return requestFromServer.getTriggeredAlerts(extraConfig)
        .then(response => {
            dispatch(actions.triggered_alerts(response.data.body));
            dispatch(common_actions.endCall({callType: callTypes.list}));
            return response.data.body;
        });
};