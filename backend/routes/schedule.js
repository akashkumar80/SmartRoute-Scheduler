const express = require("express");
const router = express.Router();
const Schedule = require("../models/Schedule");
const requireAuth = require("../middleware/auth");
const SmsScheduler = require('../services/smsService');
const { getCoordinates, getTravelDuration } = require('../services/locationService');
const User = require("../models/User")

const smsService = new SmsScheduler();
const VALID_FREQUENCIES = ['once', 'daily', 'weekly'];
const scheduledJobs = new Map();

router.post("/add", requireAuth, async (req, res) => {
  const { source, destination, arrivalTime, arrivalDate, smsFrequency, cronofy_event_id } = req.body;

  if (!source || !destination || !arrivalTime || !arrivalDate || !smsFrequency) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (!VALID_FREQUENCIES.includes(smsFrequency)) {
    return res.status(400).json({ message: 'Invalid frequency selected' });
  }

  try {

    const [srcCoords, destCoords] = await Promise.all([
          getCoordinates(source),
          getCoordinates(destination),
        ]);

    const durationSeconds= await getTravelDuration(srcCoords, destCoords)


    const [hh, mm] = arrivalTime.split(':').map(Number);
    const [yyyy, MM, dd] = arrivalDate.split('-').map(Number);
    const arrival = new Date(yyyy, MM - 1, dd, hh, mm, 0);
    const departure = new Date(arrival.getTime() - durationSeconds * 1000);

    const message = `Reminder: Leave now to reach ${destination} by ${arrivalTime}`;

    const job = smsService.scheduleSms(departure, message, smsFrequency);


     const newSchedule = new Schedule({
      userId: req.user.id,
      source,
      destination,
      arrivalTime,
      arrivalDate,
      smsFrequency,
      cronofy_event_id
    });

    scheduledJobs.set(newSchedule.id, job);
    await newSchedule.save();
    res.json({
      message: `SMS scheduled for ${departure.toString()} at Frequent ${smsFrequency}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const schedules = await Schedule.find({ userId: req.user.id }).sort({ arrivalTime: 1 });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {

    const scheduleId = req.params.id;
    const existingJob = scheduledJobs.get(scheduleId);
    if (existingJob) {
      existingJob.cancel();
      scheduledJobs.delete(scheduleId);
      console.log(`Canceled old scheduled job for ID: ${scheduleId}`);
    }

    const schedule = await Schedule.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  const { source, destination, arrivalTime, arrivalDate, smsFrequency } = req.body;
  try {

    const scheduleId = req.params.id;

    const existingJob = scheduledJobs.get(scheduleId);
    if (existingJob) {
      existingJob.cancel();
      scheduledJobs.delete(scheduleId);
      console.log(`Canceled old scheduled job for ID: ${scheduleId}`);
    }

    const [srcCoords, destCoords] = await Promise.all([
      getCoordinates(source),
      getCoordinates(destination),
    ]);

    const durationSeconds = await getTravelDuration(srcCoords, destCoords);

    const [hh, mm] = arrivalTime.split(':').map(Number);
    const [yyyy, MM, dd] = arrivalDate.split('-').map(Number);
    const arrival = new Date(yyyy, MM - 1, dd, hh, mm, 0);
    const departure = new Date(arrival.getTime() - durationSeconds * 1000);

    const user = await User.findById(req.user.id);
    const message = `Reminder: Leave now to reach ${destination} by ${arrivalTime}`;

    const newJob = smsService.scheduleSms(departure, message,smsFrequency);
    scheduledJobs.set(scheduleId, newJob);

    const updated = await Schedule.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { source, destination, arrivalTime },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Schedule not found" });
    res.json({ message: "Updated", schedule: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const schedule = await Schedule.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching schedule" });
  }
});


module.exports = router;
