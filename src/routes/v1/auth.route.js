const express = require("express");
const passport = require("passport");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/auth.controller");

const router = express.Router();

router.post("/register", validate(authValidation.register), authController.register);

router.post("/login", validate(authValidation.login), authController.login);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", { session: false }), authController.googleCallback);

// Facebook OAuth routes
// router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), authController.facebookCallback);

module.exports = router;
