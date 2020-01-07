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
            inspirations: []
        };

        this.updateInspirations = this.updateInspirations.bind(this);
    }

    updateInspirations(tags = '', type = '') {
        console.log('Updateing inspirations...', 'tags:', tags, 'type:', type);
        getInspirationsFromDB(tags, type)
            .then(data => this.setState({inspirations: data}));
    }

    render() {
        console.log('Homepage inspirations: ', this.state.inspirations);
        return (
            <div className="home-page">
                <Navigation />
                <SearchArea inspireOnClick={this.updateInspirations} />
                <Gallery items={this.state.inspirations} />
            </div>
        );
    }
}

export default HomePage;