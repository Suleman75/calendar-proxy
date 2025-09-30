const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Default route (sirf info dikhane ke liye)
app.get("/", async (req, res) => {
  const icsUrl = req.query.url;

  if (!icsUrl) {
    return res.send("✅ Calendar Proxy is running. Use this format: /?url=YOUR_ICS_FEED");
  }

  try {
    const response = await fetch(icsUrl);
    const data = await response.text();

    res.setHeader("Content-Type", "text/calendar");
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Error fetching calendar");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
