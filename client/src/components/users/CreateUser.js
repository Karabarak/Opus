import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { createUser } from '../../actions/user';


const CreateUser = ({ setAlert, createUser }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });

    const { email, password, password2 } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        }
        else {
            createUser({ email, password });
        }
    };

    return (
        <Fragment>
            <p className='lead'><i className='fas fa-user'></i> Create New User</p>
            <form className='form' id="createUser" onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                        // minLength='8'
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={(e) => onChange(e)}
                        // minLength='8'
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Create' />
                <Link to='/users' className='btn btn-light'>Back</Link>
            </form>
        </Fragment>
    );
};

CreateUser.propTypes = {
    setAlert: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired
};

export default connect(
    null,
    { setAlert, createUser }
)(CreateUser);
