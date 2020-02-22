import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import user from './user';
import { localizeReducer } from 'react-localize-redux';

export default combineReducers({
    alert,
    auth,
    users,
    user,
    localize: localizeReducer
});
