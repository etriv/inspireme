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
            orderBy: 'likes_desc',
            showOnlyLiked: false,
            displayGallery: false
        };
    }

    updateInspirations= () => {
        console.log('Updating inspirations...', 'tags:', this.state.tags, 'type:', this.state.insType);
        const type = this.state.insType !== 'all' ? this.state.insType : '';
        dbFuncs.getInspirationsFromDB(this.state.tags, type, this.state.orderBy, this.props.signedInUser.id, this.props.showOnlyLiked)
            .then(data => this.setState({ inspirations: data }, () => {
                console.log('Fetched inspirations:', this.state.inspirations);
                this.state.inspirations.length > 0 ?
                    this.setState({ displayGallery: true })
                    : this.setState({ displayGallery: true }); // this.setState({displayGallery: false});
                // TODO: When there is nothing to show, hide gallery - only with better filtering algorithem
                // Present a proper message (with a cute image) of 'No matching results' / 'No inspiration here...'
            }));
    }

    onSearchSubmit = (searchBox = '') => {
        const newTags = searchBox.split(' ').join('').toLowerCase();
        this.setState({ tags: newTags }, () => {
            this.updateInspirations();
        });
    }

    handleInspirationsTypeChange = (newType = '') => {
        newType = (newType === 'all') ? '' : newType;
        this.setState({ insType: newType }, () => {
            this.updateInspirations();
        });
    }

    handleSearchBoxChange = (newTags = '') => {
        newTags = newTags.split(' ').join('').toLowerCase();
        this.setState({ tags: newTags });
    }

    handleSortChange = (newOrderBy) => {
        this.setState({ orderBy: newOrderBy }, () => {
            this.updateInspirations();
        });
    }

    handleLikedInspiration = (inspirationId, like = true) => {
        if (this.props.signedInUser.id === '') return;

        dbFuncs.likeInspirationInDB(this.props.signedInUser.id, inspirationId, like);

        this.likeInspirationInState(inspirationId, like);
    }

    likeInspirationInState = (inspirationId, like = true) => {
        this.setState(prevState => ({
            inspirations: prevState.inspirations.map(
                el => el.id === inspirationId ? {
                    ...el,
                    likes: like ? el.likes + 1 : el.likes - 1,
                    likedByMe: like ? 1 : null                // The number 1 is arbitrary
                }
                    : el
            )
        }));
    }

    componentDidMount() {
        if (this.props.showOnlyLiked && this.props.signedInUser.id !== '') {
            this.updateInspirations();
        }
    }

    render() {
        // console.log('GetInspirations rendering: ', this.state.inspirations);
        return (
            <div className="get-inspirations">
                <SearchArea
                    likedMode={this.props.showOnlyLiked}
                    onSearchBoxChange={this.handleSearchBoxChange}
                    onSearchClick={this.onSearchSubmit} />
                {this.state.displayGallery ?
                    <Gallery
                        items={this.state.inspirations}
                        signedInUser={this.props.signedInUser}
                        onFilterChange={this.handleInspirationsTypeChange}
                        handleLikedInspiration={this.handleLikedInspiration}
                        onSortChange={this.handleSortChange} />
                    : null}
            </div>
        );
    }
}

export default GetInspirations;