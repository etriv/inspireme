import React from 'react';
import './search-area.scss';
import styled from 'styled-components';
import {main_colors4 as main_colors} from '../../modules/main-colors';

const SearchContainer = styled.div`
    background-image: url("./images/watercolour-1325656_1920.jpg");
    background-size: cover;
    background-position: center center;
    // background-color: #b2dffb;
    background-color: ${main_colors.c4};
    background-repeat: no-repeat;
    height: 67vh;
`;

const InspireText = styled.p`
    color: ${main_colors.c3};
    font-family: 'Gelasio', sans;
    font-weight: 400;
    font-size: 5rem;
    margin: 0px;
    text-align: center;
    letter-spacing: 4px;
    word-spacing: 4px;
    text-shadow: 4px 4px 4px ${main_colors.c2};
`;

const ClickableButton = styled.button`
    color: ${main_colors.c3};
    background-color: ${main_colors.c1};
    transition: filter 0.2s;
    :hover {
        filter: brightness(105%);
        cursor: pointer;
    }
    :active {
        filter: brightness(115%);
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
                <InspireText>Inspire me to:</InspireText>
                <input name="search-text" className="search-box" type="text"
                    placeholder="✎"
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