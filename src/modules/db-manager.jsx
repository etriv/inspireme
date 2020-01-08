async function getInspirationsFromDB(tags = '', type = '') {
    console.log('Getting inspirations from DB ()...', 'tags:', tags, 'type:', type);
    let fetchUrl = 'http://localhost:3001/inspirations/';
    if (tags !== '' || type !== '') {
        fetchUrl += '?';
        fetchUrl += tags !== '' ? '&tags=' + tags : '';
        fetchUrl += type !== '' ? '&type=' + type : '';
    }
    console.log('Fetching:', fetchUrl);
    let data = await fetch(fetchUrl)
        .then(response => {
            if (response.status === 200)
                return response.json();
            console.log('Response status is not OK');
            return [];
        })
        .catch((e) => {
            console.log('Error while fetching inspirations:', e);
            return [];
        })
    return data;
}

export { getInspirationsFromDB };