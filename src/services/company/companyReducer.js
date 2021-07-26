import { FETCH_COMPANY_REQUEST, FETCH_COMPANY_SUCCESS, FETCH_COMPANY_FAILURE } from "./companyTypes";

const initialState = {
    companies: [],
    error: ''
};

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_COMPANY_REQUEST:
            return {
                ...state
            };
        case FETCH_COMPANY_SUCCESS:
            return{
                companies: action.payload,
                error: ''
            };
        case FETCH_COMPANY_FAILURE:
            return{
                companies: [],
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;