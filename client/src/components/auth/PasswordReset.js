import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';
import { setAlert } from '../../actions/alert';
import { reset } from '../../actions/auth';


const PasswordReset = ({ setAlert, reset, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        reset({ email });
    };

    if (isAuthenticated) {
        return <Redirect to='/users' />;
    }

    return (
        <Fragment>
            <h1 className='large text-primary'><Translate id='passwordReset.passwordReset' /></h1>
            <p className='lead'><i className='fas fa-user'></i><Translate id='passwordReset.description' /></p>
            <form className='form' onSubmit={(e) => onSubmit(e)}>
                <div className='form-group'>
                    <Translate>
                        {({ translate }) => <input
                            type='email'
                            placeholder={translate('passwordReset.placeholder')}
                            name='email'
                            value={email}
                            onChange={(e) => onChange(e)}
                        />}
                    </Translate>
                </div>
                <Translate>
                    {({ translate }) => <input type='submit' className='btn btn-primary' value={translate('passwordReset.button')}/>}
                </Translate>
            </form>
        </Fragment>
    );
};

PasswordReset.protoTypes = {
    setAlert: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, reset }
)(PasswordReset);
