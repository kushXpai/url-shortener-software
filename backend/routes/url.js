const express = require('express');
const { generateShortURL, getAnalytics } = require('../controllers/url');
const URL = require('../models/url');
const router = express.Router();

router.post('/', generateShortURL);
router.get('/analytics/:shortId', getAnalytics);

router.get('/history', async (req, res) => {
  try {
    const urls = await URL.find({});
    const history = urls.map(url => ({
      originalUrl: url.redirectURL,
      shortUrl: `http://localhost:8001/${url.shortId}`,
      clicks: url.visitHistory.length,
    }));
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
