import express from "express";
import { auth } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import resepValidation from "../../validations/resep.validation.js";
import resepController from "../../controllers/resep.controller.js";

const router = express.Router();

router
  .route("/")
  .post(validate(resepValidation.createResep), resepController.createResep)
  .get(resepController.getReseps);

router
  .route("/:resepId")
  .get(validate(resepValidation.getResep), resepController.getResep)
  .put(
    auth(),
    validate(resepValidation.updateResep),
    resepController.updateResep
  )
  .delete(
    auth(),
    validate(resepValidation.deleteResep),
    resepController.deleteResep
  );

export default router;
