import React from 'react';
import './liked-page.scss';
import GetInspirations from '../get-inspirations/get-inspirations';

class LikedPage extends React.Component {
    // Use generic GetInspirations
    
    render() {
        return (
            <GetInspirations {...this.props} />
        )
    }
}

export default LikedPage;
/*
This page is very similar to HomePage.
Should improve GetInspirationsPage to be a bit generic:
with options for small search area, and fast inspirations fetching.

*/