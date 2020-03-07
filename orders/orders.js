const express = require("express");
const app = express();

const showBanner = require("node-banner");
const mongoose = require("mongoose");
(async () => {
    await showBanner("Orders Microservice", "Create, Get, Delete orders.", "blue", "green");
})();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //allows application to receive JSON data through request

mongoose.connect("mongodb+srv://kali-denali:Axcvbn5@booksservice-ewcap.mongodb.net/test?retryWrites=true&w=majority", {
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

//Load Model
require("./Order");
const Order = mongoose.model("Order");

//Create new order
app.post("/order", (req, res) => {
    var newOrder = {
        customerID: mongoose.Types.ObjectId(req.body.customerID),
        bookID: mongoose.Types.ObjectId(req.body.bookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    };

    var order = new Order(newOrder);
    order.save().then(() => {
        res.send("New order created!");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

var listener = app.listen(7777, () => {
    console.log("Up and running at port " + listener.address().port + " -- This is Orders service");
});