import express from "express";
const app = express();

import showBanner from "node-banner";
import { connect } from "mongoose";
(async () => {
    await showBanner("Orders Microservice", "Create, Get, Delete orders.", "blue", "green");
})();

app.use(json()); //allows application to receive JSON data through request

connect("mongodb+srv://kali-denali:Axcvbn5@booksservice-ewcap.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
},
(err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the mongodb - Orders service!");
    }
});

var listener = app.listen(7777, () => {
    console.log("Up and running at port " + listener.address().port + " ! -- This is Orders service");
});