import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
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
            <i className="fa fa-user"></i> Hello { user && user.email }
        </p>
        <h1 className='large text-primary'>Users List</h1>
        <Link to='/create-user' className='btn btn-primary my-1'>
            Create User
        </Link>
        <User user={ users } currentUser= { user }/>
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
