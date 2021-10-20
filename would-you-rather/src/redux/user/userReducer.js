import * as type from "./userTypes";

const initialState = {
    userInfo: {},
    // answeredQuestions: {},
    // unansweredQuestions: {},
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.GET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            }
        default:
            return state;
    }
}

export default userReducer;