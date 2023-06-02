import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    error: null,
    listLoading: false,
    actionsLoading: false,
};

export const callTypes = {
    list: "list",
    action: "action"
};

export const CommonSlices = createSlice({
    name: 'common',
    initialState: initialState,
    reducers: {
        startCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },

        endCall: (state, action) => {
            state.error = null;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },

        catchError: (state, action) => {
            state.error = action.payload.message;
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }
        },
    }
});

export const {startCall, endCall, catchError} = CommonSlices.actions;
