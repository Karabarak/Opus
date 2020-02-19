import {
    GET_USERS,
    USERS_ERROR,
    CREATE_USER_ERROR,
    DELETE_USER_ERROR,
    DELETE_USER,
    USER_DETAILS
} from '../actions/types';

const initialState = {
    users: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
    case USER_DETAILS:
        return {
            ...state,
            userDetails: payload,
            loading: false
        };
    case GET_USERS:
        return {
            ...state,
            users: payload,
            loading: false
        };
    case DELETE_USER:
        return {
            ...state,
            users: payload,
            loading: false
        };
    case USERS_ERROR:
        return {
            ...state,
            error: payload,
            loading: false
        };
    case CREATE_USER_ERROR:
    case DELETE_USER_ERROR:
        return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
        };
    default:
        return state;
    }
}
