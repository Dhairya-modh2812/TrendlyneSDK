import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ipoDetail: null,
  ipoListDetail: null,
  recentAll: null,
  recentMost: null,
  recentLeast: null,
  recentYear: null,
  upcomingIpo: null,
  ipoDashboardSearch:null,
};

export const IpoSlices = createSlice({
  name: "ipo",
  initialState: initialState,

  reducers: {
    ipoCompanyDetail: function (state, action) {
      state.ipoDetail = action.payload;
    },

    ipoListDetail: function (state, action) {
      state.ipoListDetail = action.payload;
    },

    recentAll: function (state, action) {
      state.recentAll = action.payload;
    },
    recentMost: function (state, action) {
      state.recentMost = action.payload;
    },
    recentLeast: function (state, action) {
      state.recentLeast = action.payload;
    },
    recentYear: function (state, action) {
      state.recentYear = action.payload;
    },
    upcomingIpo: function (state, action) {
      state.upcomingIpo = action.payload;
    },
    ipoDashboardSearch: function (state, action) {
      state.ipoDashboardSearch = action.payload;
    },
  },
});
