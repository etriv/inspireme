import React from 'react';
import './gallery-filters.scss'

const filterStyle = {
    color: 'black',
}

class GalleryFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFilter: 'all',
        };

        this.onFilterClick = this.onFilterClick.bind(this);
    }

    onFilterClick(event) {
        // console.log('Current filter: ', event.target.id);
        // console.log(event.target.style);
        this.setState({ currentFilter: event.target.id});

        // Change visuals (classes) to match the selected option
        document.getElementById(this.state.currentFilter)
            .classList.remove('on');
        event.target.classList.add('on');

        // Update HomePage's about filter change
        this.props.onFilterChange(event.target.id);
    }

    render() {
        return (
            <div className="filters-container">
                <div className="filters-pad"></div>
                <div className="filters">
                    <span id="all" className="filter on" style={filterStyle}
                        onClick={this.onFilterClick}>All</span>
                    <span id="video" className="filter" style={filterStyle}
                        onClick={this.onFilterClick}>Videos</span>
                    <span id="image" className="filter" style={filterStyle}
                        onClick={this.onFilterClick}>Images</span>
                    <span id="page" className="filter last" style={filterStyle}
                        onClick={this.onFilterClick}>Pages</span>
                </div>
                <div className="sort-elem">
                    <span className="sort">Sort:&nbsp;</span>
                    <select onChange={(e) => this.props.onSortChange(e.target.value)}>
                        <option value="likes_desc">Rating (highest)</option>
                        <option value="likes_asc">Rating (lowest)</option>
                        <option value="added_desc">Date (newest)</option>
                        <option value="added_asc">Date (oldest)</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default GalleryFilters;