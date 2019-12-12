import React from 'react';
import './gallery-filters.scss'

const GalleryFilters = () => {
    return (
        <div className="filters-container">
            <div className="filters-pad">
                
            </div>
            <div className="filters">
                <span className="filter on">All</span>
                <span className="filter">Videos</span>
                <span className="filter">Images</span>
                <span className="filter">Pages</span>
            </div>
            <div className="sort-elem">
                <span>Sort:&nbsp;</span>
                <select>
                    <option value="rating-high">Rating (highest)</option>
                    <option value="rating-low">Rating (lowest)</option>
                    <option value="date-new">Date (newest)</option>
                    <option value="date-old">Date (oldest)</option>
                </select>
            </div>
        </div>
    );
}

export default GalleryFilters;