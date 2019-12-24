import React from 'react';
import './gallery-card.scss'

// const cardClickHandler = (url) => {
//     console.log('Card clicked.');
//     window.open(url, '_blank');
// }

const GalleryCard = (props) => {
    //console.log(props);
    return (
        <div className="card">
            <a href={props.source} className="card-content" target="_blank" rel="noopener noreferrer">
                    <div className="card-image"
                    style={{
                        backgroundImage: `url(${props.image})`
                    }}
                    alt="" />
                    <div className="card-desc">
                        <p className="title">{props.title}</p>
                    </div>
            </a>
        </div>
    );
}

export default GalleryCard;