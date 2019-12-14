import React, { Component } from 'react';
import './gallery.scss'
import GalleryFilters from '../gallery-filters/gallery-filters'
import galleryData from './gallery-data';

class Gallery extends Component {
    state = {
        items: galleryData
    }
    
    render() {
        console.log(this.state.items);
        return (
            <div className="gallery-container">
                <GalleryFilters />
                <p>Gallery items...</p>
            </div>
        );
    }
}

export default Gallery;