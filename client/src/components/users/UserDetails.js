import React, { Fragment, useEffect, useState, Profiler} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUser } from '../../actions/user';

const UserDetails = ({ getUser, match, users: { userDetails, loading} }) => {
    useEffect(() => {
        getUser(match.params.id);
    }, [getUser]);

    const log = userDetails && userDetails.log.map((time) => (
        <p>{time}</p>
    ))

    return loading || userDetails == null ? <Spinner/> : <Fragment>
        <p className='lead'>
            <i className="fa fa-user"></i> User { userDetails && userDetails.email } log:
        </p>
        { log }
        <Link to='/users' className='btn btn-light'>Back</Link>
    </Fragment>;
};

UserDetails.propTypes = {
    getUser: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    users: state.users
});

export default connect(mapStateToProps, { getUser })(UserDetails);
