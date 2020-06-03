import React, { useState, useContext } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from '../context/AuthContext';

export default function TopMenu() {
    const loginContext = useContext(AuthContext);
    const history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">BookStore</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="mx-2">
                            <Link to="/">Home</Link>
                        </NavItem>
                        {loginContext.isLogin ? (
                            <NavItem className="mx-2">
                                <Link to="" onClick={loginContext.logoutUser(() => history.push('/'))} >Log out</Link>
                            </NavItem>
                            ) : (
                                <NavItem className="mx-2">
                                    <Link to="/login">Login</Link>
                                </NavItem>
                            )}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}
