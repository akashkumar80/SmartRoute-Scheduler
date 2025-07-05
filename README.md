# SmartRoute-Scheduler

**SmartRoute-Scheduler** is an early working prototype of a smart commute planner that helps users schedule their daily travel by combining live traffic data, calendar scheduling, and SMS alerts. This prototype demonstrates how to fetch route data using Google Maps Directions API, send SMS reminders with Twilio API, and provides a basic web interface for user input.

---

## Features

- Input source, destination, and preferred arrival time via a web form
- Calculate estimated travel duration using Google Maps Directions API
- Calculate optimal departure time based on travel duration and arrival time
- Send SMS reminders to the user with departure time using Twilio API

---

## Tech Stack

- Backend: Node.js, Express.js
- Frontend: HTML, JavaScript, CSS
- APIs: Maps Directions API, Twilio SMS API

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- OpenRouteService API Key (Signup now to get a api key for map data)
- Twilio account with a phone number and verified user phone number

- const CRONOFY_CLIENT_ID=process.env.CRONOFY_CLIENT_ID || "Your Googel Client ID"
- const CRONOFY_CLIENT_SECRET= process.env.CRONOFY_CLIENT_SECRET || "Your Googel Client Secret"
- const CRONOFY_REDIRECT_URI= process.env.CRONOFY_REDIRECT_URI || "your google redirect url"
- const
### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/smartroute-scheduler.git
   cd smartroute-scheduler
 2. Install dependencies:
    ```bash
    npm install

3. Create a .env file in the root directory with the following variables:
    ```bash
    CRONOFY_CLIENT_ID= "Your Googel Client ID" (Optional)
    CRONOFY_CLIENT_SECRET= "Your Googel Client Secret" (Optional)
    CRONOFY_REDIRECT_URI= "your google redirect url" (Optional)
    JWT_SECRET = "Your_Secret_Token"
    MONGOOSE_URL = "Your Mongooes URL"
    ORS_API_KEY= "OpenRouteService API KEY"
    TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
    TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
    TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
    USER_PHONE_NUMBER=your_verified_phone_number_here
    

###  Running the Project

Start the backend server:

    ```bash
    node backend/server.js
    ```

Open your browser and navigate to:

    ```bash
    http://localhost:3000
    ```
    

Fill out the form with your commute details and submit. You should receive an SMS with your suggested departure time.

## Output Screen

Below is the Screenshot of Project

### Login
![Login](https://github.com/akashkumar80/SmartRoute-Scheduler/blob/main/Output_Screen/Login.png)

### Signup
![Signup](https://github.com/akashkumar80/SmartRoute-Scheduler/blob/main/Output_Screen/SignUp.png)

### Home
![Home](https://github.com/akashkumar80/SmartRoute-Scheduler/blob/main/Output_Screen/Home.png)

### DashBoard
![Dashboard](https://github.com/akashkumar80/SmartRoute-Scheduler/blob/main/Output_Screen/Dashboard.png)

### DarkMode
![DarkMode](https://github.com/akashkumar80/SmartRoute-Scheduler/blob/main/Output_Screen/DarkMode.png)

### Language Translator
![Language Translator](https://github.com/akashkumar80/SmartRoute-Scheduler/blob/main/Output_Screen/LanguageTranslator.png)

### Voice Navigator
![Voice Navigator](https://github.com/akashkumar80/SmartRoute-Scheduler/blob/main/Output_Screen/VoiceNavigator.png)

### Instructions
![Instruction](https://github.com/akashkumar80/SmartRoute-Scheduler/blob/main/Output_Screen/Guide.png)