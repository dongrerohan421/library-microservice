//Load Express
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
swaggerDocument = require('./swagger.json');
const showBanner = require("node-banner");
(async () => {
    await showBanner("Books Microservice", "Create, Get, Delete Books.", "blue", "green");
})();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Load Mongoose
const mongoose = require("mongoose");
//Connect
mongoose.connect("mongodb+srv://kali-denali:Axcvbn5@booksservice-ewcap.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to the mongodb");
        }
    });

require("./Book");
const Book = mongoose.model("Book");

app.get("/", (req, res) => {
    res.send("This is our main endpoint!");
});

//Create func
app.post("/book", (req, res) => {
    //This is our create func
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }
    //Create new Book
    var book = new Book(newBook);
    book.save().then(() => {
        console.log("New Book created!");
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
    res.send("New book created with success!");
});

//Get all books
app.get("/books", (req, res) => {
    Book.find().then((books) => {
        res.json(books);
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});

//Get book by id
app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book);
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});

//Delete book by id
app.delete("/book/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id).then((book) => {
        if (book) {
            res.send("Book removed with success!");
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });
});


var listener = app.listen(3000, () => {
    app.use('/api-docs/books', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log("Up and running at port " + listener.address().port + " -- This is Books service");
});