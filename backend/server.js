require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { google } = require('googleapis');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('frontend'));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});


const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const USER_PHONE_NUMBER = process.env.USER_PHONE_NUMBER;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.post('/api/schedule', async (req, res) => {
  const { source, destination, arrivalTime } = req.body;

  if (!source || !destination || !arrivalTime) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    // 1. Get route info from Google Maps
    const mapsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
      source
    )}&destination=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`;

    const mapsResponse = await axios.get(mapsUrl);
    const route = mapsResponse.data.routes[0];
    const durationSeconds = route.legs[0].duration.value;

    // 2. Calculate suggested departure time based on arrivalTime - duration
    const arrivalDateTime = new Date();
    const [hours, minutes] = arrivalTime.split(':').map(Number);
    arrivalDateTime.setHours(hours, minutes, 0, 0);

    const departureTime = new Date(arrivalDateTime.getTime() - durationSeconds * 1000);

    // 3. Send SMS reminder via Twilio
    const messageBody = `To arrive at ${destination} by ${arrivalTime}, leave by ${departureTime.toLocaleTimeString()}.`;

    await twilioClient.messages.create({
      body: messageBody,
      from: TWILIO_PHONE_NUMBER,
      to: USER_PHONE_NUMBER,
    });

    res.json({ message: 'Commute scheduled! SMS reminder sent.' });
  } catch (error) {
    console.error('Error scheduling commute:', error);
    res.status(500).json({ message: 'Failed to schedule commute.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
