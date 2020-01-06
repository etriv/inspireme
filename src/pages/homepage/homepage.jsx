import React from 'react';
import './homepage.scss';
import Navigation from '../../components/navigation/navigation';
import SearchArea from '../../components/search-area/search-area';
import Gallery from '../../components/gallery/gallery';

async function getInspirationsFromDB(tags = '', type = '') {
    console.log('Getting inspirations from DB ()...', tags, type);
    const data = await fetch('http://localhost:3001/inspirations/')
        .then(response => response.json())
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
        console.log('Updateing inspirations...', 'tags: ', tags, 'type: ', type);
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