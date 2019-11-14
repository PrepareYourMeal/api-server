import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
    <Fragment>
        <ul className="navigation-menu">
            <li className="has-submenu">
                <Link to="/dashboard" className="side-nav-link-ref">
                    <i className="mdi mdi-fridge"></i>
                    Refrigerator
                </Link>
            </li>
            <li className="has-submenu">
                <Link to="/recipes" className="side-nav-link-ref">
                    <i className="mdi mdi-book-open-page-variant"></i>
                    My Recipes
                </Link>
            </li>
            <li className="has-submenu">
                <Link to="/favorites" className="side-nav-link-ref">
                    <i className="mdi mdi-star-outline"></i>
                    Favorites
                </Link>
            </li>
            <li className="has-submenu">
                <Link to="/seasonal" className="side-nav-link-ref">
                    <i className="mdi mdi-leaf"></i>
                    Seasonal
                </Link>
            </li>
        </ul>
    </Fragment>
    )
}

Navbar.propTypes = {

}

export default Navbar
