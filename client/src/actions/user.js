import axios from 'axios';
import { setAlert } from './alert';
import { loadUser } from './auth';
import {
    GET_USERS,
    USERS_ERROR,
    CREATE_USER_ERROR,
    DELETE_USER,
    DELETE_USER_ERROR,
    LOGOUT,
    USER_DETAILS
} from './types';

// Get all users
export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users');
        dispatch({
            type: GET_USERS,
            payload: res.data,
            loading: false
        });
    }
    catch (err) {
        dispatch({
            type: USERS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Get one user
export const getUser = (id) => async (dispatch) => {
    try {

        const res = await axios.get(`/api/users/${id}`);
        dispatch({
            type: USER_DETAILS,
            payload: res.data
        })
    }
    catch (err) {
    }
};


// Create new User
export const createUser = ({ email, password }) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({ email, password });
        await axios.post('api/users/user', body, config);

        dispatch(setAlert('User Created', 'success'));
    }
    catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: CREATE_USER_ERROR
        });
    }
};

// Delete user
export const deleteUser = (id, currentUserId, users) => async (dispatch) => {
    if(window.confirm('Are you sure?')) {
        try {
            const res = await axios.delete(`/api/users/${id}`);

            const updatedUsers = users.filter((user) => user._id !== res.data.oldUserId);

            dispatch({
                type: DELETE_USER,
                payload: updatedUsers
            });

            dispatch(setAlert('User Deleted', 'success'));
            if (id === currentUserId) {
                dispatch({ type: LOGOUT });
            }
        }
        catch (err) {
            dispatch({
                type: DELETE_USER_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};
