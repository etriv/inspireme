import React from 'react';
import './homepage.scss';
import Navigation from '../../components/navigation/navigation';
import SearchArea from '../../components/search-area/search-area';
import Gallery from '../../components/gallery/gallery';

const HomePage = () => {
    return (
        <div className="home-page">
            <Navigation />
            <SearchArea />
            <Gallery />
        </div>
    );
}

export default HomePage;