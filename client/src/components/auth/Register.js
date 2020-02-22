import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';


const Register = ({ setAlert, register, isAuthenticated }) => {
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
            register({ email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/users' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'><Translate id='register.signUp' /></h1>
            <p className='lead'><i className='fas fa-user'></i><Translate id='register.createAcc' /></p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <Translate>
                        {({ translate }) => <input
                            type='email'
                            placeholder={translate('register.formEmail')}
                            name='email'
                            value={email}
                            onChange={(e) => onChange(e)}
                        />}
                    </Translate>
                </div>
                <div className='form-group'>
                    <Translate>
                        {({ translate }) => <input
                            type='password'
                            placeholder={translate('register.formPassword')}
                            name='password'
                            value={password}
                            onChange={(e) => onChange(e)}
                        />}
                    </Translate>
                </div>
                <div className='form-group'>
                    <Translate>
                        {({ translate }) => <input
                            type='password'
                            placeholder={translate('register.formConfirmPass')}
                            name='password2'
                            value={password2}
                            onChange={(e) => onChange(e)}
                        />}
                    </Translate>
                </div>
                <Translate>
                    {({ translate }) => <input type='submit' className='btn btn-primary' value={translate('register.register')}/>}
                </Translate>
            </form>
            <p className='my-1'>
                <Translate id='register.alreadyHave' />
                <Link to='/login'><Translate id='register.signIn' /></Link>
            </p>
        </Fragment>
    );
};

Register.protoTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, register }
)(Register);
