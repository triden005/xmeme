const validator = require("validator");

const Meme = require("./meme.model");

/**
 * GetAll will fetch recent 100 memes data from db
 * curl -v -X "GET" http://localhost:8081/memes
 *
 */
const getAll = async (req, res) => {
    Meme.find({})
        .sort({ date: -1 })
        .limit(100)
        .exec((err, allMemes) => {
            if (err) {
                console.log(err);
                return res.status(500).end();
            }
            return res.json(allMemes);
        });
};

/**
 * Creates a new Meme and adds it to db 
 * curl -X POST http://localhost:8081/memes \
    -d '{"name": "memename","url": "https://www.google.com","caption": "caption"}' \
    -H 'Content-Type: application/json'
*/
const createOne = async (req, res) => {
    const { name, caption, url } = req.body;

    if (!(name && caption && url)) {
        return res.status(400).end();
    }
    let newmeme = { name, url, caption };

    Meme.create(newmeme, (err, newlyCreated) => {
        if (err) {
            if (err.name === "MongoError" && err.code === 11000) {
                return res.status(409).end();
            } else {
                console.log(err);
                return res.status(500).end();
            }
        } else {
            console.log("New meme item: ", newlyCreated);
            res.status(201).json({ id: newlyCreated._id });
        }
    });
};

/**
 * Gets a meme by id
 * curl -v -X "GET" http://localhost:8081/memes/<id-value>
 *
 * Nb: You'll need to change "<id-value>" to the "id" value of one of the meme items
 */
const getOne = async (req, res) => {
    let Idtofind = req.params.id;

    if (!validator.isMongoId(Idtofind)) {
        return res.status(404).end();
    }

    Meme.findById(Idtofind).exec((err, Tofindmeme) => {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (Tofindmeme == null) return res.status(404).end();

        return res.json(Tofindmeme);
    });
};

/**
 * Updates a MEME from the db using
 * curl -v -X "PATCH" http://localhost:8081/memes/<id-value> \
    -d '{"url": "https://www.google.com","caption": "caption"}' \
    -H 'Content-Type: application/json'
 *
 * Nb: You'll need to change "<id-value>" to the "id" value of one of the meme items
 */
const updateOne = async (req, res) => {
    let Idtofind = req.params.id;

    const { caption, url } = req.body;

    if (!(caption || url)) return res.status(400).end();
    let updatedmeme = {};
    if (caption) updatedmeme.caption = caption;
    if (url) updatedmeme.url = url;

    Meme.findByIdAndUpdate(Idtofind, updatedmeme).exec((err, doc) => {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (doc === null) return res.status(404).end();

        return res.status(204).end();
    });
};

/**
 * Delete a MEME from the db
 * curl -v -X "DELETE" http://localhost:8081/memes/<id-value>
 *
 * Nb: You'll need to change "<id-value>" to the "id" value of one of the meme items
 */
const removeOne = async (req, res) => {
    let Idtodelete = req.params.id;

    Meme.findByIdAndDelete(Idtodelete).exec((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.status(204).send();
        }
    });
};

module.exports = { createOne, getOne, updateOne, removeOne, getAll };
