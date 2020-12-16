// add this file to .gitignore
require("dotenv").config()
module.exports = {
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET
    },
    session: {
        cookieKey: process.env.COOKIES_KEY
    }
};
