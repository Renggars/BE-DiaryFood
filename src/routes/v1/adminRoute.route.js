import express from "express";
import adminController from "../../controllers/admin.controller.js";
import validate from "../../middlewares/validate.js";
import kategoriValidation from "../../validations/kategori.validation.js";
import kategoriController from "../../controllers/kategori.controller.js";

import resepController from "../../controllers/resep.controller.js";
import { auth, authAcces } from "../../middlewares/auth.js";
import resepValidation from "../../validations/resep.validation.js";

const router = express.Router();

// main dashboard
router.route("/").get(auth(), authAcces(), adminController.getDashboard);

// category
router.route("/categories").post(auth(), authAcces(), validate(kategoriValidation.createKategori), kategoriController.createKategori).get(auth(), authAcces(), adminController.getAllCategories);
router.route("/categories/:kategoriId").delete(auth(), authAcces(), validate(kategoriValidation.deleteKategori), kategoriController.deleteKategori);

// recipe
router.route("/recipes").get(auth(), authAcces(), resepController.getReseps);
router.route("/recipes/:resepId").get(auth(), authAcces(), validate(resepValidation.getResep), resepController.getResep);

export default router;
