import React from 'react';
import './user-menu.scss';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { main_colors5 as main_colors, shadeHexColor } from '../../modules/main-colors';

const marked_color = main_colors.c3;
const MarkedDefault = styled('div')`  
    border: 0px solid black;
    text-decoration: none;    
    color: ${'black'};
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    background-color: ${marked_color};
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: background-color 0.3s;
	:hover {
        background-color: ${shadeHexColor(marked_color, 0.1)};
		cursor: pointer;
    }
    :active {
        background-color: ${shadeHexColor(marked_color, 0.25)};
        transition: background-color 0s;
      }
`;

class UserMenu extends React.Component {
    state = {
        showItems: false,
    }

    toggleShowItems = () => {
        console.log(this.state.showItems);
        if (!this.state.showItems) {
            this.setState({ showItems: true });
            document.addEventListener('mousedown', this.handleClickWhilePopMenuOpen);
        }
        else {
            document.removeEventListener('mousedown', this.handleClickWhilePopMenuOpen);
            this.setState({ showItems: false });
        }
    }

    handleClickWhilePopMenuOpen = (event) => {
        console.log('Inside handle doc click', event.target.id);
        if (event.target.id === 'menu-id' && this.state.showItems === true) {
            return; // Ignore. #menu-id knows how to take care of this scenerio.
        }
        if (event.target.id !== 'pop-menu-id') {
            document.removeEventListener('mousedown', this.handleClickWhilePopMenuOpen);
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

                    </div>
                    : null
                }
            </div>
        );
    }
}

export default UserMenu;


// {/* <span className="arrow-up">&#9650;</span> */}