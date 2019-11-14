import { USER_LOADED, LOADING_FAILED, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        
        case LOGIN_FAIL:
        case LOADING_FAILED:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        // case LOGIN_SUCCESS:
        //     localStorage.setItem('token', payload.token);
        //     return {
        //         ...state,
        //         ...payload,
        //         isAuthenticated: true,
        //         loading: false
        //     }
        // case SET_CURRENT_USER:
        //     // localStorage.setItem('token', payload.token);
        //     return {
        //         ...state,
        //         // ...payload,
        //         isAuthenticated: !!payload,
        //         user: payload
        //     }
        default:
            return state;
    }
  }