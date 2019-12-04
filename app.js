const fs = require('fs');
const path = require('path');
const request = require('request');

const apiKey = 'N5YtIhtLmCZzgha9wVknDfpOKNbEcC1DwOCytxHm';
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
const imagePath = path.join(__dirname, 'images');

request(url, {json:true}, (err, res, body) => {
    if(err) return console.log(err);
    const imageUrl = body.hdurl;
    saveImage(imageUrl);
})

function saveImage(url) {
    request(url, (err, res, body) => {
        if(err) return console.log(err);
        console.log(res);
    })
}