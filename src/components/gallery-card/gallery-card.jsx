import React from 'react';
import './gallery-card.scss'

const GalleryCard = (props) => {
    //console.log(props);
    return (
        <div className="card">
            <a className="card-link" href={props.source} target="_blank" rel="noopener noreferrer">
                <div className="card-image"
                style={{
                    backgroundImage: `url(${props.image})`
                }}
                alt="" />
            </a>
            <div className="card-desc">
                <h4><b>{props.title}</b></h4>
                <p>{props.text}</p>
            </div>
        </div>
    );
}

export default GalleryCard;