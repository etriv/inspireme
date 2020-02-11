import React from 'react';
import styled from 'styled-components';
import './gallery-card.scss'
import ContentLoader from 'react-content-loader'
import { mainColors5 as mainColors } from '../../modules/main-colors';
import PropTypes from 'prop-types';

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

const ImgLoader = ({ className }) => (
    <ContentLoader viewBox="0 0 100 100"
        className={className}
        preserveAspectRatio="none"
        // backgroundColor={mainColors.c2}
        // foregroundColor={mainColors.c1}
        backgroundColor={'#f2f2f2'}
        foregroundColor={'#cccccc'}
        speed={2} >
        <rect x="0" y="0" width="100%" height="100%" />
    </ContentLoader>
)

const LikeButton = ({ inspId, liked, isSignedIn, onClick }) => {
    return !liked ?
        <span className="like-btn"
            onClick={isSignedIn ? () => onClick(inspId, true) : null}
            style={!isSignedIn ? { cursor: 'default' } : null}
            role="img" aria-label="star">⭐</span>
        :
        <span className="like-btn pressed"
            onClick={isSignedIn ? () => onClick(inspId, false) : null}
            role="img" aria-label="bright-star">🌟</span>
}

// ########## COMPONENT ########## //
class GalleryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgLoading: true
        }

        this.preloadImage(this.props.image);
    }

    onImageLoaded = (img) => {
        // console.log("The image has been loaded: " + this.props.title);
        this.setState({ imgLoading: false });
    }

    preloadImage = (src) => {
        var img = new Image();
        img.onload = () => { this.onImageLoaded(this) };
        img.src = src;
    }

    render() {
        var borderTop = {
            borderTop: `3px solid ${this.props.likedByMe ? mainColors.c3 : mainColors.c2}`,
            transition: 'border-color 0.2s'
        }

        return (
            <div className="card">
                <div className="card-content">
                    {this.state.imgLoading ?
                        <ImgLoader className="card-image" />
                        :
                        <a href={this.props.source} className="card-image" target="_blank" rel="noopener noreferrer"
                            style={{
                                backgroundImage: `url(${this.props.image})`
                            }}
                            alt=""> </a>
                    }
                    <div className="card-desc" style={borderTop}>
                        <div className="title-info-container">
                            <p className="title">{this.props.title}</p>
                            <CardInfo>By: <u>{this.props.uploaderName}</u> on {this.props.added.split('T')[0]}</CardInfo>
                        </div>
                        <CardFooter>
                            <LikeButton inspId={this.props.id}
                                liked={this.props.likedByMe}
                                isSignedIn={this.props.isSignedIn}
                                onClick={this.props.handleLikeClick} />
                            <span className="like-counter"
                                style={this.props.likedByMe ? { color: 'black', fontWeight: 600 } : null}>
                                {this.props.likes}
                            </span>
                        </CardFooter>
                    </div>

                </div>
            </div>
        );
    }
}

GalleryCard.propTypes = {
    image: PropTypes.string.isRequired,
    likedByMe: PropTypes.number,
    source: PropTypes.string,
    title: PropTypes.string,
    uploaderName: PropTypes.string,
    added: PropTypes.string,
    id: PropTypes.number,
    isSignedIn: PropTypes.bool,
    handleLikeClick: PropTypes.func,
    likes: PropTypes.number,
}

export default GalleryCard;