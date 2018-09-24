const axios = require('axios');
//const request = require('request');

const argv = require('./config/yargs').argv;

//let encodedURL = encodeURI(argv.direccion);
let encodedURL = "cali colombia";

//console.log(argv.direccion);

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI`)
.then( (resp) => {
    console.log(JSON.stringify(resp, undefined, 2));
})
.catch( err => console.log(`Error !!! - ${err}`));



axios(
    {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyASFjCYandCuhHpE-CEFuHxPSdncVz-3Go`,
        timeout: 1000
    }
)
.then( (resp) => {
    console.log(JSON.stringify(resp, undefined, 2));
})
.catch( err => console.log(`Error !!! - ${err}`));





// request(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI`, (err, response, body) => {
//     console.log('error: ', err);
//     console.log('statuscode: ', response && response.statusCode);
//     console.log('body: ', body);
// });

// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });



axios.get(`https://blog-api-u.herokuapp.com/v1/posts/`)
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.error(error);
});




axios(
    {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyASFjCYandCuhHpE-CEFuHxPSdncVz-3Go`,
        timeout: 3000
    }
)
.then( (resp) => {
    console.log(JSON.stringify(resp.results, undefined, 2));
})
.catch( err => console.log(`Error !!! - ${err}`));