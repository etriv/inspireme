import React from 'react';
import './search-area.scss'

class SearchArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_field: ''
        };

        this.onSearchBoxChange = this.onSearchBoxChange.bind(this);
    }

    onSearchBoxChange(event) {
        this.setState({search_field: event.target.value}, () => {
            console.log(this.state.search_field);
        });
    }

    render() {
        return (
            <div className="search-area-container">
                <p className="inspire-text">Inspire me to:</p>
                <input className="search-box" type="text" name="search-text" onChange={this.onSearchBoxChange} placeholder="✎" />
                <button className="button" onClick={this.props.inspireOnClick.bind(this, 'TAGS', 'TYPE')}>Inspire</button>
            </div>
        );
    }
}

export default SearchArea;