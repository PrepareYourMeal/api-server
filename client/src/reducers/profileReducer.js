import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
    profile: null, //Profile data of logged in user and other users
    // profiles: [], // list of developer profiles
    // repos: [], //Github Repos
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}