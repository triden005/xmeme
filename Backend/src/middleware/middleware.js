const { default: validator } = require("validator");

const bodyValidator = (req, res, next) => {
    if (!req.is("application/json")) {
        return res.status(415).send({ error: "Received non-JSON data" });
    }

    const { name, url, caption } = req.body;

    if (name && name == "") {
        return res.status(400).end();
    }
    if (caption && caption == "") {
        return res.status(400).end();
    }
    if (url && !validator.isURL(url)) {
        return res.status(400).end();
    }

    next();
};

module.exports = bodyValidator;
