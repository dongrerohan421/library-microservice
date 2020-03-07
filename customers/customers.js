import express from "express";
const app = express();
import showBanner from "node-banner";
(async () => {
    await showBanner("Customers Microservice", "Create, Get, Delete Customers.", "blue", "green");
})();
//Load Mongoose
import { connect, model } from "mongoose";
import { json } from "body-parser";

app.use(json()); //allows application to receive JSON data through request

//Connect
connect("mongodb+srv://kali-denali:Axcvbn5@booksservice-ewcap.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to the mongodb - Customers service!");
        }
    });

//Load out Model
import "./customer";
const Customer = model("Customer");

//Create Customer
app.post("/customer", (req, res) => {
    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
    };

    var customer = new Customer(newCustomer);
    customer.save().then(() => {
        res.send("New customer " + customer.name + " created!");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

//Get all Customers
app.get("/customers", (req, res) => {
    Customer.find().then((customers) => {
        res.json(customers);
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

//Get Customer by id
app.get("/customer/:id", (req, res) => {
    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer);
        } else {
            res.ssend("Invalid ID");
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

//Delete Customer by id
app.delete("/customer/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.id).then((customer) => {
        if (customer) {
            res.send("Customer removed with success!");
        } else {
            res.send("Invalid ID");
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

var listener = app.listen(5555, () => {
    console.log("Up and running at port " + listener.address().port + " ! -- This is Customers service");
});