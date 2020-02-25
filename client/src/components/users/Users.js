import React, { useEffect, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import User from './User';
import Pagination from './Pagination';
import { getUsers } from '../../actions/user';

const Users = ({ getUsers, auth: { user }, users: { users, loading } }) => {
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const adder = usersPerPage * (currentPage - 1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return loading || users == null ? <Spinner/> : <Fragment>
        <p className='lead'>
            <i className="fa fa-user"></i> <Translate id='users.hello' /> { user && user.email }
        </p>
        <h1 className='large text-primary'><Translate id='users.usersList' /></h1>
        <Link to='/create-user' className='btn btn-primary my-1'>
            <Translate id="users.create"/>
        </Link>
        <User users={ currentUsers } currentUser= { user } adder={ adder }/>
        <Pagination
            usersPerPage = { usersPerPage }
            totalUsers = { users.length }
            paginate = { paginate }
        />
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
