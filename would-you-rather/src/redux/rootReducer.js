import { combineReducers } from "redux";
import initialReducer from "./initial/initialReducer";
import userReducer from "./user/userReducer"

const rootReducer = combineReducers({
    initial: initialReducer,
    user: userReducer,
});

export default rootReducer;