const express = require("express");
const validate = require("../../middlewares/validate");
const kategoriValidation = require("../../validations/kategori.validation");
const kategoriController = require("../../controllers/kategori.controller");
const { auth, authAcces } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(
    auth(),
    authAcces(),
    validate(kategoriValidation.createKategori),
    kategoriController.createKategori
  )
  .get(kategoriController.getKategoris);

router
  .route("/:kategoriId")
  .get(validate(kategoriValidation.getKategori), kategoriController.getKategori)
  .put(
    auth(),
    authAcces(),
    validate(kategoriValidation.updateKategori),
    kategoriController.updateKategori
  )
  .delete(
    auth(),
    authAcces(),
    validate(kategoriValidation.deleteKategori),
    kategoriController.deleteKategori
  );

module.exports = router;
