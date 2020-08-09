const express = require("express");
const router = express.Router();

const{ getUserById,getUser, getAllUsers, getAllUserEvents, getCreatedEvents,registerEvent } = require("../controllers/user");
const{ isSignedIn , isAuthenticated, isAdmin } = require("../controllers/auth");


router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.get("/users/:userId",isSignedIn,isAuthenticated,isAdmin,getAllUsers);
router.get("/events/user/:userId",isSignedIn,isAuthenticated,getAllUserEvents);
router.get("/getCreatedEvents/:userId",isSignedIn,isAuthenticated,isAdmin,getCreatedEvents);
router.post("/registerEvent/:userId/:eventId",isSignedIn,isAuthenticated,registerEvent)




module.exports = router;