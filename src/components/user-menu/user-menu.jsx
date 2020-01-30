import React from 'react';
import './user-menu.scss';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mainColors5 as mainColors, shadeHexColor } from '../../modules/main-colors';

const markedColor = mainColors.c3;
const MarkedDefault = styled('div')`  
    border: 0px solid black;
    text-decoration: none;    
    color: ${'black'};
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    background-color: ${markedColor};
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: background-color 0.3s;
	:hover {
        background-color: ${shadeHexColor(markedColor, 0.1)};
		cursor: pointer;
    }
    :active {
        background-color: ${shadeHexColor(markedColor, 0.25)};
        transition: background-color 0s;
      }
`;

class UserMenu extends React.Component {
    state = {
        showItems: false,
    }

    toggleShowItems = () => {
        if (!this.state.showItems) {
            this.setState({ showItems: true });
            document.addEventListener('click', this.handleClickWhilePopMenuOpen);
        }
        else {
            document.removeEventListener('click', this.handleClickWhilePopMenuOpen);
            this.setState({ showItems: false });
        }
    }

    handleClickWhilePopMenuOpen = (event) => {
        if (event.target.id === 'menu-id' && this.state.showItems === true) {
            return; // Ignore. #menu-id knows how to take care of this scenerio.
        }
        if (event.target.id !== 'pop-menu-id') {
            document.removeEventListener('click', this.handleClickWhilePopMenuOpen);
            this.setState({ showItems: false });
        }
    }

    render() {
        return (
            <div className={'user-menu' + this.props.className}>
                {this.props.signedInUser.name === '' ?
                    <MarkedDefault>
                        <Link className="default-link" to={this.props.defaultPath}>
                            {this.props.defaultText}
                        </Link>
                    </MarkedDefault>
                    :
                    <MarkedDefault>
                        <div className="default-link-signed" id="menu-id"
                            onClick={this.toggleShowItems} >
                            Menu &#9776;
                    </div>
                    </MarkedDefault>
                }
                {this.state.showItems ?
                    <div id="pop-menu-id" className="pop-menu">
                        <div className="pop-menu-top">{this.props.signedInUser.name}</div>
                        {this.props.userMenuItems.map((item, index) => {
                            return (
                                <Link key={index} className="user-menu-item" to={item.linkPath}>
                                    <div>{item.linkText}</div>
                                </Link>
                            )
                        })}
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default UserMenu;


// {/* <span className="arrow-up">&#9650;</span> */}