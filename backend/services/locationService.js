const axios= require("axios");
const { error } = require("console");
const { models } = require("mongoose");
const { ORS_API_KEY } = require("../constants/envVariable");

async function getCoordinates(address) {
  try {
    const url = `https://api.openrouteservice.org/geocode/search`;
    const response = await axios.get(url, {
      params: {
        api_key: ORS_API_KEY,
        text: address,
      },
    });

    const features = response.data.features;
    if (!features.length) {
      throw new Error(`No coordinates found for "${address}"`);
    }

    const [lon, lat] = features[0].geometry.coordinates;
    return [lon, lat]; 
  } catch (err) {
    console.error("Geocoding error:", err.message);
    throw new Error(`$[getCoordinates] ${error.message? error.message : "Failed to get coordinates."}`);
  }
}

async function getTravelDuration(sourceCoords, destCoords) {
  try {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${sourceCoords}&end=${destCoords}`;
    const response = await axios.get(url);

    const duration = response.data.features[0].properties.summary.duration;
    return duration;
  } catch (err) {
    console.error("Routing error:", err.message);
    throw new Error(`$[getTravelDuration] ${error.message? error.message : "Failed to get travel duration."}`)
  }
}

module.exports = {
    getCoordinates,
    getTravelDuration
}