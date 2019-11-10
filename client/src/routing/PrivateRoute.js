import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const PrivateRoute = ({ component: Component, handleLogout, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props => 
        localStorage.getItem("accessJWT") && isAuthenticated === true ? (
            <Component {...props} handleLogout={handleLogout}/>
        ) : (
            <Redirect
            to={{
                pathname: "/",
                state: { from: props.location }
            }}

            />
        )}
    />
);



// const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
//     <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to='/login' />) : (<Component {...props} />) } />
// )

// PrivateRoute.propTypes = {
//     auth: PropTypes.object.isRequired,
// }

// const mapStateToProps = state => ({
//     auth: state.auth
// });

// export default connect(mapStateToProps)(PrivateRoute)