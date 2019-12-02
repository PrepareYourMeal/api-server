import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

const Navbar2 = () => {
    return (
        <div>
            <Navbar color="light" expand="md" light>
                <NavbarBrand href="/">Stove and Oven</NavbarBrand>
                <NavbarToggler/>
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/recipes">Recipes</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/auth/google">Google Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/favourites">Favourites</NavLink>
                        </NavItem>
                        <UncontrolledDropdown inNavbar nav>
                            <DropdownToggle caret nav>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem>
                                    Option 2
                                </DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>


    // <Fragment>
    //     <ul className="navigation-menu">
    //         <li className="has-submenu">
    //             <Link to="/dashboard" className="side-nav-link-ref">
    //                 <i className="mdi mdi-fridge"></i>
    //                 Refrigerator
    //             </Link>
    //         </li>
    //         <li className="has-submenu">
    //             <Link to="/recipes" className="side-nav-link-ref">
    //                 <i className="mdi mdi-book-open-page-variant"></i>
    //                 My Recipes
    //             </Link>
    //         </li>
    //         <li className="has-submenu">
    //             <Link to="/favorites" className="side-nav-link-ref">
    //                 <i className="mdi mdi-star-outline"></i>
    //                 Favorites
    //             </Link>
    //         </li>
    //         <li className="has-submenu">
    //             <Link to="/seasonal" className="side-nav-link-ref">
    //                 <i className="mdi mdi-leaf"></i>
    //                 Seasonal
    //             </Link>
    //         </li>
    //     </ul>
    // </Fragment>
    )
}

// Navbar.propTypes = {

// }

export default Navbar2
