import React from 'react';
import './navigation.scss';
// import styled from 'styled-components';
import UserMenu from '../user-menu/user-menu';
import { Link } from 'react-router-dom';
// import { main_colors5 as main_colors, shadeHexColor } from '../../modules/main-colors';

class Navigation extends React.Component {
    render() {
        return (
            <div className="header">
                    <Link to='/' className="logo">
                        <span role="img" aria-label="bulb">💡&nbsp;</span>
                        InspireMe
                    </Link>
                <nav className="menu">
                    <UserMenu defaultText='Sign In' defaultPath='/sign-in'
                        signedInUser={this.props.signedInUser}
                        className=""
                        userMenuItems={this.props.userMenuItems} />
                    <Link to='/about'
                        className="menu-item"
                        style={{}}>
                        About
                    </Link>
                    <span className="menu-item icon" href="">☰</span>
                </nav>
            </div>
        );
    }
}

export default Navigation;

// TODO-end: Make a nav-button component