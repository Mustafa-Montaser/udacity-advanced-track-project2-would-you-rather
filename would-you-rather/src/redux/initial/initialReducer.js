import * as type from "./initialTypes";


const initialState = {
    isLogin: false, // login
    users: {},
    questions: {},
    isLoading: false,  // loading
}

const initialReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.LOGIN_STATE:
            return {
                ...state,
                isLogin: action.payload,
            }
        case type.GET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case type.GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
            }
        case type.LOADING_STATE:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state;
    }
}

export default initialReducer;