const request = require("request");
const getGeo = (address,callback) => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoidG9td3UwMDEiLCJhIjoiY2s4cXljeDJ2MDk1azNmcG1iMnR3ZWl1diJ9.W-ohFIAF1JUbSE78O8wCnA&limit=1";
    request.get({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log(error);
            callback("Internal error 500", undefined);
        }
        else if (response.body.features === 0) {
            callback("location not found", undefined);
        }
        else {
            let results = response.body.features[0].center;
            let lat = results[1];
            let lng = results[0];
            callback(undefined, { lat: lat, lng: lng });
        }
    });
};

module.exports = {
    getGeo: getGeo
};