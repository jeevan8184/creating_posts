
import { LOGIN,LOGOUT } from "../constants";

const authReducer= (state={authData:null},action)=> {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('profile',JSON.stringify({...action?.data}));
            return {...state,authData:action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state,authData:null};
        default:
        return state;
    }
}

export default authReducer;