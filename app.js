const express = require("express");
const hbs = require("hbs");
const path = require("path");
const geocoding = require("./geocoding.js");
const weather = require("./weather.js");
const app = express();
const port = process.env.PORT||3000;
app.set("view engine", "hbs");
let ViewsPath = path.join(__dirname, "Content/Views");
let PartialPath = path.join(__dirname, "Content/Partials");
app.set("views", ViewsPath);
hbs.registerPartials(PartialPath);
app.get("/", (req, res) => {
    res.render("index", { title: 'Home', name: 'tom' });
});
app.get("/about", (req, res) => {
    res.render("about", { title: 'Home', name: 'tom' });
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
app.listen(port, () => { console.log(" Port is listeninig ", port); });