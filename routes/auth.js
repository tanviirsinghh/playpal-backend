const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const { verifyJWT } = require('../services/JWT');

router.post("/login", AuthController.login);
router.post("/register", AuthController.Register);
router.put("/setpassword", AuthController.handleforgot);
router.post("/otpverify", verifyJWT, AuthController.handleOTpverification);
router.post("/oAuth", AuthController.oAuthLogin)



module.exports = router;

