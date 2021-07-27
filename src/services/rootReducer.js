import { combineReducers } from "redux";
import companyReducer from './company/companyReducer';
import authReducer from './auth/authReducer';
const rootReducer = combineReducers({
    company: companyReducer,
    auth: authReducer
});

export default rootReducer;