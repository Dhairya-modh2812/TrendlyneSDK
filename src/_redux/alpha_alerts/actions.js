import {AlphaAlertsSlices} from "./slices";
import {CommonSlices, callTypes} from "../common/slices";
import * as requestFromServer from "./cruds";

const {actions} = AlphaAlertsSlices;
const common_actions = CommonSlices.actions;

export const getTriggeredAlphaAlerts = () => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.list}));

    return requestFromServer.getTriggeredAlphaAlerts()
        .then(response => {
            dispatch(actions.triggered(response.data.body));
            dispatch(common_actions.endCall({callType: callTypes.list}));
            return response.data.body;
        });
};

export const getAlphaAlertConfigurations = () => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.list}));

    return requestFromServer.getAlphaAlertConfigurations()
        .then(response => {
            dispatch(actions.configurations(response.data.body));
            dispatch(common_actions.endCall({callType: callTypes.list}));
            return response.data.body;
        });
};

export const addAlphaAlert = (screen_pk, selected_watch_list) => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.action}));

    return requestFromServer.addAlphaAlert(screen_pk, selected_watch_list)
        .then(response => {
            dispatch(common_actions.endCall({callType: callTypes.action}));
            return response.data.body;
        });
};

export const deleteAlphaAlert = (screen_pk, selected_watch_list) => dispatch => {
    dispatch(common_actions.startCall({callType: callTypes.action}));

    return requestFromServer.deleteAlphaAlert(screen_pk, selected_watch_list)
        .then(response => {
            dispatch(common_actions.endCall({callType: callTypes.action}));
            return response.data.body;
        });
};