import React from 'react';
import './homepage.scss';
import Navigation from '../../components/navigation/navigation';
import SearchArea from '../../components/search-area/search-area';
import Gallery from '../../components/gallery/gallery';

async function getInspirationsFromDB(tags = '', type = '') {
    console.log('Getting inspirations from DB ()...', 'tags:', tags, 'type:', type);
    let fetchUrl = 'http://localhost:3001/inspirations/';
    if (tags !== '' || type !== '') {
        fetchUrl += '?';
        fetchUrl += tags !== '' ? '&tags=' + tags : '';
        fetchUrl += type !== '' ? '&type=' + type : '';
    }
    console.log('Fetching:', fetchUrl);
    let data = await fetch(fetchUrl)
        .then(response => {
            if (response.status === 200)
                return response.json();
            console.log('Response status is not OK');
            return [];
        })
        .catch((e) => {
            console.log('Error while fetching inspirations:', e);
            return [];
        })
    return data;
}

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

    updateInspirations(tags = '', type = '') {
        // TODO: Use the type that is saved in the state. Connect it's value with the Gallery's (using event)
        console.log('Updateing inspirations...', 'tags:', tags, 'type:', this.state.ins_type);
        getInspirationsFromDB(tags, type)
            .then(data => this.setState({ inspirations: data }));
    }

    handleSearchSubmit(new_tags = '') {
        this.setState({ tags: new_tags });
        this.updateInspirations(new_tags, this.state.ins_type);
    }

    handleInspirationsTypeChange(new_type = '') {
        this.setState({ type: new_type });
        this.updateInspirations(this.state.search_area, new_type);
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