import React from 'react';
import './gallery-filters.scss'

class GalleryFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_option: 0,
        };
    }

    // TODO: Think of how to make component more generic. And do it.
    render() {
        return (
            <div className="filters-container">
                <div className="filters-pad"></div>
                <div className="filters">
                    <span className="filter on">All</span>
                    <span className="filter">Videos</span>
                    <span className="filter">Images</span>
                    <span className="filter">Pages</span>
                </div>
                <div className="sort-elem">
                    <span className="sort">Sort:&nbsp;</span>
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
}

export default GalleryFilters;