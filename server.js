const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Calendar Proxy is running ✅ Use /?url=YOUR_ICS_FEED");
});

app.get("/", async (req, res) => {
  const icsUrl = req.query.url;
  if (!icsUrl) {
    return res.status(400).send("Missing ?url parameter");
  }

  try {
    const response = await fetch(icsUrl);
    const data = await response.text();

    res.setHeader("Content-Type", "text/calendar");
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching calendar");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
