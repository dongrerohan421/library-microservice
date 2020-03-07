import express from "express";
const app = express();

import showBanner from "node-banner";
(async () => {
    await showBanner("Orders Microservice", "Create, Get, Delete orders.", "blue", "green");
})();

var listener = app.listen(7777, () => {
    console.log("Up and running at port " + listener.address().port + " ! -- This is Orders service");
});