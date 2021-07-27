import axios from "axios";
import { LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE } from "./authTypes";

export const authenticateUser = (username, password)=>{
    const credentials={
        username: username,
        password: password
    }
    return dispatch =>{
        dispatch(loginRequest());
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signin`, credentials)
        .then((res)=>{
            let token = res.data.accessToken;
            localStorage.setItem('jwt',token);
            dispatch(success(true, res.data.roles[0], res.data.id))
        })
        .catch((err)=>{
            dispatch(failure());
        })
        
    }
}

export const logoutUser = ()=>{
    return dispatch =>{
        dispatch(logoutRequest());
        localStorage.removeItem('jwt')
        dispatch(success(false));
    }
}

const loginRequest = ()=>{
    return {
        type: LOGIN_REQUEST
    }
};

const logoutRequest = ()=>{
    return {
        type: LOGOUT_REQUEST
    }
};

const success = (isLoggedIn, role, id)=>{
    return {
        type: SUCCESS,
        payload: isLoggedIn,
        role: role,
        id: id
    }
};

const failure = ()=>{
    return {
        type: FAILURE,
        payload: false
    }
};