const axios = require('axios');
//const request = require('request');

const apiKeys = require('./config/keys.json');

//Keys APIs
let keyBigMap = apiKeys.keyBigMaps;

const obtenerDatosDireccion = async (direccion, pais, ciudad) => {
    //let encodedURL = encodeURI(argv.direccion);    
    let encodeURL = `CountryRegion=${pais}&locality=${ciudad}`;

    // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyA-HXVa2jtkGfKtIJwisxgC46RaWqC1xuI`)
    // .then( (resp) => {
    //     console.log(JSON.stringify(resp, undefined, 2));
    // })
    // .catch( err => console.log(`Error !!! - ${err}`));
    
    
    // axios(
    //     {
    //         method: 'get',
    //         url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyASFjCYandCuhHpE-CEFuHxPSdncVz-3Go`,
    //         timeout: 1000
    //     }
    // )
    // .then( (resp) => {
    //     console.log(JSON.stringify(resp, undefined, 2));
    // })
    // .catch( err => console.log(`Error !!! - ${err}`));
    
    
    
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
    
    
    
    // axios.get(`https://blog-api-u.herokuapp.com/v1/posts/`)
    // .then((response) => {
    //     console.log(response.data);
    // })
    // .catch((error) => {
    //     console.error(error);
    // });
    
    
    // axios(
    //     {
    //         method: 'get',
    //         url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURL}&key=AIzaSyASFjCYandCuhHpE-CEFuHxPSdncVz-3Go`,
    //         timeout: 3000
    //     }
    // )
    // .then( (resp) => {
    //     console.log(JSON.stringify(resp.results, undefined, 2));
    // })
    // .catch( err => console.log(`Error !!! - ${err}`));
    
    try {
        let resp = await axios(
            {
                method: 'get',
                url: `https://dev.virtualearth.net/REST/v1/Locations?${encodeURL}&key=${keyBigMap}`,
                timeout: 2000
            }
        )
        
        let infoLocality = {};
    
        infoLocality.statusCode = resp.data.statusCode;
    
        if(resp.data.resourceSets[0] !== undefined 
        && resp.data.resourceSets[0] !== null){
            if(resp.data.resourceSets[0].estimatedTotal > 0 ){
                infoLocality.findPlace = true;
                infoLocality.address = resp.data.resourceSets[0].resources[0].address.formattedAddress;
                infoLocality.latitude = resp.data.resourceSets[0].resources[0].point.coordinates[0];
                infoLocality.longitude = resp.data.resourceSets[0].resources[0].point.coordinates[1];
            }
            else{
                infoLocality.findPlace = false;
                infoLocality.address = '';
                infoLocality.latitude = 0;
                infoLocality.longitude = 0;
            }
        }
    
        //console.log(infoLocality);
        //console.log(JSON.stringify(resp, undefined, 2));
        
        return infoLocality;
        
    } catch (error) {
        console.log(`Error !!! - ${error}`);
    }
}

module.exports = {
    obtenerDatosDireccion
}

