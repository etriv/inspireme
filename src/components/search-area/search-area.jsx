import React from 'react';
import './search-area.scss';
import styled from 'styled-components';
import BoxContainer from '../box-container/box-container';
import CustomButton from '../custom-button/custom-button';
import {mainColors5 as mainColors} from '../../modules/main-colors';

const InspireText = styled.p`
    color: ${mainColors.c3};
    font-family: 'Lora', sans;
    font-weight: 500;
    font-size: 5rem;
    margin: 0px;
    text-align: center;
    // letter-spacing: 4px;
    word-spacing: 4px;
    text-shadow: 2px 2px 1px ${mainColors.c4};

    @media only screen and (max-width: 1200px) {
        font-size: 4rem;
    }

    @media only screen and (max-width: 650px) {
        font-size: 2.5rem;
    }
`;

class SearchArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchField: ''
        };
    }

    onSearchBoxChange = (event) => {
        this.setState({ searchField: event.target.value }, () => {
            // Feature: getting inspirations related to the text in the search field
            // upon changing the TYPE of the presented inspirations.
            // this.props.onSearchBoxChange(this.state.searchField);
        });
    }

    handleKeyUp = (event) => {
        // If ENTER is being pressed, initiate fetching of inspirations
        if (event.keyCode === 13) {
            this.props.onSearchClick(this.state.searchField);
        }
    }



    render() {
        let mainText = '';
        let btnText = '';
        let containerClassNames = 'search-area-container';
        let btnClassNames = 'button';
        if (this.props.likedMode) {
            mainText = '';
            btnText = 'EXPLORE';
            containerClassNames += ' row-mode';
            btnClassNames += ' only-margin-left';
        }
        else {
            mainText = 'Get inspired';
            btnText = 'INSPIRE';
        }

        return (
            <BoxContainer className={containerClassNames}>
                <InspireText>{mainText}</InspireText>
                <input name="search-text" className="search-box" type="text"
                    placeholder="✎..."
                    onChange={this.onSearchBoxChange}
                    onKeyUp={this.handleKeyUp} />
                <CustomButton className={btnClassNames}
                    bgColor={mainColors.c4}
                    foreColor='white'
                    onClick={this.props.onSearchClick.bind(this, this.state.searchField)}>
                    {btnText}</CustomButton>
            </BoxContainer>
        );
    }
}

export default SearchArea;