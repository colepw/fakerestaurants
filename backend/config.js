const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    SHOPIFY_STORE: process.env.SHOPIFY_STORE,
    SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
    SHOPIFY_API_PASSWORD: process.env.SHOPIFY_API_PASSWORD,
    SHOPIFY_GRAPHQL_URL: `https://${process.env.SHOPIFY_STORE}.myshopify.com/api/2023-10/graphql.json`,
};