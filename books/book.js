import { model } from "mongoose";

model("Book", {
    //title, author, numberPages, publisher
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    numberPages: {
        type: Number,
        require: true
    },
    publisher: {
        type: String,
        require: true
    }
})