import React, { Component } from 'react';
import './gallery.scss'
import GalleryFilters from '../gallery-filters/gallery-filters'
// import galleryData from './gallery-data';
import GalleryCard from '../gallery-card/gallery-card';

class Gallery extends Component {
    render() {
        // console.log('Gallery items: ', this.props.items);
        return (
            <div className="gallery-container">
                <GalleryFilters />
                <div className="cards-container">
                {
                    this.props.items.map((item) => {
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