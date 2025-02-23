const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// config.js
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    SHOPIFY_STORE: process.env.SHOPIFY_STORE,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_PASSWORD: process.env.SHOPIFY_API_PASSWORD,
    SHOPIFY_GRAPHQL_URL: `https://${process.env.SHOPIFY_STORE}.myshopify.com/api/2023-10/graphql.json`,
};