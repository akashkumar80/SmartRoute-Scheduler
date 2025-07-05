const ORS_API_KEY= process.env.ORS_API_KEY || "OpenRouteService API KEY"
const TWILIO_ACCOUNT_SID= process.env.TWILIO_ACCOUNT_SID || "Twilio Account ID"
const TWILIO_AUTH_TOKEN= process.env.TWILIO_AUTH_TOKEN || "Twilio Auth ID"
const TWILIO_PHONE_NUMBER= process.env.TWILIO_PHONE_NUMBER || "Twilio Registered Mobile Number"
const USER_PHONE_NUMBER=process.env.USER_PHONE_NUMBER || "To Mobile Number"


const CRONOFY_CLIENT_ID=process.env.CRONOFY_CLIENT_ID || "Your Googel Client ID"
const CRONOFY_CLIENT_SECRET= process.env.CRONOFY_CLIENT_SECRET || "Your Googel Client Secret"
const CRONOFY_REDIRECT_URI= process.env.CRONOFY_REDIRECT_URI || "your google redirect url"


const JWT_SECRET = process.env.JWT_SECRET || "Your_Secret_Token"
const MONGOOSE_URL = process.env.MONGOOSE_URL

module.exports = {
    ORS_API_KEY,
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
    USER_PHONE_NUMBER,
    CRONOFY_CLIENT_ID,
    CRONOFY_CLIENT_SECRET,
    CRONOFY_REDIRECT_URI,
    JWT_SECRET,
    MONGOOSE_URL
}