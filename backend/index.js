const express = require('express');
const { connectToMongoDB } = require('./connect');
const urlRoute = require('./routes/url');
const URL = require("./models/url");
const cors = require('cors'); // Import cors at the top

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/url-shortner-software').then(() => {
    console.log('MongoDB connected');

    app.use(express.json());
    app.use(cors()); // Apply CORS middleware before routes
    app.use('/url', urlRoute);

    app.get("/:shortId", async (req, res) => {
        try {
            const shortId = req.params.shortId;
            const entry = await URL.findOneAndUpdate(
              { shortId },
              { $push: { visitHistory: { timestamp: Date.now() } } },
              { new: true } // This option returns the updated document
            );

            if (!entry) {
                return res.status(404).json({ error: 'Short URL not found' });
            }

            res.redirect(entry.redirectURL);
        } catch (error) {
            console.error('Error handling redirect:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.listen(PORT, () => console.log(`Server started at ${PORT}`));
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
