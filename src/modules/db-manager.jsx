const serverUrl = 'http://localhost:3001'

async function checkUserSignInFromDB(name, password) {

}

async function registerUserToDB(name, password) {
    console.log('Registering new user to DB...', name);
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
        throw new Error("Couldn't register user: " + name + ". Info: " + error.message);
    });
}

async function getInspirationsFromDB(tags = '', type = '', sort_by = '') {
    // console.log('Getting inspirations from DB ()...', 'tags:', tags, 'type:', type);
    let fetchUrl = serverUrl + '/inspirations/';
    if (tags !== '' || type !== '') {
        fetchUrl += '?';
        fetchUrl += tags !== '' ? '&tags=' + tags : '';
        fetchUrl += type !== '' ? '&type=' + type : '';
        fetchUrl += type !== '' ? '&sort=' + sort_by : '';
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

export { getInspirationsFromDB, registerUserToDB , checkUserSignInFromDB};