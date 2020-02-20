import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getUser } from '../../actions/user';
import { setAlert } from '../../actions/alert';

const UserDetails = ({ setAlert, getUser, match, user: { userDetails, loading, error } }) => {
    useEffect(() => {
        getUser(match.params.id);
    }, [getUser, match.params.id]);

    if (error.msg) {
        setAlert(error.msg, 'danger');
    }

    const { email, log } = userDetails;
    const logList = log.map((logEntry, i) => (
        <p key={i}>{logEntry}</p>
    ));

    return loading || userDetails == null ? <Spinner/> : <Fragment>
        <p className='lead'>
            <i className="fa fa-user"></i> User { email } log:
        </p>
        { logList }
        <Link to='/users' className='btn btn-light'>Back</Link>
    </Fragment>;
};

UserDetails.propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { getUser, setAlert })(UserDetails);
