import React from 'react';
import './custom-button.scss';
import styled from 'styled-components';
import {shadeHexColor} from '../../modules/main-colors';


class CustomButton extends React.Component {
    constructor(props) {
        super(props);
        // console.log('Constructing a button:', this.props.children);
        this.btnColor = this.props.bgColor;
        this.ClickableButton = styled.button`
            color: ${this.props.foreColor};
            background-color: ${this.btnColor};
            transition: background-color 0.3s;
            :hover {
                background-color: ${shadeHexColor(this.btnColor, 0.1)};
                cursor: pointer;
            }
            :active {
                background-color: ${shadeHexColor(this.btnColor, 0.2)};
                transition: filter 0s;
            }
        `;
    }

    render() {
        const {children, className, ...otherProps} = this.props;
        // console.log('otherProps:', otherProps);
        return (
            <this.ClickableButton className={`custom-button2 ${className}`} {...otherProps}>
                {children}
            </this.ClickableButton>
        )
    }
}

export default CustomButton;