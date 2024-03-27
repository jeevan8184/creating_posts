import * as api from '../api/index'

import {LOGIN} from '../constants'



export const signin=(formData,navigate)=>async(dispatch)=> {

    try {
        const {data}=await api.signin(formData);
        dispatch({type:LOGIN,data});
        console.log(data);
        navigate('/');
        
    } catch (error) {
        console.log({message:error.message});
    }
}

export const signup=(formData,navigate)=>async(dispatch)=> {

    try {
        const {data}=await api.signup(formData);
        dispatch({type:LOGIN,data});
        navigate('/');

    } catch (error) {
        console.log({message:error.message});
    }
}
