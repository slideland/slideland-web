/** @type {import('next').NextConfig} */
require("dotenv").config();
module.exports = {
  env: {
    GRAPHQL_URI: process.env.GRAPHQL_URI,
    REFRESH_TOKEN_URI: process.env.REFRESH_TOKEN_URI,
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN
  },
  reactStrictMode: true,
}