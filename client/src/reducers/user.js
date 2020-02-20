import {
    GET_USER,
    GET_USER_ERROR,
    RESET_USER
} from '../actions/types';

const initialState = {
    userDetails: {
        log: [],
        email: ''
    },
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
    case GET_USER:
        return {
            ...state,
            userDetails: payload,
            loading: false
        };
    case GET_USER_ERROR:
        return {
            ...state,
            loading: false,
            error: payload
        };
    case RESET_USER:
        return initialState;
    default:
        return state;
    }
}
