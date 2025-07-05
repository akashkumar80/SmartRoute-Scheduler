const axios = require("axios");

const { CRONOFY_CLIENT_ID, CRONOFY_CLIENT_SECRET, CRONOFY_REDIRECT_URI} = require("../constants/envVariable")

const CLIENT_ID = CRONOFY_CLIENT_ID;
const CLIENT_SECRET = CRONOFY_CLIENT_SECRET;
const REDIRECT_URI = CRONOFY_REDIRECT_URI;

const getAuthUrl = () => {
  const scope = "read_write";
  return `https://app.cronofy.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
};

const getTokenFromCode = async (code) => {
  const res = await axios.post("https://api.cronofy.com/oauth/token", {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
  });
  return res.data;
};

const createCalendarEvent = async (accessToken, event) => {
  const res = await axios.post(
    `https://api.cronofy.com/v1/calendars/${event.calendar_id}/events`,
    {
      event_id: `smartroute-${Date.now()}`,
      summary: event.summary,
      description: event.description,
      start: event.start,
      end: event.end,
      tzid: "Asia/Kolkata",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
};

module.exports = { getAuthUrl, getTokenFromCode, createCalendarEvent };
