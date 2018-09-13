const router = require('express').Router()
const webpush = require("web-push")
module.exports = router

webpush.setGCMAPIKey(process.env.GOOGLE_API_KEY)
webpush.setVapidDetails(
  "mailto:your-email-address@example-domain.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
)
