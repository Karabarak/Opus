import React, { Fragment, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Users from './components/users/Users';
import UserDetails from './components/users/UserDetails';
import CreateUser from './components/users/CreateUser';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <Router history={history}>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Alert />
                        <Switch>
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/login' component={Login} />
                            <PrivateRoute exact path='/users' component={Users} />
                            <PrivateRoute exact path='/create-user' component={CreateUser} />
                            <PrivateRoute exact path='/user-details/:id' component={UserDetails} />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
