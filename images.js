const request = require('request');

var getImages = (keyword, callback) => {
    request({
        url: `https://images-api.nasa.gov/search?q=${encodeURIComponent(keyword)}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to NASA');
        } else if (body.totalHits == 0) {
            callback('Cannot find image');
        } else if (body.totalHits != 0) {
            console.log(body.collection.items[1].links[0].href)
            callback(undefined, {
                image: body.collection.items[1].links[0].href,
                image1: body.collection.items[2].links[0].href,
                image2: body.collection.items[3].links[0].href
            });
        }
    });
};

module.exports = {
    getImages
};