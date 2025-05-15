const express = require("express");
const validate = require("../../middlewares/validate");
const { auth } = require("../../middlewares/auth");
const langkahValidation = require("../../validations/langkah.validation");
const langkahController = require("../../controllers/langkah.controller");

const router = express.Router();

router
  .route("/langkahId")
  .put(
    auth(),
    validate(langkahValidation.updateLangkah),
    langkahController.updateLangkah
  )
  .delete(
    auth(),
    validate(langkahValidation.deleteLangkah),
    langkahController.deleteLangkah
  );

module.exports = router;
