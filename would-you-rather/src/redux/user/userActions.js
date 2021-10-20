import * as type from "./userTypes";

export const getUserInfo = (info) => ({
    type: type.GET_USER_INFO,
    payload: info,
})