const request = require("request");
const getWeather = (lat, lng, callback) => {
    let url = "http://api.weatherstack.com/current?access_key=840cbee675f15f9f018bb3191aefcfec&query=" + lat + "," + lng + "";
    request.get({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log(error);
            callback("Internal error", undefined);
        }
        else if (response.body.error) {
            console.log(response.body.error);
            callback("Internal error", undefined);
        }
        else {
            callback(undefined, response.body);
        }
    });
};
module.exports = {
    forcast: getWeather
};