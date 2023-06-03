const express = require("express");

const LoginCtrl = require("../controllers/login-ctrl");

const router = express.Router();

router.post("/auth/signup", [LoginCtrl.checkDuplicateUser], LoginCtrl.signUp);
router.post("/auth/signin", LoginCtrl.signIn);

module.exports = router;
