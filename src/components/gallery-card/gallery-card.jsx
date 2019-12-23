import React from 'react';
import './gallery-card.scss'

const cardClickHandler = (url) => {
    console.log('Card clicked.');
    window.open(url, '_blank');
}

const GalleryCard = (props) => {
    //console.log(props);
    return (
        <div className="card" onClick={() => cardClickHandler(props.source)}>
            <div className="card-image"
            style={{
                backgroundImage: `url(${props.image})`
            }}
            alt="" />
            <div className="card-desc">
                <p className="title">{props.title}</p>
            </div>
        </div>
    );
}

export default GalleryCard;