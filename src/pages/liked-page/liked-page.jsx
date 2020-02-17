import React from 'react';
import './liked-page.scss';
import GetInspirations from '../get-inspirations/get-inspirations';

class LikedPage extends React.Component {
    render() {
        return (
            <GetInspirations {...this.props} showOnlyLiked={true} />
        )
    }
}

export default LikedPage;
