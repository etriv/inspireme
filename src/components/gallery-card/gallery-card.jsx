import React from 'react';
import styled from 'styled-components';
import './gallery-card.scss'
import { main_colors5 as main_colors } from '../../modules/main-colors';

// ########## STYLES ########## //
const CardFooter = styled.div`
    //border: 1px dotted purple;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    align-self: flex-end;
    margin: 0rem;
`;

const CardInfo = styled.div`
    //border: 1px dotted purple;
    font-family: 'Open Sans', sans-serif;
    font-size: 0.8rem;
    align-self: flex-start;
    margin: 0rem;
`;

const border_top = {
    borderTop: `3px solid ${main_colors.c2}`
}

// ########## COMPONENT ########## //
const GalleryCard = (props) => {
    console.log('Card props:', props);
    return (
        <div className="card">
            <div className="card-content">
                <a href={props.source} className="card-image" target="_blank" rel="noopener noreferrer"
                    style={{
                        backgroundImage: `url(${props.image})`
                    }}
                    alt=""> </a>
                <div className="card-desc" style={border_top}>
                    <div className="title-info-container">
                        <p className="title">{props.title}</p>
                        <CardInfo>By: <u>Muppet</u> on 01/06/2020</CardInfo>
                    </div>
                    <CardFooter>
                        <span role="img" aria-label="star">⭐</span>({props.likes})
                    </CardFooter>
                </div>
            
            </div>
        </div>
    );
}

export default GalleryCard;