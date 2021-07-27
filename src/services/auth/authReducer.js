import { LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE } from "./authTypes";

const initialState={
    isLoggedIn: '',
    role: '',
    id: ''
};

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state
            };
        case LOGOUT_REQUEST:
            return {
                ...state
            };
        case SUCCESS:
            return{
                isLoggedIn: action.payload,
                role: action.role,
                id: action.id
            };
        case FAILURE:
            return{
                isLoggedIn: action.payload
            };
        default:
            return state;
    }
};

export default reducer;