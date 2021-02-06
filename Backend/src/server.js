const express = require("express"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    morgan = require("morgan"),
    bodyParser = require("body-parser");

const config = require("./config/config");
const memeRouter = require("./resources/meme/meme.router");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/memes", memeRouter);

try {
    mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
        console.log("connected to db ");

        app.listen(config.port, () => {
            console.log(`App is running on port ${config.port}`);
        });
    });
} catch (e) {
    console.log(e);
}
