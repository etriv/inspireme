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
class GalleryCard extends React.Component {
    // console.log('Card props:', props);
    state = {
        liked: false
    }

    handleLikeClick = () => {
        this.setState({ liked: !this.state.liked });
    }

    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <a href={this.props.source} className="card-image" target="_blank" rel="noopener noreferrer"
                        style={{
                            backgroundImage: `url(${this.props.image})`
                        }}
                        alt=""> </a>
                    <div className="card-desc" style={border_top}>
                        <div className="title-info-container">
                            <p className="title">{this.props.title}</p>
                            <CardInfo>By: <u>{this.props.user_name}</u> on {this.props.added.split('T')[0]}</CardInfo>
                        </div>
                        <CardFooter>
                            {!this.state.liked ?
                                <span className="like-btn"
                                    onClick={this.handleLikeClick}
                                    role="img" aria-label="star">⭐</span>
                                :
                                <span className="like-btn"
                                    onClick={this.handleLikeClick}
                                    role="img" aria-label="bright-star">🌟</span>
                            }
                            <span className="like-counter"
                            style={this.state.liked ? {color: 'black', fontWeight: 600} : null}>
                                {this.props.likes}
                            </span>
                        </CardFooter>
                    </div>

                </div>
            </div>
        );
    }
}

export default GalleryCard;