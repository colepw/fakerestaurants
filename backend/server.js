// server.js (Node.js Express Backend)
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_PASSWORD = process.env.SHOPIFY_API_PASSWORD;
const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE}.myshopify.com/api/2023-10/graphql.json`;

// Fetch products from Shopify
app.get('/products', async (req, res) => {
    try {
        const response = await axios.post(SHOPIFY_GRAPHQL_URL, {
            query: `{
                products(first: 10) {
                    edges {
                        node {
                            id
                            title
                            images(first: 5) {
                                edges {
                                    node {
                                        src
                                    }
                                }
                            }
                            variants(first: 1) {
                                edges {
                                    node {
                                        price
                                    }
                                }
                            }
                        }
                    }
                }
            }`
        }, {
            headers: {
                'X-Shopify-Access-Token': SHOPIFY_API_PASSWORD,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data.data.products.edges.map(edge => edge.node));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
