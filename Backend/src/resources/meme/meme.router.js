const { Router } = require("express");

const controller = require("./meme.controller");
const bodyvalidator = require("../../middleware/middleware");

const router = Router();

router
    .route("/")
    .get(controller.getAll)
    .post(bodyvalidator, controller.createOne);

router
    .route("/:id")
    .get(controller.getOne)
    .patch(bodyvalidator, controller.updateOne)
    .delete(controller.removeOne);

module.exports = router;
