import {CommonSlices} from "./slices";
import * as requestFromServer from "./cruds";

const {common_actions} = CommonSlices;

export const getInitials = () => dispatch => {
    dispatch(common_actions.startCall({}));

    return requestFromServer.getInitials()
        .then(response => {
            return response;
        });
};