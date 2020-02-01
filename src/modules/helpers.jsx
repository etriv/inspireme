import isURL from 'validator/lib/isURL';

function onlyAlphaNum(str, allowedChars = []) {
    return str.match("^[A-Za-z0-9" + allowedChars.join('') + "]+$");
}

function parseVideoURL(url) {
    // - Supported YouTube URL formats:
    //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
    //   - http://youtu.be/My2FRPA3Gf8
    //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
    //   - https://m.youtube.com/watch?v=My2FRPA3Gf8
    // - Supported Vimeo URL formats:
    //   - http://vimeo.com/25451551
    //   - http://player.vimeo.com/video/25451551
    // - Also supports relative URLs:
    //   - //player.vimeo.com/video/25451551

    let res = url.match(/(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/);

    let type = '';
    let id = '';
    if (res) {
        if (res[3].indexOf('youtu') > -1) {
            type = 'youtube';
            id = res[6];
        } else if (res[3].indexOf('vimeo') > -1) {
            type = 'vimeo';
            id = res[6];
        }
    }

    return {
        type: type,
        id: id
    };
}

function getVimeoThumbnail(vimeoId) {
    let fetchUrl = "https://vimeo.com/api/v2/video/" + vimeoId + ".json";
    return fetch(fetchUrl, {
        method: 'get'
    })
        .then(response => response.status === 200 ? response.json() : '')
        .then(data => {
            if (data[0]) {
                return data[0].thumbnail_large;
            }
            else {
                throw new Error(data);
            }
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

function getYouTubeThumbnail(youTubeId) {
    return 'https://img.youtube.com/vi/' + youTubeId + '/sddefault.jpg'
}

function isImageURL(url) {
    const endings = ['.png', '.jpg', '.jpeg', '.tiff', '.gif', '.bmp'];
    return endings.some(end => url.endsWith(end));
}

export { onlyAlphaNum, parseVideoURL, getVimeoThumbnail, getYouTubeThumbnail, isImageURL, isURL }