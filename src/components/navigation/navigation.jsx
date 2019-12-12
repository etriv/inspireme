import React from 'react';
import './navigation.scss'

const Navigation = () => {
    return (
        <div class="header">
            <div class="logo">LOGO</div>
            <nav class="menu">
                <span class="menu-item marked">Sign In</span>
                <span class="menu-item">About</span>
                <span class="menu-item icon" href="">☰</span>
            </nav>
        </div>
    );
}

export default Navigation;