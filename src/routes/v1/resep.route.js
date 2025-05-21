const express = require("express");
const { auth } = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const resepValidation = require("../../validations/resep.validation");
const resepController = require("../../controllers/resep.controller");

const router = express.Router();

router.route("/").post(validate(resepValidation.createResep), resepController.createResep).get(resepController.getReseps);

router
  .route("/:resepId")
  .get(validate(resepValidation.getResep), resepController.getResep)
  .put(auth(), validate(resepValidation.updateResep), resepController.updateResep)
  .delete(auth(), validate(resepValidation.deleteResep), resepController.deleteResep);

module.exports = router;
