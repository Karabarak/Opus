import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import User from './User';
import { getUsers } from '../../actions/user';

const Users = ({ getUsers, auth: { user }, users: { users, loading } }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return loading || users == null ? <Spinner/> : <Fragment>
        <p className='lead'>
            <i className="fa fa-user"></i> <Translate id='users.hello' /> { user && user.email }
        </p>
        <h1 className='large text-primary'><Translate id='users.usersList' /></h1>
        <Link to='/create-user' className='btn btn-primary my-1'>
            <Translate id="users.create"/>
        </Link>
        <User users={ users } currentUser= { user }/>
    </Fragment>;
};

Users.propTypes = {
    getUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users
});

export default connect(mapStateToProps, { getUsers })(Users);
