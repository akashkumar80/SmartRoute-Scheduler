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


const ORS_API_KEY = process.env.ORS_API_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const USER_PHONE_NUMBER = process.env.USER_PHONE_NUMBER;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.post('/api/schedule', async (req, res) => {
  const { source, destination, arrivalTime } = req.body;
  if (!source || !destination || !arrivalTime) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Convert source and destination to coordinates using ORS Geocoding
    const geoURL = (address) =>
      `https://api.openrouteservice.org/geocode/search?api_key=${process.env.ORS_API_KEY}&text=${address}`;

    const [srcGeo, destGeo] = await Promise.all([
      axios.get(geoURL(source)),
      axios.get(geoURL(destination)),
    ]);

    const srcCoords = srcGeo.data.features[0].geometry.coordinates;
    const destCoords = destGeo.data.features[0].geometry.coordinates;
     const routeURL = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.ORS_API_KEY}&start=${srcCoords}&end=${destCoords}`;

    const routeResponse= await axios.get(routeURL)

    const durationSeconds = routeResponse.data.features[0].properties.summary.duration;

    const arrival = new Date();
    const [hh, mm] = arrivalTime.split(':').map(Number);
    arrival.setHours(hh, mm, 0, 0);
    const departure = new Date(arrival.getTime() - durationSeconds * 1000);

    const message = `Leave by ${departure.toLocaleTimeString()} to reach ${destination} by ${arrivalTime}`;

    await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.USER_PHONE_NUMBER,
    });


    res.json({ message: 'SMS sent successfully with OpenRouteService!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to schedule commute with ORS.' });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
