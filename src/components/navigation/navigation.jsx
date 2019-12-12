import React from 'react';
import './navigation.scss'

const Navigation = () => {
    return (
        <div className="header">
            <div className="logo"><span role="img">💡&nbsp;</span>INSPIRE ME</div>
            <nav className="menu">
                <span className="menu-item marked">Sign In</span>
                <span className="menu-item">About</span>
                <span className="menu-item icon" href="">☰</span>
            </nav>
        </div>
    );
}

export default Navigation;