const mongoose = require("mongoose");

mongoose.model("Order", {
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    }
});