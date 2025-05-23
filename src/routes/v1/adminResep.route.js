const express = require("express");
const validate = require("../../middlewares/validate");
const { auth, authAcces } = require("../../middlewares/auth");
const adminResepValidation = require("../../validations/adminResep.validation");
const adminResepController = require("../../controllers/adminResep.controller");
const adminController = require("../../controllers/adminController");

const router = express.Router();



router.route("/").get(auth(), authAcces(), adminResepController.getPendingReseps);

router.route("/:id/approve").put(validate(adminResepValidation.resepId), adminResepController.approveResep);

router.route("/:id/reject").put(validate(adminResepValidation.resepId), adminResepController.rejectResep);

module.exports = router;
