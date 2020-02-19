import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/user';

const User = ({ deleteUser, users, currentUser }) => {
    const userList = users.map((u, i) => (
        <tr key={u._id}>
            <td>{i + 1}</td>
            <td>{u.email}</td>
            <td>
                <Link to={`/user-details/${u._id}`} className='btn btn-primary'>
                Details
                </Link>

                <button onClick={() => (deleteUser(u._id, currentUser._id, users))} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nr.</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList}
                </tbody>
            </table>
        </Fragment>
    )
}

User.propTypes = {
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object
};

export default connect(null, { deleteUser })(User);
