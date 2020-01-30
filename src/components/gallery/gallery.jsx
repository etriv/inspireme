import React, { Component } from 'react';
import './gallery.scss'
import GalleryFilters from '../gallery-filters/gallery-filters'
import GalleryCard from '../gallery-card/gallery-card';
// import FadeIn from "../fade-in/fade-in";

class Gallery extends Component {
    render() {
        // console.log('Gallery items: ', this.props.items);
        const isSignedIn = (this.props.signedInUser.id !== '');

        return (
            <div className="gallery-container">
                <div className='filters-style'>
                    <GalleryFilters onFilterChange={this.props.onFilterChange} />
                </div>
                <div className="cards-container">
                {
                    this.props.items.map((item) => {
                        return (
                            <div key={item.id} className="card-container">
                                <GalleryCard {...item}
                                    isSignedIn={isSignedIn}
                                    handleLikeClick={this.props.handleLikedInspiration} />
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