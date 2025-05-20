const express = require("express");
const validate = require("../../middlewares/validate");
const { auth } = require("../../middlewares/auth");
const bahanValidation = require("../../validations/bahan.validation");
const bahanController = require("../../controllers/bahan.controller");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(bahanValidation.createBahan),
    bahanController.createBahan
  );

router
  .route("/:bahanId")
  .put(
    auth(),
    validate(bahanValidation.updateBahan),
    bahanController.updateBahan
  )
  .delete(
    auth(),
    validate(bahanValidation.deleteBahan),
    bahanController.deleteBahan
  );

module.exports = router;
