import { model, SchemaType } from "mongoose";

model("Order", {
    customerID: {
        type: SchemaType.ObjectId,
        require: true
    },
    bookID: {
        type: SchemaType.ObjectId,
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