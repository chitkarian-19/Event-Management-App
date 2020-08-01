const bodyParser = require("body-parser");
const { Router } = require("express");
var express=require('express');
var router = express.Router();
const {signout, signup,login, isSignedIn,isAdmin,isAuthenticated, createEvent} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

var jsonParser = bodyParser.json()

router.param("userId",getUserById);

router.get("/signout",signout);
router.post("/signup",jsonParser,signup);
router.post("/login",jsonParser,login);
router.post("/createEvent/:userId",isSignedIn,isAuthenticated,isAdmin,createEvent);



module.exports = router;