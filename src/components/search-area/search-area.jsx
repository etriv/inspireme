import React from 'react';
import './search-area.scss';
import styled from 'styled-components';
import {main_colors5 as main_colors, shadeHexColor} from '../../modules/main-colors';

const SearchContainer = styled.div`
    background-image: url("./images/watercolour-1325656_19202.jpg");
    background-size: cover;
    background-position: center center;
    // background-color: #b2dffb;
    background-color: ${main_colors.c2};
    background-repeat: no-repeat;
    height: 100%;
`;

const InspireText = styled.p`
    color: ${main_colors.c3};
    font-family: 'Lora', sans;
    font-weight: 500;
    font-size: 5rem;
    margin: 0px;
    text-align: center;
    // letter-spacing: 4px;
    word-spacing: 4px;
    text-shadow: 2px 2px 1px ${main_colors.c4};

    @media only screen and (max-width: 1200px) {
        font-size: 4rem;

    @media only screen and (max-width: 650px) {
        font-size: 2.5rem;
    }
`;

const btn_color = main_colors.c4;
const ClickableButton = styled.button`
    color: ${'white'};
    background-color: ${btn_color};
    transition: background-color 0.3s;
    :hover {
        background-color: ${shadeHexColor(btn_color, 0.1)};
        cursor: pointer;
    }
    :active {
        background-color: ${shadeHexColor(btn_color, 0.2)};
        transition: filter 0s;
    }
`;

class SearchArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_field: ''
        };
        
        this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    onSearchBoxChange(event) {
        this.setState({ search_field: event.target.value }, () => {
            // Feature: getting inspirations related to the text in the search field
            // upon changing the TYPE of the presented inspirations.
            // this.props.onSearchBoxChange(this.state.search_field);
        });
    }

    handleKeyUp(event) {
        // If ENTER is being pressed, initiate fetching of inspirations
        if (event.keyCode === 13) {
            this.props.inspireOnClick(this.state.search_field);
        }
    }

    render() {
        return (
            <SearchContainer className="search-area-container">
                <InspireText>Get inspired</InspireText>
                <input name="search-text" className="search-box" type="text"
                    placeholder="✎..."
                    onChange={this.onSearchBoxChange}
                    onKeyUp={this.handleKeyUp} />
                <ClickableButton className="button"
                    onClick={this.props.inspireOnClick.bind(this, this.state.search_field)}>
                    INSPIRE</ClickableButton>
            </SearchContainer>
        );
    }
}

export default SearchArea;