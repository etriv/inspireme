import React from 'react';
import './gallery.scss'
import GalleryFilters from '../gallery-filters/gallery-filters'

const Gallery = () => {
    return (
        <div className="gallery-container">
            <GalleryFilters />
            <p>Gallery items...</p>
        </div>
    );
}

export default Gallery;