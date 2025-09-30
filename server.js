const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Fixed route for Google Calendar
app.get("/proxy.ics", async (req, res) => {
  const ICS_FEED = "https://gracebk.org/?post_type=tribe_events&ical=1";

  try {
    const response = await fetch(ICS_FEED);
    const data = await response.text();

    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching calendar");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
