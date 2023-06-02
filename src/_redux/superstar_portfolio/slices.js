import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indiviualInvester: null,
  overviewDetails: null,
  qrtstring: null,
  bulkBlockDeals: null,
  insidedetails: null,
};

export const SuperstarSlices = createSlice({
  name: "super_star",
  initialState: initialState,
  reducers: {
    setInvester: function (state, action) {
      state.indiviualInvester = action.payload;
    },

     setQtrString: function (state, action) {
      state.qrtstring = action.payload;
    },

    setSuperstarPorfolioOverview: function (state, action) {
      state.overviewDetails = action.payload;
    },

    setBulkBlockDeals: function (state, action) {
      state.bulkBlockDeals = action.payload;
    },

    setInsiderDetails: function (state, action) {
      state.insidedetails = action.payload;
    },
  },
});
