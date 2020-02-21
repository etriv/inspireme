import React from 'react';
import './get-inspirations.scss';
import * as dbFuncs from '../../modules/server-manager';
import SearchArea from '../../components/search-area/search-area';
import Gallery from '../../components/gallery/gallery';
import SquareLoader from "react-spinners/SquareLoader";
import cat from '../../images/cat-1583459.png';

class GetInspirations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inspirations: [],
            tags: '',
            insType: '',
            orderBy: 'likes_desc',
            showOnlyLiked: false,
            displayGallery: false,
            fetching: false,
            noResults: false,
            maxInsp: 15
        };
    }

    updateInspirations = () => {
        // console.log('Updating inspirations...', 'tags:', this.state.tags, 'type:', this.state.insType);
        this.setState({ fetching: true });
        const type = this.state.insType;
        dbFuncs.getInspirationsFromDB(this.state.tags, type, this.state.orderBy, this.props.signedInUser.id, this.props.showOnlyLiked, this.state.maxInsp)
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    this.setState({
                        inspirations: data,
                        fetching: false,
                        displayGallery: true,
                        noResults: false
                    })
                }
                else {
                    this.setState({
                        fetching: false,
                        displayGallery: false,
                        noResults: true
                    })
                }
            });
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
            // this.updateInspirations(); // No need for another fetch, we'll just filter localy
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
        // Commenting out code below because it's better to present inspirations on startup
        // if (this.props.showOnlyLiked && this.props.signedInUser.id !== '') {
        //     this.updateInspirations();
        // }
        this.updateInspirations();
    }

    render() {
        // console.log('GetInspirations rendering: ', this.state.inspirations);
        let inspirations = this.state.inspirations;
        if (this.state.insType !== '') {
            inspirations = inspirations.filter(insp => insp.type === this.state.insType);
        }

        return (
            <div className="get-inspirations">
                <SearchArea
                    likedMode={this.props.showOnlyLiked}
                    onSearchBoxChange={this.handleSearchBoxChange}
                    onSearchClick={this.onSearchSubmit} />
                {this.state.displayGallery ?
                    <Gallery
                        items={inspirations}
                        signedInUser={this.props.signedInUser}
                        onFilterChange={this.handleInspirationsTypeChange}
                        handleLikedInspiration={this.handleLikedInspiration}
                        onSortChange={this.handleSortChange} />
                    : null}
                {this.state.noResults ?
                    <div className="no-results">
                        <div className="no-results-text">Found no results for your search...</div>
                        <img src={cat} alt="Cat" className="cat" />
                    </div>
                    : null}
                {this.state.fetching ?
                    <div className="cool-loading">
                        <SquareLoader
                            css={"margin: 3rem auto"}
                            size={250}
                            color={"#49beb7"}
                        />
                    </div>
                    : null}
            </div>
        );
    }
}

export default GetInspirations;