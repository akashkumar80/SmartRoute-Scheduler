const express = require("express");
const { getAuthUrl, getTokenFromCode, createCalendarEvent } = require("../services/calendarService");
const requireAuth = require("../middleware/auth");


const router = express.Router()

router.get("/auth/cronofy", (req, res) => {
  res.redirect(getAuthUrl());
});

router.get("/cronofy/callback", async (req, res) => {
  const { code } = req.query;
  const tokenData = await getTokenFromCode(code);
  userAccessToken = tokenData.access_token;
  res.send("Cronofy Calendar connected!");
});

router.post("/calendar/cronofy/add",requireAuth, async (req, res) => {
  try {
    const { summary, description, start, end, calendar_id } = req.body;
    const result = await createCalendarEvent(userAccessToken, {
      summary,
      description,
      start,
      end,
      calendar_id,
    });
    res.json({ message: "Event added!", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding event" });
  }
});

module.exports = router