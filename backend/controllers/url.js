const shortid = require('shortid');
const URL = require('../models/url');

async function generateShortURL(request, response) {
    const body = request.body;

    console.log('Request received:', body);

    if (!body.url) return response.status(400).json({ error: 'URL is required.' });

    const shortID = shortid.generate();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return response.json({
        id: shortID
    });
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }

module.exports = {
    generateShortURL,
    getAnalytics,
}