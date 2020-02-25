import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, setActiveLanguage } from 'react-localize-redux';
import { logout } from '../../actions/auth';

const Navbar = ({
    auth: { isAuthenticated, loading },
    logout,
    setActiveLanguage,
    languages
}) => {
    const authLinks = (
        <Fragment>
            <li>
                <Link to="/users">
                    <i className="fas fa-user" />{' '}
                    <span className='hide-sm'><Translate id='navbar.users'/></span></Link>
            </li>
            <li>
                <a onClick={logout} href='/'>
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className='hide-sm'><Translate id='navbar.logout'/></span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li><Link to="/register"><Translate id='navbar.register'/></Link></li>
            <li><Link to="/login"><Translate id='navbar.login'/></Link></li>
        </Fragment>
    );

    const language = (
        <Fragment>
            <li>
                <i className="fas fa-flag ml-1"></i>
                {languages.map((lang) => (
                    <a key={lang.code} onClick={() => setActiveLanguage(lang.code)}>
                        {lang.code.toUpperCase()}
                    </a>
                ))}
            </li>
        </Fragment>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> <Translate id='navbar.brand'/></Link>
            </h1>
            <ul>
                { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>)}
                {language}
            </ul>
        </nav>
    );
};

Navbar.proptype = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    languages: PropTypes.array.isRequired,
    setActiveLanguage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    languages: state.localize.languages
});

export default connect(mapStateToProps, { logout, setActiveLanguage })(Navbar);
