import React from 'react';
import './navigation.scss'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className="header">
            <div className="logo"><Link to='/'><span role="img" aria-label="bulb">💡&nbsp;</span>InspireMe</Link></div>
            <nav className="menu">
                <Link to='/sign-in' className="menu-item marked">Sign In</Link>
                <Link to='/about' className="menu-item">About</Link>
                <span className="menu-item icon" href="">☰</span>
            </nav>
        </div>
    );
}

export default Navigation;