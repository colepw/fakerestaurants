const express = require('express');
const axios = require('axios');
const { SHOPIFY_GRAPHQL_URL, SHOPIFY_API_PASSWORD } = require('./config');

const router = express.Router();

// Fetch products from Shopify
router.get('/products', async (req, res) => {
    try {
        const response = await axios.post(SHOPIFY_GRAPHQL_URL, {
            query: `{
                products(first: 16) {
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
                                        id
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

module.exports = router;