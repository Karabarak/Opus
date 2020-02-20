import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import user from './user'

export default combineReducers({
    alert,
    auth,
    users,
    user
});
