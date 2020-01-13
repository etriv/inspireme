import React from 'react';
import './search-area.scss';
import {main_colors4 as main_colors} from '../../modules/main-colors';

class SearchArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_field: '',
            bg_images: [
                './images/watercolour-1325656_1920.jpg'
            ]
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
        const area_style = {
            backgroundImage: `url(${this.state.bg_images[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            // backgroundColor: '#b2dffb',
            backgroundColor: main_colors.c4,
            backgroundRepeat: 'no-repeat',
            height: '67vh'
        }

        return (
            <div className="search-area-container" style={area_style}>
                <p className="inspire-text">Inspire me to:</p>
                <input name="search-text" className="search-box" type="text" placeholder="✎"
                    onChange={this.onSearchBoxChange}
                    onKeyUp={this.handleKeyUp} />
                <button className="button"
                    onClick={this.props.inspireOnClick.bind(this, this.state.search_field)}>
                    Inspire</button>
            </div>
        );
    }
}

export default SearchArea;