const express = require("express");
const validate = require("../../middlewares/validate");
const kategoriValidation = require("../../validations/kategori.validation");
const kategoriController = require("../../controllers/kategori.controller");
const { auth } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    validate(kategoriValidation.createKategori),
    kategoriController.createKategori
  )
  .get(kategoriController.getKategoris);

router
  .route("/:categoryId")
  .get(validate(kategoriValidation.getKategori), kategoriController.getKategori)
  .put(
    auth(),
    validate(kategoriValidation.updateKategori),
    kategoriController.updateKategori
  )
  .delete(
    auth(),
    validate(kategoriValidation.deleteKategori),
    kategoriController.deleteKategori
  );

module.exports = router;
