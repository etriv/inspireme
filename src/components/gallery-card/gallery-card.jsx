import React from 'react';
import styled from 'styled-components';
import './gallery-card.scss'
import { mainColors5 as mainColors } from '../../modules/main-colors';

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



// ########## COMPONENT ########## //
class GalleryCard extends React.Component {

    render() {
        var borderTop = {
            borderTop: `3px solid ${this.props.likedByMe ? mainColors.c3 : mainColors.c2}`,
            transition: 'border-color 0.2s'
        }

        return (
            <div className="card">
                <div className="card-content">
                    <a href={this.props.source} className="card-image" target="_blank" rel="noopener noreferrer"
                        style={{
                            backgroundImage: `url(${this.props.image})`
                        }}
                        alt=""> </a>
                    <div className="card-desc" style={borderTop}>
                        <div className="title-info-container">
                            <p className="title">{this.props.title}</p>
                            <CardInfo>By: <u>{this.props.uploaderName}</u> on {this.props.added.split('T')[0]}</CardInfo>
                        </div>
                        <CardFooter>
                            {!this.props.likedByMe ?
                                <span className="like-btn"
                                    onClick={this.props.isSignedIn ? () => this.props.handleLikeClick(this.props.id, true) : null}
                                    style={!this.props.isSignedIn ? {cursor: 'default'} : null}
                                    role="img" aria-label="star">⭐</span>
                                :
                                <span className="like-btn pressed"
                                    onClick={this.props.isSignedIn ? () => this.props.handleLikeClick(this.props.id, false) : null}
                                    role="img" aria-label="bright-star">🌟</span>
                            }
                            <span className="like-counter"
                            style={this.props.likedByMe ? {color: 'black', fontWeight: 600} : null}>
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