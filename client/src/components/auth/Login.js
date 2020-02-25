import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/users' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'><Translate id='login.signInHead' /></h1>
            <p className='lead'><i className='fas fa-user'></i> <Translate id='login.signInP' /></p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <Translate>
                    {({ translate }) => <input type='submit' className='btn btn-primary' value={translate('login.login')}/>}
                </Translate>
            </form>
            <p className='my-1'>
                <Translate id='login.dontHaveA' /> <Link to='/register'><Translate id='login.signUp' /></Link>
            </p>
            <p>
                <Translate id='login.forgot' /> <Link to='/passwordreset'><Translate id='login.reset' /></Link>
            </p>
        </Fragment>
    );
};

Login.prototype = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { login }
)(Login);
