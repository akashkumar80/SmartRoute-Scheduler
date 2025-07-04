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
- APIs: Google Maps Directions API, Twilio SMS API

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- Google Cloud account with Google Maps Directions API enabled
- Twilio account with a phone number and verified user phone number

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
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
    TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
    TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
    TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
    USER_PHONE_NUMBER=your_verified_phone_number_here

###  Running the Project

Start the backend server:
```bash
node backend/server.js

Open your browser and navigate to:
```bash
http://localhost:3000

Fill out the form with your commute details and submit. You should receive an SMS with your suggested departure time.