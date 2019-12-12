import React from 'react';
import './gallery-filters.scss'

const GalleryFilters = () => {
    return (
        <div className="filters-container">
            <div className="filters-pad">
                A
            </div>
            <div className="filters">
                <span className="filter on">All</span>
                <span className="filter">Videos</span>
                <span className="filter">Images</span>
                <span className="filter">Pages</span>
            </div>
            <div className="sort-elem">
                <span>Sort by:&nbsp;</span>
                <select>
                    <option value="volvo">Rating</option>
                    <option value="saab">Date (newest)</option>
                    <option value="opel">Date (oldest)</option>
                </select>
            </div>
        </div>
    );
}

export default GalleryFilters;