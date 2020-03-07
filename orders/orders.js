const express = require("express");
const app = express();

const axios = require("axios");
const showBanner = require("node-banner");
(async () => {
    await showBanner("Orders Microservice", "Create, Get, Delete orders.", "blue", "green");
})();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //allows application to receive JSON data through request

const mongoose = require("mongoose");
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

//Get all orders
app.get("/orders", (req, res) => {
    Order.find().then((orders) => {
        res.json(orders);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

//Get order by id
app.get("/order/:id", (req, res) => {
    Order.findById(req.params.id).then((order) => {
        if (order) {
            axios.get("http://localhost:5555/customer/" + order.customerID).then((response) => {
                var orderObject = {
                    customerName: response.data.name,
                    bookTitle: ''
                };

                axios.get("http://localhost:3000/book/" + order.bookID).then((response) => {
                    orderObject.bookTitle = response.data.title;
                    res.json(orderObject);
                });
            });
        } else {
            res.send("Invalid order ID");
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

var listener = app.listen(7777, () => {
    console.log("Up and running at port " + listener.address().port + " -- This is Orders service");
});