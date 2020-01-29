import React from 'react';
import './gallery-filters.scss'
// import { main_colors5 as main_colors } from '../../modules/main-colors';

const filter_style = {
    color: 'black',
    //backgroundColor: main_colors.c2
}

class GalleryFilters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_filter: 'all',
        };

        this.onFilterClick = this.onFilterClick.bind(this);
    }

    onFilterClick(event) {
        // console.log('Current filter: ', event.target.id);
        // console.log(event.target.style);
        this.setState({ current_filter: event.target.id});

        // Change visuals (classes) to match the selected option
        document.getElementById(this.state.current_filter)
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
                    <span id="all" className="filter on" style={filter_style}
                        onClick={this.onFilterClick}>All</span>
                    <span id="video" className="filter" style={filter_style}
                        onClick={this.onFilterClick}>Videos</span>
                    <span id="image" className="filter" style={filter_style}
                        onClick={this.onFilterClick}>Images</span>
                    <span id="page" className="filter last" style={filter_style}
                        onClick={this.onFilterClick}>Pages</span>
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