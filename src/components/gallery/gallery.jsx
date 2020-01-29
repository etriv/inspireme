import React, { Component } from 'react';
import './gallery.scss'
import GalleryFilters from '../gallery-filters/gallery-filters'
// import galleryData from './gallery-data';
import GalleryCard from '../gallery-card/gallery-card';
import FadeIn from "../fade-in/fade-in";

class Gallery extends Component {
    handleLikeClick = (userId, inspirationID, like = true) => {
        // Updates the DB by the given paramaters.
        // This function will be given to each card.    
        // TODO: Make sure inspirations returned from DB have extra filled of 'liked_by_me'
        
    }
    
    render() {
        // console.log('Gallery items: ', this.props.items);
        const isSignedIn = (this.props.signedInUser.id !== '');

        return (
            <div className="gallery-container">
                <FadeIn className='filters-style'>
                    <GalleryFilters onFilterChange={this.props.onFilterChange} />
                </FadeIn>
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