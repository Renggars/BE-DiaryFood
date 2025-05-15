const express = require("express");
const validate = require("../../middlewares/validate");
const pencarianValidation = require("../../validations/pencarian.validation");
const pencarianController = require("../../controllers/pencarian.controller");

const router = express.Router();

router
  .route("/")
  .post(
    validate(pencarianValidation.createPencarian),
    pencarianController.createPencarian
  )
  .get(pencarianController.getPencarians);

router
  .route("/:pencarianId")
  .get(
    validate(pencarianValidation.getPencarian),
    pencarianController.getPencarian
  )
  .put(
    validate(pencarianValidation.updatePencarian),
    pencarianController.updatePencarian
  )
  .delete(
    validate(pencarianValidation.deletePencarian),
    pencarianController.deletePencarian
  );

module.exports = router;
