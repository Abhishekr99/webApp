import { FETCH_COMPANY_REQUEST, FETCH_COMPANY_SUCCESS, FETCH_COMPANY_FAILURE } from "./companyTypes";
import axios from "axios";

export const fetchCompanies = ()=>{
    return dispatch =>{
        dispatch(fetchCompanyRequest());
        axios.get("http://localhost:8082/company")
        .then(res=>{
            dispatch(fetchCompanySuccess(res.data));
        })
        .catch(error =>{
            dispatch(fetchCompanyFailure(error.message))
        })
    }
}

const fetchCompanyRequest = ()=>{
    return {
        type: FETCH_COMPANY_REQUEST
    }
}

const fetchCompanySuccess = (companies)=>{
    return {
        type: FETCH_COMPANY_SUCCESS,
        payload: companies
    }
}

const fetchCompanyFailure = (error)=>{
    return {
        type: FETCH_COMPANY_FAILURE,
        payload: error
    }
}