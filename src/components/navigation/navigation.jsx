import React from 'react';
import './navigation.scss';
import { Link } from 'react-router-dom';
import { main_colors4 as main_colors } from '../../modules/main-colors';

const Navigation = () => {
    const btn_colors = {
        backgroundColor: main_colors.c4,
        color: 'white'
    }
    return (
        <div className="header">
            <div className="logo">
                <Link to='/'>
                    <span role="img" aria-label="bulb">💡&nbsp;</span>
                    InspireMe
                </Link>
            </div>
            <nav className="menu">
                <Link to='/sign-in'
                    className="menu-item marked"
                    style={btn_colors}>
                    Sign In
                </Link>
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

export default Navigation;