import React from 'react';
import './homepage.scss';
import * as dbFuncs from '../../modules/db-manager';
import SearchArea from '../../components/search-area/search-area';
import Gallery from '../../components/gallery/gallery';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inspirations: [],
            tags: '',
            ins_type: 'all',
            sort_by: 'rating_desc',
            display_gallery: false
        };

        this.updateInspirations = this.updateInspirations.bind(this);
        this.handleInspirationsTypeChange = this.handleInspirationsTypeChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
    }

    updateInspirations() {
        console.log('Updating inspirations...', 'tags:', this.state.tags, 'type:', this.state.ins_type);
        const type = this.state.ins_type !== 'all' ? this.state.ins_type : '';
        dbFuncs.getInspirationsFromDB(this.state.tags, type)
            .then(data => this.setState({ inspirations: data }, () => {
                console.log('Fetched inspirations:', this.state.inspirations);
                this.state.inspirations.length > 0 ?
                    this.setState({display_gallery: true})
                    : this.setState({display_gallery: true}); // this.setState({display_gallery: false});
                    // TODO: When there is nothing to show, hide gallery - only with better filtering algorithem
                    // Present a proper message (with a cute image) of 'No matching results' / 'No inspiration here...'
            }));
    }

    handleSearchSubmit(search_box = '') {
        const new_tags = search_box.split(' ').join('').toLowerCase();
        this.setState({ tags: new_tags }, () => {
            // console.log('Updated new tags after submit. Going to fetch...');
            this.updateInspirations(new_tags, this.state.ins_type);
        });
    }

    handleInspirationsTypeChange(new_type = '') {
        new_type = (new_type === 'all') ? '' : new_type;
        this.setState({ ins_type: new_type }, () => {
            this.updateInspirations(this.state.search_area, new_type);
        });
    }

    handleSearchBoxChange(new_tags = '') {
        new_tags = new_tags.split(' ').join('').toLowerCase();
        this.setState({ tags: new_tags });
    }

    render() {
        // console.log('Homepage rendering: ', this.state.inspirations);
        return (
            <div className="home-page">
                <SearchArea
                    onSearchBoxChange={this.handleSearchBoxChange}
                    inspireOnClick={this.handleSearchSubmit} />
                {this.state.display_gallery ?
                    <Gallery
                        items={this.state.inspirations}
                        onFilterChange={this.handleInspirationsTypeChange} />
                    : <div />}
            </div>
        );
    }
}

export default HomePage;