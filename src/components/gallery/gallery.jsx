import React, { Component } from 'react';
import './gallery.scss'
import GalleryFilters from '../gallery-filters/gallery-filters'
import galleryData from './gallery-data';
import GalleryCard from '../gallery-card/gallery-card';

class Gallery extends Component {
    state = {
        items: galleryData
    }
    
    render() {
        console.log(this.state.items);
        return (
            <div className="gallery-container">
                <GalleryFilters />
                <div className="cards-container">
                {
                    galleryData.map((item) => {
                        return (
                            <div key={item.id} className="card-container">
                                <GalleryCard {...item} />
                            </div>
                        )
                    })
                }
                </div>
            </div>
        );
    }
}

export default Gallery;