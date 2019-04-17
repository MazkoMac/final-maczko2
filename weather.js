const request = require('request')



var getAddress = (address, callback) => {
    request({
        url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=5',
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to Google Maps')
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Cannot find requested address')
        } else {
            callback(undefined, {
                card: body.cards[0].image,
                card2: body.cards[1].image,
                card3: body.cards[2].image,
                card4: body.cards[3].image,
                card5: body.cards[4].image
            });
        }
    });
};




module.exports = {
    getAddress,
}