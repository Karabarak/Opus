import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate } from 'react-localize-redux';


const Landing = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Redirect to='/users' />;
    }

    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'><Translate id='landing.title' /></h1>
                    <p className='lead'>
                        <Translate id='landing.description' />
                    </p>
                    <div className='buttons'>
                        <Link to='/register' className='btn btn-primary'><Translate id='landing.signUp'/></Link>
                        <Link to='/login' className='btn btn-light'><Translate id='landing.login'/></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
