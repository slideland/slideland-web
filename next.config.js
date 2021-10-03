/** @type {import('next').NextConfig} */
require("dotenv").config();
module.exports = {
  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    BACKEND_URL: process.env.BACKEND_URL,
    BACKEND_SLIDE_PATH: process.env.BACKEND_SLIDE_PATH,
    BACKEND_UPLOAD_MODEL_PATH: process.env.BACKEND_UPLOAD_MODEL_PATH
  },
  reactStrictMode: true,
}