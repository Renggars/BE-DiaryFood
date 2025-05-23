const express = require("express");
const validate = require("../../middlewares/validate");
const adminController = require("../../controllers/adminController");
const kategoriValidation = require("../../validations/kategori.validation");
const kategoriController = require("../../controllers/kategori.controller");
const { auth, authAcces } = require("../../middlewares/auth");

const router = express.Router();

router.route("/").get(auth(), authAcces(), adminController.getDashboard);
router.route("/categories").post(auth(), authAcces(), validate(kategoriValidation.createKategori), kategoriController.createKategori).get(auth(), authAcces(), adminController.getAllCategories);
router.route("/categories/:kategoriId").delete(auth(), authAcces(), validate(kategoriValidation.deleteKategori), kategoriController.deleteKategori);
module.exports = router;
