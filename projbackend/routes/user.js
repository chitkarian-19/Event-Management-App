const express = require("express");
const router = express.Router();

const{ getUserById,getUser, getAllUsers, getAllUserEvents } = require("../controllers/user");
const{ isSignedIn , isAuthenticated, isAdmin } = require("../controllers/auth");
const { getAllCreatedEvents } = require("../controllers/event");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.get("/users/:userId",isSignedIn,isAuthenticated,isAdmin,getAllUsers);
router.get("/events/user/:userId",isSignedIn,isAuthenticated,getAllUserEvents);
router.get("/allEvents/:userId",isSignedIn,isAuthenticated,isAdmin,getAllCreatedEvents);



module.exports = router;