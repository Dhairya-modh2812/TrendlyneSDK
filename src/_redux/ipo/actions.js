import { IpoSlices } from "./slices";
import { CommonSlices, callTypes } from "../common/slices";
import * as requestFromServer from "./cruds";

const { actions } = IpoSlices;
const common_actions = CommonSlices.actions;

export const getInfoIpo = (id) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getIpoCompanyDetail(id).then((response) => {
    dispatch(actions.ipoCompanyDetail(response.data));
    // dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data;
  });
};


export const getInfoIpoList = (id) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getIpoList(id).then((response) => {
    dispatch(actions.ipoListDetail(response.data.body));
    // dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data.body;
  });
};

export const getDashboardsearch = (value) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getSearch(value).then((response) => {
    dispatch(actions.ipoDashboardSearch(response.data.body));
    // dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data.body;
  });
};

export const getrecentAll = () => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getRecent().then((response) => {
    dispatch(actions.recentAll(response.data.body));
    // dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data;
  });
};

export const getrecentMost = (pagenumber, pageSize) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getRecentMost(pagenumber, pageSize).then((response) => {
    dispatch(actions.recentMost(response.data.body));
    // dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data;
  });
};

export const getrecentLeast = (pagenumber, pageSize) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getRecentLeast(pagenumber, pageSize).then((response) => {
    dispatch(actions.recentLeast(response.data.body));
    // dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data;
  });
};

export const getrecentYear = (pagenumber, pageSize, year) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getRecentYear(pagenumber, pageSize, year).then((response) => {
    dispatch(actions.recentYear(response.data.body));
    // dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data;
  });
};

export const getUpcoming = () => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getUpcomingList().then((response) => {
    dispatch(actions.upcomingIpo(response.data.body));
    // dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data;
  });
};

export const getRecentByfilter = (filterType) => (dispatch) => {
  dispatch(common_actions.startCall({ callType: callTypes.list }));

  return requestFromServer.getRecentIpoByFilter(filterType).then((response) => {
    dispatch(actions.recentLeast(response.data.body));
    // dispatch(common_actions.endCall({ callType: callTypes.list }));
    return response.data;
  });
};
