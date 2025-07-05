const schedule = require("node-schedule");
const twilio = require("twilio");

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
  USER_PHONE_NUMBER,
} = require("../constants/envVariable");

class SmsScheduler {
  constructor() {
    this.client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }

  async sendSms(message, to = USER_PHONE_NUMBER) {
    try {
      const response = await this.client.messages.create({
        body: message,
        from: TWILIO_PHONE_NUMBER,
        to,
      });
      console.log("SMS sent Success");
      return response;
    } catch (err) {
      console.error("Error sending SMS:", err.message);
      throw err;
    }
  }

  scheduleSms(dateTime, message, frequency = "once", to = USER_PHONE_NUMBER) {
   
    const jobCallback = async () => {
      console.log(`Sending scheduled SMS at ${new Date().toLocaleString()}`);
      await this.sendSms(message, to);
    };

    let job;

    if (frequency === "once") {
      job = schedule.scheduleJob(dateTime, jobCallback);
      console.log(`SMS scheduled once at ${dateTime.toLocaleString()}`);
    } else if (frequency === "daily") {
      const rule = new schedule.RecurrenceRule();
      rule.hour = dateTime.getHours();
      rule.minute = dateTime.getMinutes();
      rule.second = 0;
      rule.tz = 'Asia/Kolkata';

      job = schedule.scheduleJob(rule, jobCallback);
      console.log(`Daily SMS scheduled at ${rule.hour}:${rule.minute}`);
    } else if (frequency === "weekly") {
      const rule = new schedule.RecurrenceRule();
      rule.dayOfWeek = dateTime.getDay();
      rule.hour = dateTime.getHours();
      rule.minute = dateTime.getMinutes();
      rule.second = 0;
      rule.tz = 'Asia/Kolkata';

      job = schedule.scheduleJob(rule, jobCallback);
      console.log(`Weekly SMS scheduled every ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][rule.dayOfWeek]} at ${rule.hour}:${rule.minute}`);
    } else {
      console.warn("Unsupported frequency: " + frequency);
      return null
    }
    return job
  }
}

module.exports = SmsScheduler;
