import React from 'react';
import './get-inspirations.scss';
import * as dbFuncs from '../../modules/db-manager';
import SearchArea from '../../components/search-area/search-area';
import Gallery from '../../components/gallery/gallery';

class GetInspirations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inspirations: [],
            tags: '',
            insType: 'all',
            sortBy: 'rating_desc',
            displayGallery: false
        };

        this.updateInspirations = this.updateInspirations.bind(this);
        this.handleInspirationsTypeChange = this.handleInspirationsTypeChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.handleLikedInspiration = this.handleLikedInspiration.bind(this);
    }

    // Updates gallery inspirations using tags and type of inspirations.
    // TODO: should also user userId to flag already liked inspirations.
    updateInspirations() {
        console.log('Updating inspirations...', 'tags:', this.state.tags, 'type:', this.state.insType);
        const type = this.state.insType !== 'all' ? this.state.insType : '';
        dbFuncs.getInspirationsFromDB(this.state.tags, type, '', this.props.signedInUser.id)
            .then(data => this.setState({ inspirations: data }, () => {
                console.log('Fetched inspirations:', this.state.inspirations);
                this.state.inspirations.length > 0 ?
                    this.setState({ displayGallery: true })
                    : this.setState({ displayGallery: true }); // this.setState({displayGallery: false});
                // TODO: When there is nothing to show, hide gallery - only with better filtering algorithem
                // Present a proper message (with a cute image) of 'No matching results' / 'No inspiration here...'
            }));
    }

    handleSearchSubmit(searchBox = '') {
        const newTags = searchBox.split(' ').join('').toLowerCase();
        this.setState({ tags: newTags }, () => {
            // console.log('Updated new tags after submit. Going to fetch...');
            this.updateInspirations(newTags, this.state.insType);
        });
    }

    handleInspirationsTypeChange(newType = '') {
        newType = (newType === 'all') ? '' : newType;
        this.setState({ insType: newType }, () => {
            this.updateInspirations(this.state.tags, newType);
        });
    }

    handleSearchBoxChange(newTags = '') {
        newTags = newTags.split(' ').join('').toLowerCase();
        this.setState({ tags: newTags });
    }

    handleLikedInspiration(inspirationId, like = true) {
        if (this.props.signedInUser.id === '') return;

        dbFuncs.likeInspirationInDB(this.props.signedInUser.id, inspirationId, like);

        this.likeInspirationInState(inspirationId, like);
    }

    likeInspirationInState(inspirationId, like = true) {
        this.setState(prevState => ({
            inspirations: prevState.inspirations.map(
                el => el.id === inspirationId ? {
                    ...el,
                    likes: like ? el.likes + 1 : el.likes - 1,
                    likedByMe: like ? 1 : null                // The number is arbitrary
                }
                    : el
            )
        }));
    }

    render() {
        // console.log('GetInspirations rendering: ', this.state.inspirations);
        return (
            <div className="get-inspirations">
                <SearchArea
                    onSearchBoxChange={this.handleSearchBoxChange}
                    inspireOnClick={this.handleSearchSubmit} />
                {this.state.displayGallery ?
                    <Gallery
                        items={this.state.inspirations}
                        onFilterChange={this.handleInspirationsTypeChange}
                        handleLikedInspiration={this.handleLikedInspiration}
                        signedInUser={this.props.signedInUser} />
                    : null}
            </div>
        );
    }
}

export default GetInspirations;