require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); 

const googleApiRouter = express.Router();

// Proxy endpoint to Google Places API
googleApiRouter.get('/api/doctor', async (req, res) => {
  const description2 = req.query.description2;
  try {
    const {lat, long} = req.query;
    console.log(req.query)
    console.log(lat)
    console.log(long)
    // Make a request to the Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=1500&${description2}&key=${process.env.GOOGLE_PLACES_API_KEY}`
    );
    
    const data = await response.json(); // Get the data in JSON format
    res.json(data); // Send the data back to the frontend
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    res.status(500).json({ error: 'Error fetching doctor data' });
  }
});

module.exports = googleApiRouter;