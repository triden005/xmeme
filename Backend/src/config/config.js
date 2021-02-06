const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
    port: process.env.PORT || 8081,
    mongoose: {
        url: process.env.MONGODB_URL || "mongodb://localhost:27017/xmeme",
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
    },
};
