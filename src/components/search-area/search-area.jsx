import React from 'react';
import './search-area.scss'

const SearchArea = () => {
    return (
        <div className="search-area-container">
            <p className="inspire-text">Inspire me to:</p>
            <input className="search-box" type="text" name="search-text" placeholder="✎" />
            <button className="button">Inspire</button>
        </div>
    );
}

export default SearchArea;