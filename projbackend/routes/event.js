const express = require("express");
const router = express.Router();

const { getEvent, getEventById, getAllEvents, getPhoto,getUserEventById } = require("../controllers/event");

router.param("eventId",getEventById);

router.get("/event/:eventId",getEvent);
router.get("/getEventById/:eventId",getUserEventById)
router.get("/events/getAllEvents",getAllEvents);
router.get("/getPhoto/:eventId",getPhoto);
module.exports = router;
