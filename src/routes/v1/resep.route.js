import express from "express";
import { auth } from "../../middlewares/auth.js";
import validate from "../../middlewares/validate.js";
import resepValidation from "../../validations/resep.validation.js";
import resepController from "../../controllers/resep.controller.js";
import upload from "../../utils/upload.js";

const router = express.Router();

router
  .route("/")
  .post(validate(resepValidation.createResep), resepController.createResep)
  .get(resepController.getReseps);

router.post(
  "/upload-photo",
  auth(),
  upload.single("photo"),
  validate(resepValidation.uploadPhoto),
  resepController.uploadPhoto
);

router.put(
  "/:resepId/update-photo",
  upload.single("file"),
  validate(resepValidation.updateResepPhoto),
  resepController.updateResepPhoto
);

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
