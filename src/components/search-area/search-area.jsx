import React from 'react';
import './search-area.scss'

class SearchArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_field: '',
        };
        
        this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    onSearchBoxChange(event) {
        this.setState({ search_field: event.target.value }, () => {
            // console.log(this.state.search_field);
        });
    }

    handleKeyUp(event) {
        // If ENTER is being pressed, initiate fetching of inspirations
        if (event.keyCode === 13) {
            this.props.inspireOnClick(this.state.search_field, '');
        }
    }

    render() {
        return (
            <div className="search-area-container">
                <p className="inspire-text">Inspire me to:</p>
                <input name="search-text" className="search-box" type="text" placeholder="✎"
                    onChange={this.onSearchBoxChange}
                    onKeyUp={this.handleKeyUp} />
                <button className="button"
                    onClick={this.props.inspireOnClick.bind(this, this.state.search_field, '')}>
                    Inspire</button>
            </div>
        );
    }
}

export default SearchArea;