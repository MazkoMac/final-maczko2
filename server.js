const express = require('express');
const request = require('request');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');

const weather = require('./weather')
const images = require('./images')


var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
    response.render('home.hbs', {
        title: 'Images',
    })
})


app.post('/', (request, response) => {
    images.getImages(request.body.keyword, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            response.render('home.hbs', {
                title: 'Images',
                img1: results.image,
                img2: results.image1,
                img3: results.image2
            });
        }
    })
});


app.get('/weather', (request, response) => {
    response.render('weather.hbs', {
        title: 'Weather'
    })
})

app.post('/weather', (request, response) => {
    console.log("test")
    weather.getAddress(request.body, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            console.log(results.card)
            response.render('weather.hbs', {
                title: 'Cards',
                card1: results.card,
                card2: results.card2,
                card3: results.card3,
                card4: results.card4,
                card5: results.card5,
            });
        }
    })
});


app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});