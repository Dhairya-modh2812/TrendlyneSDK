import { SuperstarSlices } from "./slices";
import { CommonSlices, callTypes } from "../common/slices";
import * as requestFromServer from "./cruds";

const { actions } = SuperstarSlices;
const common_actions = CommonSlices.actions;

export const getInfoInversterList = (extraConfig) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getTopInvester(extraConfig).then((response) => {
    dispatch(actions.setInvester(response.data.body));
    dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data.body;
  });
};

export const getOverviewList = (id, extraConfig) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getOverviewDetails(id, extraConfig).then((response) => {
    dispatch(actions.setSuperstarPorfolioOverview(response.data.body));
    dispatch(actions.setQtrString(response.data.body.uiQuarterString));
    dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data.body;
  });
};

export const getBulkBlockList = (id, extraConfig) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getBulkBlockDeals(id, extraConfig).then((response) => {
    dispatch(actions.setBulkBlockDeals(response.data.body));
    dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data.body;
  });
};

export const getGroupBulkBlockList = (extraConfig) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));


  return requestFromServer.getGroupBulkBlockDeals(extraConfig).then((response) => {
    dispatch(actions.setBulkBlockDeals(response.data.body));
    dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data.body;
  });
};
export const getInsiderList = (id, extraConfig) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getInsiderDetails(id, extraConfig).then((response) => {
    dispatch(actions.setInsiderDetails(response.data.body));
    dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data.body;
  });
};
export const getGroupInsiderList = (extraConfig) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getGroupInsiderDetails(extraConfig).then((response) => {
    dispatch(actions.setInsiderDetails(response.data.body));
    dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data.body;
  });
};