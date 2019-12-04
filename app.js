const fs = require('fs');
const path = require('path');
const request = require('request');

const apiKey = 'YOUR API KEY'; //check out README.md to get your NASA Open API Key
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

request(url, {json:true}, (err, res, body) => {
    if(err) return console.log(err);
    const imageUrl = body.hdurl;
    saveImage(imageUrl);
})

function saveImage(url) {
    let file;
    request.head(url, (err, res, body) => {
        if(err) return console.log(err);
        if(res.headers['content-type'] === 'image/jpeg')
        {
             file = fs.createWriteStream('image.jpeg');
        }
        else if(res.headers['content-type'] === 'image/jpg') 
        {
             file = fs.createWriteStream('image.jpg');
        }
        else if(res.headers['content-type'] === 'image/png') 
        {
             file = fs.createWriteStream('image.png');
        }
        else
        {
            console.log('Wrong Content Type ! Its not a valid image !');
        }
        request(url).pipe(file);
    })
}