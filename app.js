const express = require("express");
const hbs = require("hbs");
const path = require("path");
const geocoding = require("./geocoding.js");
const weather = require("./weather.js");
const app = express();
app.set("view engine", "hbs");
let ViewsPath = path.join(__dirname, "Content/Views");
let PartialPath = path.join(__dirname, "Content/Partials");
app.set("views", ViewsPath);
hbs.registerPartials(PartialPath);
app.get("/", (req, res) => {
    res.render("index", { title: 'Home', name: 'tom' });
});
app.get("/weather", (req, res) => {
    let address = req.query.address;
    if (!address) {
        return res.send({ error:"Please enter an address" });
    }
    geocoding.getGeo(address, (error, { lat, lng } = {}) => {
        if (error) {
            return res.send({ error: error });
        }
        weather.forcast(lat, lng, (error, { request, location, current } = {}) => {
            if (error) {
                return res.send({ error: error });
            }
            let result = { temp: current.temperature, humidity: current.humidity };
            res.send(result);
        });
    });
});
app.listen(3000, () => { console.log("3000 Port is listeninig"); });