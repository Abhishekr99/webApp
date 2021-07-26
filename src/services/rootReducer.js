import { combineReducers } from "redux";
import companyReducer from './company/companyReducer';

const rootReducer = combineReducers({
    company: companyReducer
});

export default rootReducer;