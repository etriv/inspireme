import React from 'react';
import './navigation.scss';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { main_colors5 as main_colors, shadeHexColor } from '../../modules/main-colors';

const marked_color = main_colors.c3;
const MarkedLink = styled(Link)`
    text-decoration: none;    
    color: ${'black'};
    text-align: center;
    padding: 10px 20px;
    margin-left: 15px;
    text-decoration: none;
    width: 7rem;
    white-space: nowrap;
    background-color: ${marked_color};
    border-radius: 20px;
    border: 0px solid black;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: background-color 0.3s;
	:hover {
        background-color: ${shadeHexColor(marked_color, 0.1)};
		cursor: pointer;
    }
    :active {
        background-color: ${shadeHexColor(marked_color, 0.2)};
        transition: background-color 0s;
      }
`;

class Navigation extends React.Component {
    render() {
        return (
            <div className="header">
                    <Link to='/' className="logo">
                        <span role="img" aria-label="bulb">💡&nbsp;</span>
                        InspireMe
                    </Link>
                <nav className="menu">
                    <MarkedLink to='/sign-in'
                        className="">
                        Sign in
                    </MarkedLink>
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