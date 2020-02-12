const serverUrl = 'http://localhost:3001'
// const serverUrl = 'https://inspireme2server.herokuapp.com'

// Updates the DB according to the like that was done
// Returns bool regrading the success of the proccess
async function likeInspirationInDB(userId, inspirationId, like = true) {
    // console.log('Liking inspiration...', userId, inspirationId, like);
    let fetchUrl = serverUrl;
    if (like)
        fetchUrl += '/like';
    else
        fetchUrl += '/dislike';

    return fetch(fetchUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            inspId: inspirationId
        })
    })
    .then(response => {
        // console.log(response.status);
        return true;
    })
    .catch(error => {
        throw new Error(error.message);
    });
}

async function checkUserSignInFromDB(name, password) {
    // console.log('Checking user sign-in data in DB...', name);
    let fetchUrl = serverUrl + '/signin';
    return fetch(fetchUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            password: password
        })
    })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                return user;
            }
            else {
                throw new Error(user);
            }
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

async function registerUserToDB(name, password) {
    // console.log('Registering new user to DB...', name);
    let fetchUrl = serverUrl + '/register';
    return fetch(fetchUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            password: password
        })
    })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                return user;
            }
            else {
                throw new Error(user);
            }
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

//{ title, source, image, userId, tags, type }
async function uploadInspirationToDB(title, source, tags, image, type, userId) {
    // console.log('Uploading new inspiration...', title, userId);
    let fetchUrl = serverUrl + '/inspirations';
    return fetch(fetchUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            source,
            tags,
            image,
            type,
            userId
        })
    })
        .then(response => {
            if (response.status === 200) {
                return 'Upload succeeded';
            }
            else {
                throw new Error('Upload failed');
            }
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

async function getInspirationsFromDB(tags = '', type = '', orderBy = '', curUserId = '', showOnlyLiked = false) {
    // console.log('Getting inspirations from DB ()...', tags, type, orderBy, curUserId);
    let fetchUrl = serverUrl + '/inspirations/';
    if (tags !== '' || type !== '' || orderBy !== '' || curUserId !== '') {
        fetchUrl += '?';
        fetchUrl += (tags !== '') ? '&tags=' + tags : '';
        fetchUrl += (type !== '') ? '&type=' + type : '';
        fetchUrl += (orderBy !== '') ? '&order=' + orderBy : '';
        fetchUrl += (curUserId !== '') ? '&curUser=' + curUserId : '';
        fetchUrl += (showOnlyLiked) ? '&onlyLiked=' + showOnlyLiked : '';
    }
    // console.log('Fetching:', fetchUrl);
    return fetch(fetchUrl)
        .then(response => {
            if (response.status === 200)
                return response.json();
            // console.log('Response status is not OK');
            return [];
        })
        .catch((e) => {
            // console.log('Error while fetching inspirations:', e);
            return [];
        });
}

async function checkContentType(url) {
    // localhost:3001/check/content-type
    let fetchUrl = serverUrl + '/check/content-type';
    return fetch(fetchUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            url: url
        })
    })
        .then(response => response.json())
        .then(res => {
            return res;
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

export { getInspirationsFromDB, registerUserToDB,
    checkUserSignInFromDB, likeInspirationInDB,
    uploadInspirationToDB, checkContentType };