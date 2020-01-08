import React from 'react';
import './homepage.scss';
import * as dbFuncs from '../../modules/db-manager';
import Navigation from '../../components/navigation/navigation';
import SearchArea from '../../components/search-area/search-area';
import Gallery from '../../components/gallery/gallery';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inspirations: [],
            search_area: '',
            ins_type: ''
        };

        this.updateInspirations = this.updateInspirations.bind(this);
        this.handleInspirationsTypeChange = this.handleInspirationsTypeChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    updateInspirations() {
        // TODO: Use the type that is saved in the state. Connect it's value with the Gallery's (using event)
        console.log('Updateing inspirations...', 'tags:', this.state.tags, 'type:', this.state.ins_type);
        dbFuncs.getInspirationsFromDB(this.state.tags, this.state.ins_type)
            .then(data => this.setState({ inspirations: data }));
    }

    handleSearchSubmit(new_tags = '') {
        new_tags = new_tags.split(' ').join('');
        this.setState({ tags: new_tags }, () => {
            this.updateInspirations(new_tags, this.state.ins_type);
        });
    }

    handleInspirationsTypeChange(new_type = '') {
        new_type = (new_type === 'all') ? '' : new_type;
        this.setState({ ins_type: new_type }, () => {
            this.updateInspirations(this.state.search_area, new_type);
        });
    }

    render() {
        console.log('Homepage inspirations: ', this.state.inspirations);
        return (
            <div className="home-page">
                <Navigation />
                <SearchArea
                    inspireOnClick={this.handleSearchSubmit} />
                <Gallery
                    items={this.state.inspirations}
                    onFilterChange={this.handleInspirationsTypeChange} />
            </div>
        );
    }
}

export default HomePage;