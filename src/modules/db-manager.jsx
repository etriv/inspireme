const serverUrl = 'http://localhost:3001'

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
            user_id: userId,
            insp_id: inspirationId
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

async function getInspirationsFromDB(tags = '', type = '', sort_by = '', cur_user_id = '') {
    // console.log('Getting inspirations from DB ()...', 'tags:', tags, 'type:', type);
    let fetchUrl = serverUrl + '/inspirations/';
    if (tags !== '' || type !== '' || sort_by !== '' || cur_user_id !== '') {
        fetchUrl += '?';
        fetchUrl += (tags !== '') ? '&tags=' + tags : '';
        fetchUrl += (type !== '') ? '&type=' + type : '';
        fetchUrl += (sort_by !== '') ? '&sort=' + sort_by : '';
        fetchUrl += (cur_user_id !== '') ? '&cur_user=' + cur_user_id : '';
    }
    console.log('Fetching:', fetchUrl);
    return fetch(fetchUrl)
        .then(response => {
            if (response.status === 200)
                return response.json();
            console.log('Response status is not OK');
            return [];
        })
        .catch((e) => {
            console.log('Error while fetching inspirations:', e);
            return [];
        });
}

export { getInspirationsFromDB, registerUserToDB, checkUserSignInFromDB, likeInspirationInDB };