import React from 'react';
import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';

import { isUserAuthenticated } from './helpers/authUtils';

// load views
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// auth
const Login = React.lazy(() => import('./pages/auth/Login'));
const Logout = React.lazy(() => import('./pages/auth/Logout'));
const ForgetPassword = React.lazy(() => import('./pages/account/ForgetPassword'));
const Register = React.lazy(() => import('./pages/account/Register'));
const ConfirmAccount = React.lazy(() => import('./pages/account/Confirm'));

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    const isAuthTokenValid = isUserAuthenticated();
    if (!isAuthTokenValid) {
      // if not auth then redirect to login
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }

    return <Component {...props} />
  }} />
)

const routes = [
  // auth and account
  { path: '/login', name: 'Login', component: Login, route: Route },
  { path: '/logout', name: 'Logout', component: Logout, route: Route },
  { path: '/forget-password', name: 'Forget Password', component: ForgetPassword, route: Route },
  { path: '/register', name: 'Register', component: Register, route: Route },
  { path: '/confirm', name: 'Confirm', component: ConfirmAccount, route: Route },

  // other pages
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, route: PrivateRoute, title: 'Dashboard' },
  // { path: '/add-new', name: 'Add New Recipe', component: Dashboard, route: PrivateRoute, title: 'Recipe' },
  // { path: '/meal-planner', name: 'Meal Planner', component: Dashboard, route: PrivateRoute, title: 'Meal Planner' },
  // { path: '/inventory', name: 'Inventory', component: Dashboard, route: PrivateRoute, title: 'Inventory' },
  // { path: '/favorites', name: 'Favorites', component: Dashboard, route: PrivateRoute, title: 'Favorites' },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute
  },
  
]

export { routes, PrivateRoute };